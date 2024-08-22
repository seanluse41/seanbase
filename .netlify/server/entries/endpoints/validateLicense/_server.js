import jwt from "jsonwebtoken";
import { e as error, j as json } from "../../../chunks/index.js";
import { nanoid } from "nanoid";
import TTLCache from "@isaacs/ttlcache";
const subdomain = "sean";
const appId = "140";
const apiToken = "kAf4eNyvCM1FSgUqmtsaOHDJ9297DyCcPcf2jmQA";
async function checkLicense(secretKey) {
  const query = `secretKey="${encodeURIComponent(secretKey)}"`;
  const fields = ["secretKey", "validToDate"];
  const params = new URLSearchParams({
    app: appId,
    query,
    fields: fields.join(",")
  });
  const url = `https://${subdomain}.kintone.com/k/v1/records.json?${params.toString()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Cybozu-API-Token": apiToken
      }
    });
    if (!response.ok) {
      const responseText = await response.text();
      console.error("Response body:", responseText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
    }
    const data = await response.json();
    if (data.records.length === 0) {
      return null;
    }
    const record = data.records[0];
    return {
      secretKey: record.secretKey.value,
      expirationDate: record.validToDate.value
    };
  } catch (error2) {
    console.error("Error checking license in Kintone:", error2);
    throw error2;
  }
}
class IPRateLimiter {
  rate;
  constructor(rate) {
    this.rate = rate;
  }
  async hash(event) {
    return event.getClientAddress();
  }
}
class IPUserAgentRateLimiter {
  rate;
  constructor(rate) {
    this.rate = rate;
  }
  async hash(event) {
    const ua = event.request.headers.get("user-agent");
    if (!ua)
      return false;
    return event.getClientAddress() + ua;
  }
}
class CookieRateLimiter {
  rate;
  cookieOptions;
  secret;
  requirePreflight;
  cookieId;
  hashFunction;
  constructor(options) {
    this.cookieId = options.name;
    this.secret = options.secret;
    this.rate = options.rate;
    this.requirePreflight = options.preflight;
    this.hashFunction = options.hashFunction ?? defaultHashFunction;
    this.cookieOptions = {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      ...options.serializeOptions
    };
  }
  async hash(event) {
    const currentId = await this.userIdFromCookie(event.cookies.get(this.cookieId), event);
    return currentId ? currentId : false;
  }
  async preflight(event) {
    const data = event.cookies.get(this.cookieId);
    if (data) {
      const userId2 = await this.userIdFromCookie(data, event);
      if (userId2)
        return userId2;
    }
    const userId = nanoid();
    event.cookies.set(this.cookieId, userId + ";" + await this.hashFunction(this.secret + userId), this.cookieOptions);
    return userId;
  }
  async userIdFromCookie(cookie, event) {
    const empty = () => {
      return this.requirePreflight ? null : this.preflight(event);
    };
    if (!cookie)
      return empty();
    const [userId, secretHash] = cookie.split(";");
    if (!userId || !secretHash)
      return empty();
    if (await this.hashFunction(this.secret + userId) != secretHash) {
      return empty();
    }
    return userId;
  }
}
let defaultHashFunction;
if (globalThis?.crypto?.subtle) {
  defaultHashFunction = _subtleSha256;
}
async function _subtleSha256(str) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
class RateLimiter {
  store;
  plugins;
  onLimited;
  hashFunction;
  cookieLimiter;
  static TTLTime(unit) {
    switch (unit) {
      case "s":
        return 1e3;
      case "m":
        return 6e4;
      case "h":
        return 60 * 6e4;
      case "2s":
        return 2e3;
      case "5s":
        return 5e3;
      case "10s":
        return 1e4;
      case "15s":
        return 15e3;
      case "30s":
        return 3e4;
      case "45s":
        return 45e3;
      case "2m":
        return 2 * 6e4;
      case "5m":
        return 5 * 6e4;
      case "10m":
        return 10 * 6e4;
      case "15m":
        return 15 * 6e4;
      case "30m":
        return 30 * 6e4;
      case "45m":
        return 45 * 6e4;
      case "100ms":
        return 100;
      case "250ms":
        return 250;
      case "500ms":
        return 500;
      case "2h":
        return 2 * 60 * 6e4;
      case "6h":
        return 6 * 60 * 6e4;
      case "12h":
        return 12 * 60 * 6e4;
      case "d":
        return 24 * 60 * 6e4;
      case "ms":
        return 1;
    }
    throw new Error("Invalid unit for TTLTime: " + unit);
  }
  async isLimited(event, extraData) {
    return (await this._isLimited(event, extraData)).limited;
  }
  /**
   * Clear all rate limits.
   */
  async clear() {
    return await this.store.clear();
  }
  /**
   * Check if a request event is rate limited.
   * @param {RequestEvent} event
   * @returns {Promise<boolean>} true if request is limited, false otherwise
   */
  async _isLimited(event, extraData) {
    let limited = void 0;
    for (const plugin of this.plugins) {
      const rate = plugin.rate;
      const id = await plugin.hash(event, extraData);
      if (id === false) {
        if (this.onLimited) {
          const status = await this.onLimited(event, "rejected");
          if (status === true)
            return { limited: false, hash: null, unit: rate[1] };
        }
        return { limited: true, hash: null, unit: rate[1] };
      } else if (id === null) {
        if (limited === void 0)
          limited = true;
        continue;
      } else {
        limited = false;
      }
      if (!id) {
        throw new Error("Empty hash returned from rate limiter " + plugin.constructor.name);
      }
      if (id === true) {
        return { limited: false, hash: null, unit: rate[1] };
      }
      const hash = await this.hashFunction(id);
      const currentRate = await this.store.add(hash, rate[1]);
      if (currentRate > rate[0]) {
        if (this.onLimited) {
          const status = await this.onLimited(event, "rate");
          if (status === true)
            return { limited: false, hash, unit: rate[1] };
        }
        return { limited: true, hash, unit: rate[1] };
      }
    }
    return {
      limited: limited ?? false,
      hash: null,
      unit: this.plugins[this.plugins.length - 1].rate[1]
    };
  }
  constructor(options = {}) {
    this.plugins = [...options.plugins ?? []];
    this.onLimited = options.onLimited;
    this.hashFunction = options.hashFunction ?? defaultHashFunction;
    if (!this.hashFunction) {
      throw new Error("No RateLimiter hash function found. Please set one with the hashFunction option.");
    }
    const IPRates = options.IP ?? options.rates?.IP;
    if (IPRates)
      this.plugins.push(new IPRateLimiter(IPRates));
    const IPUARates = options.IPUA ?? options.rates?.IPUA;
    if (IPUARates)
      this.plugins.push(new IPUserAgentRateLimiter(IPUARates));
    const cookieRates = options.cookie ?? options.rates?.cookie;
    if (cookieRates) {
      this.plugins.push(this.cookieLimiter = new CookieRateLimiter({
        hashFunction: this.hashFunction,
        ...cookieRates
      }));
    }
    if (!this.plugins.length) {
      throw new Error("No plugins set for RateLimiter!");
    }
    this.plugins.sort((a, b) => {
      const diff = RateLimiter.TTLTime(a.rate[1]) - RateLimiter.TTLTime(b.rate[1]);
      return diff == 0 ? a.rate[0] - b.rate[0] : diff;
    });
    const maxTTL = this.plugins.reduce((acc, plugin) => {
      const rate = plugin.rate[1];
      if (rate == "ms") {
        console.warn('RateLimiter: The "ms" unit is not reliable due to OS timing issues.');
      }
      const time = RateLimiter.TTLTime(rate);
      return Math.max(time, acc);
    }, 0);
    this.store = options.store ?? new TTLStore(maxTTL, options.maxItems);
  }
}
class TTLStore {
  cache;
  constructor(maxTTL, maxItems = Infinity) {
    this.cache = new TTLCache({
      ttl: maxTTL,
      max: maxItems,
      noUpdateTTL: true
    });
  }
  async clear() {
    return this.cache.clear();
  }
  async add(hash, unit) {
    const currentRate = this.cache.get(hash) ?? 0;
    return this.set(hash, currentRate + 1, unit);
  }
  set(hash, rate, unit) {
    this.cache.set(hash, rate, { ttl: RateLimiter.TTLTime(unit) });
    return rate;
  }
}
const JWT_SECRET = "8f4a15df6a7b3c9e2d1f0g8h6i5j4k3l2m1n0p9q8r7s6t5u4v3w2x1y0z";
const ALLOWED_ORIGINS = ".kintone.com,.cybozu.com".split(",");
const nonKintoneLimiter = new RateLimiter({
  IP: [10, "h"]
  // 10 requests per hour per IP for non-Kintone requests
});
async function GET({ url, request, getClientAddress }) {
  const origin = request.headers.get("origin");
  const isValidKintoneOrigin = ALLOWED_ORIGINS.some((domain) => origin?.endsWith(domain.trim()));
  if (!isValidKintoneOrigin) {
    try {
      await nonKintoneLimiter.check(request, getClientAddress());
    } catch (rateLimitError) {
      throw error(429, "Too Many Requests");
    }
    throw error(403, "Forbidden");
  }
  const secretKey = url.searchParams.get("secretKey");
  if (!secretKey) {
    throw error(400, "Missing secret key");
  }
  try {
    const record = await checkLicense(secretKey);
    if (!record) {
      throw error(404, "Invalid secret key");
    }
    const expirationDate = new Date(record.expirationDate);
    const today = /* @__PURE__ */ new Date();
    if (expirationDate < today) {
      return json({ status: "expired" });
    }
    const token = jwt.sign({ secretKey }, JWT_SECRET, { expiresIn: "7d" });
    const response = json({ status: "active", token });
    return response;
  } catch (err) {
    console.error(err);
    throw error(500, "Internal Server Error");
  }
}
export {
  GET
};
