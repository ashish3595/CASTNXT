class HomeController < ApplicationController
  # GET /
  def index
    if is_session_valid?
      redirect_to get_redirect_path
    end
  end
  
  # POST /home/signup
  # POST /admin/signup
  def signup
    begin
      if new_user?(params[:email])
        create_user(params)
        currentUser = get_user(params[:email], params[:password])
        session[:userEmail] = currentUser.email
        session[:userType] = currentUser.user_type
        session[:userName] = currentUser.name
        session[:userId] = currentUser._id.to_str
        render json: {redirect_path: get_redirect_path}, status: 201
      else
        render json: {comment: "An account with the given Email already exists!"}, status: 400
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  # POST /home/login
  def login
    begin
      if correct_user?(params[:email], params[:password])
        currentUser = get_user(params[:email], params[:password])
        session[:userEmail] = currentUser.email
        session[:userType] = currentUser.user_type
        session[:userName] = currentUser.name
        session[:userId] = currentUser._id.to_str
        render json: {redirect_path: get_redirect_path}, status: 200
      else
        render json: {comment: "The entered Username or Password is incorrect!"}, status: 400
      end
    rescue Exception
      render json: {comment: "Internal Error!"}, status: 500
    end
  end
  
  private
  
  def get_user email, password
    return Auth.find_by(:email => email, :password => password)
  end
  
  def new_user? email
    if Auth.where(:email => email).blank?
      return true
    end
    
    return false
  end
  
  def correct_user? email, password
    if Auth.where(:email => email, :password => password).present?
      return true
    end
    
    return false
  end
  
  def create_user params
    user = Auth.create(:name => params[:name], :email => params[:email], :password => params[:password], :user_type => params[:type])
    if "ADMIN".casecmp? params[:type]
      Producer.create(:_id => user._id.to_str, :name => user.name, :email => user.email)
    elsif "CLIENT".casecmp? params[:type]
      Client.create(:_id => user._id.to_str, :name => user.name, :email => user.email)
    else
      Talent.create(:_id => user._id.to_str, :name => user.name, :email => user.email)
    end
  end

  def get_redirect_path
    if "ADMIN".casecmp? session[:userType]
      return "/admin"
    elsif "CLIENT".casecmp? session[:userType]
      return "/client"
    else
      return "/user"
    end
  end
end