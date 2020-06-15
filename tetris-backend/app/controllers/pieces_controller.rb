class PiecesController < ApplicationController
    def show 
        default = {} 
        piece = Piece.find(params[:id]) 
        default[:include] = [:coordinates]   
        render json: piece 
    end 

    def index 
        default = {} 
        pieces = Piece.all 
        default[:include] = [:coordinates]   
        render json: pieces 
    end 
end
