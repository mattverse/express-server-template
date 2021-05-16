const express = require('express')
  , http = require('http')
  , config = require('./config/config')
  , database = require('./database/database')
  , dotenv = require('dotenv')
const app = express();
const router = express.Router();
dotenv.config()

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//uncomment when using public folder

// const static = require('serve-static')
// const path = require('path')
// app.use(express.static("public"));
// app.use('/public', static(path.join(__dirname, 'public')));

const base_router = require('./routes/base_routes');
base_router(router, app);

app.use('/', router);

http.createServer(app).listen(app.get('port'), function(){
  ('Express server listening on port ' + app.get('port'));
  database.init(app, config);
});

