import { getBlogPosts } from '../../requests/kintoneBlogRequests';
import { getProjectsByType } from '../../requests/kintoneProjectRequests';

const website = 'https://seanbase.com';

const pages = [
  { url: '/', changefreq: 'yearly', priority: 1 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/products', changefreq: 'monthly', priority: 0.9 },
  { url: '/hire', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.6 },
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateSitemapXml(urls) {
  const xmlUrls = urls.map((url) => `
    <url>
      <loc>${url.url}</loc>
      <lastmod>${url.lastmod || formatDate(new Date())}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlUrls}
    </urlset>`;
}

export async function GET() {
  // Fetch dynamic content
  const blogPosts = await getBlogPosts();
  const kintoneProjects = await getProjectsByType('kintone');

  // Add blog posts to sitemap
  const blogUrls = blogPosts.map(post => ({
    url: `${website}/blog/${post.Record_number.value}`,
    lastmod: formatDate(new Date(post.updatedTime.value)),
    changefreq: 'weekly',
    priority: 0.6
  }));

  // Add kintone projects to sitemap
  const projectUrls = kintoneProjects.map(project => ({
    url: `${website}/products/${project.link.value}`,
    lastmod: formatDate(new Date()), // You might want to add a 'lastUpdated' field to your projects
    changefreq: 'monthly',
    priority: 0.8
  }));

  // Combine all URLs
  const allUrls = [...pages, ...blogUrls, ...projectUrls];

  // Generate sitemap XML
  const sitemap = generateSitemapXml(allUrls);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}