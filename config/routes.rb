Rails.application.routes.draw do
  get '/api', to: 'api#getRandom'
  resources :pieces
  resources :scores
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
