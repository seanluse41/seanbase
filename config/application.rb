require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Seanbase
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    #regex with rack-rewrite gem to redirect 301 trailing slash domain names. seanbase.com/ now = seanbase.com
    config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
      r301 %r{^/(.*)/$}, "/$1"
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
