var Schema = {};

Schema.createSchema = function(mongoose){
    UserSchema_profile = mongoose.Schema({
        email: String,
        password: String,
    });
    return UserSchema_profile;
}

module.exports = Schema;