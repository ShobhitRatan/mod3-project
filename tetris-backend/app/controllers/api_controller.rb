class ApiController < ApplicationController

    def getRandom
        render json: Piece.all.sample()
    end

end