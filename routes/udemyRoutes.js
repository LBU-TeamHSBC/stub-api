var express = require('express');
var faker = require('faker');
var router = express.Router();


router.get('/user', function(req, res) {
    const user = req.params.username;
    const data = mkData(user);
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

var profile = new Array();

function genCourses(noOfCourses) {

    for (var i = 0; i < noOfCourses; i++)
        profile.push(new Object(
            {"CourseTitle" : courses[i],
            "CourseCompletion" : faker.random.number({max:15})}
        ));

    return profile
}

var mkData = user => ({
    "login": user,
    "id": parseInt(Math.random() * 1000000, 10),
    "avatar_url": faker.image.avatar(),
    "name": faker.name.findName(),
    "age": faker.random.number({min:17, max:45}),
    "company": faker.company.companyName(),
    "job": faker.name.jobDescriptor(),
    "blog": faker.internet.url(),
    "location": faker.address.state(),
    "email": faker.internet.email(),
    "Course": genCourses(faker.random.number({max:5})),
    "Number of Subscribed Courses" : profile.length,
    "updated_at": "2008-01-14T04:33:35Z"
});

module.exports = router;
