Rails.application.routes.draw do

  root 'home#index'
  
  get '/logout', to: 'application#logout'
  
  resources :home, only: [] do
    post 'login', :on => :collection
    post 'signup', :on => :collection
  end
  
  resources :user, only: [:index] do
    collection do
      resources :events, only: [:show] do
        resources :slides, only: [:create]
      end
    end
  end
  
  resources :client, only: [:index] do
    collection do
      resources :events, only: [:show] do
        resources :negotiations, only: [:create]
      end
    end
  end
  
  resources :admin, only: [:index] do
    collection do
      resources :events, only: [:show, :update, :new, :create] do
        resources :negotiations, only: [:create]
        resources :slides, only: [:create]
      end
      resources :forms, :only => [:show, :create]
    end
  end
  
end
