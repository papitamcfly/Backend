import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'adresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('street',255).notNullable()
      table.string('suburb',255).notNullable()
      table.string('city',255).notNullable()
      table.string('state',255).notNullable()
      table.string('country',255).notNullable()
      table.string('zip_code',5).notNullable()
      table.double('latitude',255).notNullable()
      table.double('longitude',255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
