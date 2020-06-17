class ApplicationController < ActionController::API
    def homeRoute
        render 'index.html'
    end
end
