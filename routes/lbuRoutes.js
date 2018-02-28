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

const user_list = [
    'userA', 'userB', 'userC', 'userD', 'userE', 'userF',
    'userG', 'userH', 'userI', 'userJ', 'userK', 'userL'
];

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

var course_id = [
    12345,
    23456,
    34567,
    45678,
    56789,
    67891,
    78912,
    89123
];

var module_id = [
    81215,
    89641,
    15631,
    71915,
    31231,
    68143,
    30249,
    29304
];


var name = Object.keys(courseList)[0]
var index = 0;

function courseGen(noOfModules) {
    var profile = [];
    var used = {};

    for (var i = 0; i < noOfModules; i++){

        while(true){
            index = faker.random.number({max:Object.values(courseList).length-1});

            if (!used.hasOwnProperty(index)){
                break;
            }
        }
        used[index] = true;

        profile.push({
            id: faker.random.number(10000),
            module_id: faker.random.number(module_id),
            name: courseList[name][index],
            weighting: 100/courseGen,
            progress: faker.random.number(100)
        });
    }
    return profile;
}

const mkUserData = user => ({
    "login": user,
    "id": parseInt(Math.random( 10000000, 10)),
    "url": "https://api.leedsbeckett.ac.uk/students/" + user,
    "html_url": "https://leedsbeckett.ac.uk/" + user + "",
    "type": "Student",
    "site_admin": false,
    "num_of_courses": 1,
    "name": faker.name.findName(),
    "location": faker.address.country(),
    "email": faker.internet.email(),
    "age": faker.random.number({min:16, max:50}),
    "created_at": "2008-01-14T04:33:35Z",
    "updated_at": faker.date.recent()
});

const mkCourseData = _ => ({
    course_id: faker.random.number(course_id),
    name: Object.keys(courseList)[index],
    rating: faker.random.number(100),
    participant_count: faker.random.number(200),
    progress: faker.random.number(100),
    modules: courseGen(faker.random.number({min:1, max:6}))
});

const users = user_list.map(user => {
    const a = mkUserData(user);
    const ob = {};
    ob[user] = a;
    return ob;
}).reduce((a,b) => Object.assign(a,b));

const user_course_data = user_list.map(user => {
    const ob = {};
    ob[user] = [];
    for (let i=0; i<users[user]['num_of_courses']; ++i) {
        const mod = mkCourseData();
        ob[user].push(mod);
    }
    return ob;
}).reduce((a,b) => Object.assign(a,b));

router.get('/raw_data', function(req, res, next) {
    res.json({
        users,
        user_course_data
    });
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