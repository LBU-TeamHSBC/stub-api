var faker = require('faker');
var express = require('express');
var router = express.Router();


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
   ]

   var profile = new Array();

function genCourses(noOfCourses) {

    for (var i = 0; i < noOfCourses; i++)
        profile.push(new Object(
            {"CourseTitle" : coursesAvailable[i],
            "CourseCompletion" : faker.random.number({max:6})}
        ));

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

module.exports = router;