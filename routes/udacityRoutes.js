var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v1.0.1';
const api_provider = 'Udacity';

router.get('/user', function(req, res, next) {
    const user = req.params.username;
    const data = mkData(user);
    res.send(data);
});

var courses = [
    "Front-End Web Developer Nanodegree",
    "Senior Web Developer Nanodegree",
    "Full Stack Web Developer Nanodegree",
    "Data Analyst Nanodegree",
    "Machine Learning Engineer Nanodegree",
    "Tech Entrepreneur Nanodegree",
    "Android Basics Nanodegree",
    "Android Developer Nanodegree",
    "iOS Developer Nanodegree",
    "Mobile Game Developer Nanodegree",
    "Predictive Analytics for Business Nanodegree",
    "Intro to HTML and CSS",
    "Responsive Web Design Fundamentals",
    "Responsive Images",
    "JavaScript Basics",
];

var courseID = [
    "13299",
    "91726",
    "31631",
    "83538",
    "48790",
    "20096",
    "63664",
    "45670",
    "79420",
    "28607",
    "78449",
    "55008",
    "98080",
    "27318",
    "78407"];

var profile = [];

function genCourses(noOfCourses) {
    profile = [];
    for (var i = 0; i < noOfCourses; i++) {
        profile.push(new Object(
            {"CourseTitle" : courses[i],
             "CourseCompletion" : faker.random.number({max:100}),
             "CourseID" : courseID[i]}

    ));
    }
    return profile;
}

const mkData = user => ({
    "login": user,
    "name": faker.name.findName(),
    "email": faker.internet.email(),
    "id": parseInt(Math.random() * 1000000, 10),
    "Course": genCourses(faker.random.number({min:1,max:15})),
    "Number of Subscribed Courses" : profile.length
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