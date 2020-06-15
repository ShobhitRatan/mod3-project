# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first) 
Piece.destroy_all
Piece.create(coordinates: "[0,4], [0,5], [0,6], [0,7]") 
Piece.create(coordinates: "[0,4], [1,4], [1,5], [1,6]") 
Piece.create(coordinates: "[1,4], [1,5], [1,6], [0,6]") 
Piece.create(coordinates: "[1,4], [1,5], [1,6], [0,5]") 
Piece.create(coordinates: "[1,6], [1,5], [0,6], [0,5]") 
Piece.create(coordinates: "[0,5], [0,6], [1,4], [1,5]") 
Piece.create(coordinates: "[0,4], [0,5], [1,5], [1,6]") 
