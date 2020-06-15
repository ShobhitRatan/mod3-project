class CreatePieces < ActiveRecord::Migration[6.0]
  def change
    create_table :pieces do |t|
      t.string :coordinates 
      t.timestamps
    end
  end
end
