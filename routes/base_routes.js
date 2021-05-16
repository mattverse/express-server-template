const database = require("../database/database");
const bcrypt = require("bcrypt");

module.exports = function(router, passport, app){


    router.get("/user_count", async(req,res) => {
        const database = app.get('database');
        database.UserModel_profile.countDocuments({}, function (err, result){
            if(err) console.log(err);
            res.status(200).send({count: result})
        });
    })

    router.post("/signup", async (req, res) => {
        const database = app.get("database")
        const body = req.body;
        if(!(body.email && body.password)){
            return res.status(400).send({ error: "Data not formatted properly"})
        }
        const user = new database.UserModel_profile(body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.save().then((doc) => res.status(201).send(doc));
    });

    router.post("/login", async (req, res) => {
        const database = app.get("database");
        const body = req.body;
        const user = await database.UserModel_profile.findOne({ email: body.email});
        if(user){
            const validPassword = await bcrypt.compare(body.password, user.password);
            if(validPassword){
                res.status(200).json({ message: "Valid Password"});
            } else{
                res.status(400).json({ error: "Invalid Password"});
            }
        }else{
            res.status(401).json({ error: "User does not exist" });
        }
    });
}