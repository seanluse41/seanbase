class ApplicationController < ActionController::Base
  around_action :switch_locale
  before_action :redirect_subdomain

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def redirect_subdomain
    if request.host == "http://seanbase.com"
      redirect_to "www.seanbase.com" + request.fullpath, :status => 301
    end
  end

  def authorize_admin
    redirect_to :root unless current_user != nil && current_user.admin
  end
end
