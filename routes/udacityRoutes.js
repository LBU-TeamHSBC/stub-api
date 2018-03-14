var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v2.0.0';
const api_provider = 'Udacity';

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

router.get('/raw_data', function(req, res, next) {
    res.send({
        users,
        user_course_data
    });
});



const user_list = [
    'userA', 'userB', 'userC', 'userD', 'userE', 'userF',
    'userG', 'userH', 'userI', 'userJ', 'userK', 'userL'
];

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


var course_id = [
    "13299", "91726", "31631", "83538", "48790",
    "20096", "63664", "45670", "79420", "28607",
    "78449", "55008", "98080", "27318", "78407"
];

var profile = [];

function genUsers(noOfCourses) {

    profile = [];

    for (var i = 0; i < noOfCourses; i++) {
        profile.push(new Object(
            {
                "CourseID" : course_id[i],
                "CourseTitle" : courses[i],
                "CourseCompletion" : faker.random.number({max:100}),
                "CourseRating" : faker.random.number({max:5}),
                "CourseUsers" : faker.random.number({max:100000})
            }
        ));
    }

    return profile
}

function genCourses() {
    profile = [];
    for (var i = 0; i < courses.length; i++) {
        profile.push(new Object(
            {
                "CourseTitle" : courses[i],
                "CourseCompletion" : faker.random.number({max:100}),
                "CourseID" : course_id[i]
            }

        ));
    }
    return profile;
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
    "updated_at": faker.date.recent()
});

var mkCourse = course => ({
    "Number of Available Courses" : courses.length,
    "Course" : genCourses()

});

const mkCourseData = _ => ({
    "Course": genUsers(faker.random.number({min:1,max:10})),
    "Number of Subscribed Courses" : profile.length
});

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