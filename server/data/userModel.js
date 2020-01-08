const { Pool } = require('pg');

const PG_URI= 'postgres://xrlygvut:k-3HzpyxMhn6IDgOczHvijjujS7EnF-5@rajje.db.elephantsql.com:5432/xrlygvut';

const pool = new Pool({
    connectionString: PG_URI
});


module.exports = { 
    query: (text, params, callback) => {
        console.log('exeuted query', text);
        return pool.query(text, params, callback);
    }
};

