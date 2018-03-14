var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v2.1.0';
const api_provider = 'Udemy';

router.get('/user', function(req, res) {
    const user = req.params.username;
    const data = mkUserData(user);
    res.send(data);
});

router.get('/users/:username', function(req, res) {
    const user = req.params.username;
    if (users.hasOwnProperty(user)) {
        res.json(users[user]);
    }
    res.status(404).send();
});

router.get('/course', function(req, res) {
    const user = req.params.username;
    const data = mkCourse(user);
    res.send(data);
});


router.get('/course/:username', function(req, res, next) {
    const user = req.params.username;
    if (user_course_data.hasOwnProperty(user)) {
        res.json(user_course_data[user]);
        return;
    }
    res.status(404).send();
});

// router.get('/raw_data', function(req, res, next) {
//     res.json({
//         users,
//         user_course_data
//     });
// });



const user_list = [
    'userA', 'userB', 'userC', 'userD', 'userE', 'userF',
    'userG', 'userH', 'userI', 'userJ', 'userK', 'userL'
];

var courses = [
    "Blockchain and Bitcoin Fundamentals",
    "AWS Certified Solutions Architect - Associate Practice Tests",
    "The Complete Cyber Security Course : Anonymous Browsing!",
    "Learn Ethical Hacking From Scratch",
    "The Web Developer Bootcamp",
    "The Complete iOS 9 Developer Course - Build 18 Apps",
    "The Complete HTML & CSS Course - From Novice To Professional",
    "Complete Python Bootcamp: Go from zero to hero in Python",
    "The Complete Android N Developer Course",
    "REST APIs with Flask and Python"
];


var course_id = [
    "77504", "92886", "84982", "50542", "99453",
    "48069", "51843", "13676", "26095", "16985"
];




var profile = [];
var courseProfile = [];


function genUsers(noOfCourses) {

    profile = [];

    for (var i = 0; i < noOfCourses; i++) {
        profile.push(new Object(
            {
                "CourseTitle" : courses[i],
                "CourseCompletion" : faker.random.number({max:100}),
                "CourseID" : course_id[i]
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
             "CourseID" : course_id[i]
            }
        ));
    }

    return courseProfile;
}

const mkUserData = user => ({
    "login": user,
    "id": faker.random.number({min: 10, max: 1000000}),
    "avatar_url": faker.image.avatar(),
    "name": faker.name.findName(),
    "age": faker.random.number({min:17, max:45}),
    "company": faker.company.companyName(),
    "job title": faker.name.jobTitle(),
    "job area": faker.name.jobArea(),
    "job type": faker.name.jobType(),
    "location": faker.address.state(),
    "email": faker.internet.email(),
    "blog": faker.internet.url(),
    "url": "https://api.udemy.ac.uk/students/" + user,
    "html_url": "https://udemy.ac.uk/" + user + "",
    "num_of_courses": faker.random.number({min:1,max:10}),
    "updated_at": faker.date.recent()
});

var mkCourse = course => ({
    "Number of Available Courses" : courses.length,
    "Course" : genCourses()

});

var mkCourseData = user => ({
    "Course": genUsers(faker.random.number({min:1,max:10})),
    "Number of Subscribed Courses" : profile.length,
});



// const mkCourseData = _ => ({
//     course_id: faker.random.number(course_id),
//     // name: Object.keys(cou)[index],
//     rating: faker.random.number(100),
//     participant_count: faker.random.number(200),
//     progress: faker.random.number(100),
//     modules: courseGen(faker.random.number({min:1, max:6}))
// });

const users = user_list.map(user => {
        const a = mkUserData(user);
const obj = {};
obj[user] = a;
return obj;
}).reduce((a,b) => Object.assign(a,b));

const user_course_data = user_list.map(user => {
        const obj = {};
obj[user] = [];
    const course = mkCourseData();
    obj[user].push(course);
return obj;
}).reduce((a,b) => Object.assign(a,b));


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