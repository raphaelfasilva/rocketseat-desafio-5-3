const { Pool } = require("pg")

module.exports = new Pool({
    user: 'my_teacher',
    password: "teacher123@",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})