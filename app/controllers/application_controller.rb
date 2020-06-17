class ApplicationController < ActionController::API
    def home
        render 'index.html'
    end
end
