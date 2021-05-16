var mongoose = require('mongoose');
var database = {};

database.init = function(app, config) {
	connect(app, config);
}

function connect(app, config) {
    mongoose.Promise = global.Promise; 
	mongoose.connect(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useUnifiedTopology', true);
	database.db = mongoose.connection;

	database.db.on('error', console.error.bind(console, 'mongoose connection error.'));	
	database.db.on('open', function () {
		createSchema(app, config);
		console.log("DB LOADED");
	});
	database.db.on('disconnected', connect);
}


function createSchema(app, config) {
	console.log("CREATING SCHEMA");
	const schemaLen = config.db_schemas.length;	
	for (var i = 0; i < schemaLen; i++) {
		var curItem = config.db_schemas[i];
		var curSchema = require(curItem.file).createSchema(mongoose);
		var curModel = mongoose.model(curItem.collection, curSchema);
		database[curItem.schemaName] = curSchema;
		database[curItem.modelName] = curModel;
	}
	app.set('database', database);
}

module.exports = database;
