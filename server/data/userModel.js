const { Pool } = require('pg');

const PG_URI= 'postgres://ibehvobg:JfH2Fdi7fUvDbs__wCBuomeTWBy_S6qk@rajje.db.elephantsql.com:5432/ibehvobg';

const pool = new Pool({
    connectionString: PG_URI
});


module.exports = { 
    query: (text, params, callback) => {
        console.log('exeuted query', text);
        return pool.query(text, params, callback);
    }
};

