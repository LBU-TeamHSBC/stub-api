var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v1.0.0';
const api_provider = 'Udacity';

router.get('/user', function(req, res, next) {
    const user = req.params.username;
    const data = mkData(user);
    const extras = {
            };
    res.send(Object.assign(data, extras));
});

var coursesAvailable = [
   "Become a Professional React Developer",
   "Intro to Programming Nanodegree",
   "Become a VR Developer",
   "Android Basics by Google",
   "Become a Data Analyst",
   "Intro to Artificial Intelligence",
   "Intro to Data Science"
];

var profile = [];

function genCourses(noOfCourses) {
    profile = [];
    for (var i = 0; i < noOfCourses; i++) {
        profile.push(new Object(
            {"CourseTitle" : coursesAvailable[i],
            "CourseCompletion" : faker.random.number({max:6})}
        ));
    }
    return profile;
}

const mkData = user => ({
    "login": user,
    "id": parseInt(Math.random() * 1000000, 10),
    "Course": genCourses(faker.random.number({max:5})),
    "Number of Subscribed Courses" : profile.length,
    "name": faker.name.firstName() + " " + faker.name.lastName(),
    "email": faker.internet.email(),
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