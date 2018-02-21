var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v1.0.0';
const api_provider = 'LBU';

router.get('/users/:username', function(req, res, next) {
    const user = req.params.username;
    const data = mkData(user)
    res.send(data);
});

router.get('/user', function(req, res, next) {
    const user = req.params.username;
    const data = mkData(user);
    res.send(Object.assign(data));
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

var moduleList = [
    ];

var course_id = Object.keys(courseList)[faker.random.number({max:Object.keys(courseList).length-1})];  

console.log(course_id);

console.log(courseList[course_id]);
console.log(faker.random.number({max:Object.values(courseList).length}));

function courseGen(noOfModules) {
    var profile = [];
    var used = {};
    var index;

    for (var i = 0; i < noOfModules; i++){

        while(true){
            index = faker.random.number({max:Object.values(courseList).length});

            if (!used.hasOwnProperty(index)){
                break;
            }
        }
        used[index] = true;

        profile.push({
            "ModuleId" : faker.random.number({max:999999}),
            "ModuleTitle" : courseList(course_id[index]),
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
    "name": faker.name.firstName() + " " + faker.name.lastName(),
    "location": faker.address.country(),
    "email": faker.internet.email(),
    "age": faker.random.number({min:16, max:50}),
    "profile": {
        "course": {
            "id": course_id,
            "modules": moduleList[course_id[courseGen(faker.random.number({min:1, max:6}))]],
            "attendace": faker.random.number({max:100})
        }
    },
    "created_at": "2008-01-14T04:33:35Z",
    "updated_at": "2008-01-14T04:33:35Z"
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