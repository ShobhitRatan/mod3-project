class AddNameToScores < ActiveRecord::Migration[6.0]
  def change
    add_column :scores, :name, :string
  end
end
