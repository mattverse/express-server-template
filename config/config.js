require('dotenv').config();

module.exports = {
	server_port: 3000,
	db_url: process.env.MONGODBURL,
	db_schemas: [
        {file:'./user_schema', collection:'users_profiles', schemaName:'UserSchema_profile', modelName:'UserModel_profile'}
	],
	route_info: [
	],
}