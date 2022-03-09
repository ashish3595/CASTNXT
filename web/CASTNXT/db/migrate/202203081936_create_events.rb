class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.string :template
      t.string :status
      
      t.timestamps
    end
  end
end