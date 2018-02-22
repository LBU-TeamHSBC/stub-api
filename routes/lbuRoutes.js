var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v1.0.0';
const api_provider = 'LBU';

router.get('/user', function(req, res) {
    const user = req.params.username;
    const data = mkData(user);
    res.send(data);
});


var courseList = {
    'Computer Science':[
        'Fundamentals of Computer Science', 
        'Developing the Computer Scientist',
        'Networking',
        'Java Fundamentals',
        'Advanced Java', 
        'Developing C++ appications', 
        'Web Development', 
        'Database Fundamentals'], 
    'Business':[],
    'Computing':[], 
    'Sports':[], 
    'Physiology':[], 
    'Electrical Engineering':[],
    'Physics':[],
    'Chemistry':[]
};

var course_id = Object.keys(courseList)[0]


function courseGen(noOfModules) {
    var profile = [];
    var used = {};
    var index;

    for (var i = 0; i < noOfModules; i++){

        while(true){
            index = faker.random.number({max:Object.values(courseList).length-1});

            if (!used.hasOwnProperty(index)){
                break;
            }
        }
        used[index] = true;

        profile.push({
            "ModuleID" : faker.random.number({max:999999}),
            "ModuleTitle" : courseList[course_id][index],
            "ModuleCompletion" : faker.random.number({max:100}),
            "Random" : faker.random.word()
        });
    }
    return profile;
}

const mkData = user => ({
    "login": user,
    "id": parseInt(Math.random( 10000000, 10)),
    "url": "https://api.leedsbeckett.ac.uk/students/" + user,
    "html_url": "https://leedsbeckett.ac.uk/" + user + "",
    "type": "Student",
    "site_admin": false,
    "name": faker.name.findName(),
    "location": faker.address.country(),
    "email": faker.internet.email(),
    "age": faker.random.number({min:16, max:50}),
    "profile": {
        "course": {
            "id": course_id,
            "modules": courseGen(faker.random.number({min:1, max:6})),
            "attendance": faker.random.number({max:100})
        }
    },
    "created_at": "2008-01-14T04:33:35Z",
    "updated_at": faker.date.recent()
});

router.get('/', (req, res) => {
    var endpoints = [];
    router.stack
        .filter(r => r.route.path !== '/')
        .forEach(r => {
            endpoints.push({
                link: r.route.path,
                methods: Object.keys(r.route.methods).sort()
            });
        });
    res.render('api_index', { base_url: req.baseUrl, version, api_provider, endpoints });
});

module.exports = router;