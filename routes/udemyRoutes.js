var express = require('express');
var faker = require('faker');
var router = express.Router();

const version = 'v1.0.0';
const api_provider = 'Udemy';

router.get('/user', function(req, res) {
    const user = req.params.username;
    const data = mkData(user);
    res.send(data);
});

router.get('/course', function(req, res) {
    const user = req.params.username;
    const data = mkCourse(user);
    res.send(data);
});

var courses = ["Blockchain and Bitcoin Fundamentals",
    "AWS Certified Solutions Architect - Associate Practice Tests",
    "The Complete Cyber Security Course : Anonymous Browsing!",
    "Learn Ethical Hacking From Scratch",
    "The Web Developer Bootcamp",
    "The Complete iOS 9 Developer Course - Build 18 Apps",
    "The Complete HTML & CSS Course - From Novice To Professional",
    "Complete Python Bootcamp: Go from zero to hero in Python",
    "The Complete Android N Developer Course",
    "REST APIs with Flask and Python",
    "AWS Serverless APIs & Apps - A Complete Introduction"];

var courseID = ["77504",
    "92886",
    "84982",
    "50542",
    "99453",
    "48069",
    "51843",
    "13676",
    "26095",
    "16985",
    "36544"];

var profile = [];
var courseProfile = [];


function genUsers(noOfCourses) {

    profile = [];

    for (var i = 0; i < noOfCourses; i++) {
        profile.push(new Object(
            {"CourseTitle" : courses[i],
             "CourseCompletion" : faker.random.number({max:15}),
             "CourseID" : courseID[i]
            }
        ));
    }

    return profile
}


function genCourses() {

    courseProfile = [];

    for (var i = 0; i < courses.length; i++) {
        courseProfile.push(new Object(
            {"CourseTitle" : courses[i],
             "CourseRating" : faker.random.number({max:5}),
             "CourseUsers" : faker.random.number({max:100000}),
             "CourseID" : courseID[i]
            }
        ));
    }

    return courseProfile;
}

var mkData = user => ({
    "login": user,
    "id": parseInt(Math.random() * 1000000, 10),
    "avatar_url": faker.image.avatar(),
    "name": faker.name.prefix() + " " + faker.name.findName(),
    "age": faker.random.number({min:17, max:45}),
    "company": faker.company.companyName(),
    "job title": faker.name.jobTitle(),
    "job area": faker.name.jobArea(),
    "job type": faker.name.jobType(),
    "blog": faker.internet.url(),
    "location": faker.address.state(),
    "email": faker.internet.email(),
    "Course": genUsers(faker.random.number({min:1,max:10})),
    "Number of Subscribed Courses" : profile.length,
    "updated_at": faker.date.recent()
});

var mkCourse = course => ({
    "Number of Available Courses" : courses.length,
    "Course" : genCourses()

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