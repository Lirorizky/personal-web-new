const {Pool} = require('pg')

const dbPool = new Pool({
    database: 'personal-web-new',
    port:5432,
    user: 'postgres',
    password: 'ROOT'
})

module.exports = dbPool