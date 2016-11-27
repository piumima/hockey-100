var express = require('express'); //express framework
var app = express();
var fs = require('fs');
var parse = require('csv-parse');
var bodyParser = require('body-parser');

//global variable for holding user data read in from file
var users = [];

//global variable for team names
var teams = ["senators", "oilers", "nordiques", "flames", "canucks", "canadiens", "mapleleafs", "jets"]

app.use(express.static('public'));

//catch all requests and log them
app.use('*', function(req, res, next){
    console.log(req.method+' request for '+req.url);
    next();
});

app.use(bodyParser.urlencoded({extended:false}));

//handle requests to generate a user's card
app.post('/getCardStats', function(req,res){
    fs.createReadStream("./data/users.csv")
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        //add each user to the array
        var user = initUser(csvrow);
        users[user.id] = user;  
    })
    .on('end',function() {
        //send back data for the requested user
        var result = users[req.body.id];
        if(result === undefined){
            console.log("User undefined");
            res.sendStatus(404);
        }
        else{
            console.log(result)
            res.send(result);          
        }
    });
    
});


app.listen(2406,function(){
	console.log('Server listening on port 2406');
});

/*
    Purpose: convert an array of user data into a user object
         in: data - array of user data from users.csv file
        out: user object with id, name, team, goals, slapShot,
             actionShot, headShot properties
*/
function initUser(data){
    var newUser = {};
    newUser.id = data[0];
    newUser.name = data[1];
    newUser.team = teams[parseInt(data[2])];
    newUser.goals = data[3];
    newUser.slapShot = data[4];
    newUser.actionShot = data[5];
    newUser.headShot = data[6];
    return newUser;
}