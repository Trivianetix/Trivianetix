const { Pool } = require('pg');

const PG_URI= 'postgres://ibehvobg:JfH2Fdi7fUvDbs__wCBuomeTWBy_S6qk@rajje.db.elephantsql.com:5432/ibehvobg';

const pool = new Pool({
    connectionString: PG_URI
});


pool.query("CREATE TABLE user (id SERIAL PRIMARY KEY, username VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL, age INT NOT NULL, state VARCHAR NOT NULL, education VARCHAR NOT NULL, games-played INT NOT NULL, correct-answers INT NOT NULL", (err, res) => {
    console.log(err, res)
    pool.end();
})

module.exports = { 
    query: (text, params, callback) => {
        console.log('exeuted query', text);
        return pool.query(text, params, callback);
    }
};

