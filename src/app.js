const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

executeSQL = async (db, sql, req, res) => {
  try {
    const rows = await db.all(sql);
    if (rows.length === 0) {
      return res.send({
        error_code: 'NOT_FOUND_ERROR',
        message: 'No Records',
      });
    }
    return res.send(rows);
  } catch (error) {
    // logger.error(sql);
    // logger.error(error);
    return res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error',
    });
  }
};

module.exports = db => {
  app.use('/test', (req, res) => {
      db.run(
        'INSERT INTO HelloWorld VALUES (?)', ["Hello World from DB"]
      ).then(result => {});
    res.send({
      error_code: 'OK',
      message: 'Created Test Data',
    });
  });
  app.get('/', async (req, res) => {
    const sql = `SELECT * FROM HelloWorld LIMIT 1`;
    executeSQL(db, sql, req, res);
  });
  return app;
};
