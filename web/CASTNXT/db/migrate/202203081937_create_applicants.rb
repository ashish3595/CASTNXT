class CreateApplicants < ActiveRecord::Migration[5.2]
  def change
    create_table :applicants do |t|
      t.belongs_to :users, index: true, foreign_key: true
      t.belongs_to :events, index: true, foreign_key: true
      t.string :fname
      t.string :lname
      t.string :email
      t.string :phone
      t.string :city
      t.string :answers
      t.string :status
      
      t.timestamps
    end
  end
end