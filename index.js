const express = require('express');

const app = express();
const port = 7777;

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite-async');

const buildSchemas = require('./src/schemas');

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // add this line to include winston logging
//   logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const main = async () => {
  try {
    const db = await sqlite3.open(':memory:');
    buildSchemas(db);
    const app = require('./src/app')(db);

    app.listen(port, () => console.log(`App started and listening on port ${port}`));
  } catch (error) {
    throw Error('can not access sqlite database');
  }
};

main();
