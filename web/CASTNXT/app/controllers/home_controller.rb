class HomeController < ApplicationController

  def index
    Rails.logger.debug(params)
    Rails.logger.debug("HERE")
    puts "HERE"
    if session.key?(:userEmail) and session.key?(:userType)
      session_redirect
    end
    
    if params.key?(:email) and params.key?(:password)
      if correct_user?(params)
      session[:userEmail] = params[:email]
      session[:userType] = User.find_by(:email => params[:email], :password => params[:password]).userType
      Rails.logger.debug("Session")
      Rails.logger.debug(session[:userType])
      session_redirect
      else
        render json: {comment: "User not found!"}, status: 400
      end
    end
    
  end
  
  def create
    if new_user?(params[:email])
      create_user(params)
      session[:userEmail] = params[:email]
      session[:userType] = params[:type]
      redirect_to user_url
    else
      render json: {comment: "Email already exists!"}, status: 400
    end
  end
  
  private
  
  def new_user? email
    if User.where(:email => email).blank?
      return true
    end
    
    return false
  end
  
  def correct_user? params
    if User.where(:email => params[:email], :password => params[:password]).present?
      return true
    end
    
    return false
  end
  
  def create_user params
    User.create(name:params[:name], email:params[:email], password:params[:password], userType:params[:type])
  end

  def session_redirect
    if session[:userType] == "manager"
      redirect_to manager_url
    elsif session[:userType] == "designer"
      redirect_to designer_url
    else
      Rails.logger.debug("Error in route")
      redirect_to user_url
    end
  end
end
