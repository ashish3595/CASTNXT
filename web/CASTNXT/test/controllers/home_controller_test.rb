require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end
  
  test "should get index" do
    get '/'
    assert_response :success
  end
  
  test "should return user info when user exists" do
    get '/', params: {email: @user.email, password: @user.password }
    response_body = @response.parsed_body
    assert_equal @user.userType, response_body["userType"]
  end
  
  test "should return appropriate response when user doesn't exist" do
    get '/', params: {email: "email", password:"password" }
    response_body = @response.parsed_body
    assert_equal "User not found!", response_body["comment"]
  end
  
  test "should create new user" do
    post '/', params: { email: 'new_user@email.com', name: 'new user', type: 'test' }
    response_body = @response.parsed_body
    assert_equal 'test', response_body["userType"]
  end
  
  test "should return appropriate response when user exists while creating new user" do
    post '/', params: { email: @user.email, name: @user.name, type: @user.userType }
    response_body = @response.parsed_body
    assert_equal "Email already exists!", response_body["comment"]
  end
end
