var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v2.0.1';
const api_provider = 'LBU';

router.get('/user', function(req, res) {
    const user = req.params.username;
    const data = mkUserData(user);
    res.send(data);
});

router.get('/users/:username', function(req, res, next) {
    const user = req.params.username;
    if (users.hasOwnProperty(user)) {
        res.json(users[user]);
    }
    res.status(404).send();
});

router.get('/courses', function(req, res, next) {
    const user = req.params.username;
    if (user_course_data.hasOwnProperty(user)) {
        res.json(user_course_data);
        return;
    }
    res.status(404).send();
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

const user_list = [
    'userA', 'userB', 'userC', 'userD', 'userE', 'userF',
    'userG', 'userH', 'userI', 'userJ', 'userK', 'userL'
];

var courseList = {
    'Computer Science':[
        'Fundamentals of Computer Science', 'Developing the Computer Scientist', 'Networking', 'Java Fundamentals',
        'Advanced Java', 'Developing C++ appications', 'Web Development', 'Database Fundamentals'
    ], 
    'Business':[
        'Business1','Business2','Business3','Business4',
        'Business5','Business6','Business7','Business8'
    ],
    'Computing':[
        'comp1','comp2','comp3','comp4',
        'comp5','comp6','comp7','comp8'
    ], 
    'Sports':[
        'sports1','sports2','sports3','sports4',
        'sports5','sports6','sports7','sports8'
    ], 
    'Physiology':[
        'physio1','physio2','physio3','physio4',
        'physio5','physio6','physio7','physio8'
    ], 
    'Electrical Engineering':[
        'ElecEng1','ElecEng2','ElecEng3','ElecEng4',
        'ElecEng5','ElecEng6','ElecEng7','ElecEng8',
    ],
    'Physics':[
        'Physics1','Physics2','Physics3','Physics4',
        'Physics5','Physics6','Physics7','Physics8',
    ],
    'Chemistry':[
        'chem1','chem2','chem3','chem4',
        'chem5','chem6','chem7','chem8',
    ]
};

var course_id = [
    12345,23456,34567,45678,
    56789,67891,78912,89123
];

var module_id = [
    81215,89641,15631,71915,
    31231,68143,30249,29304
];


var index = 0;

function courseGen(noOfModules) {
    var profile = [];
    var used = {};
    var name = Object.keys(courseList)[index]    

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
            weighting: 100/noOfModules,
            progress: faker.random.number(100)
        });
    }
    return profile;
}

const mkUserData = user => ({
    "login": user,
    "id": faker.random.number({min: 10, max: 1000000}),
    "url": "https://api.leedsbeckett.ac.uk/students/" + user,
    "html_url": "https://leedsbeckett.ac.uk/" + user + "",
    "type": "Student",
    "site_admin": false,
    "num_of_courses": 1,
    "name": faker.name.findName(),
    "Attendance": faker.random.number(100),
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
    const obj = {};
    obj[user] = a;
    return obj;
}).reduce((a,b) => Object.assign(a,b));

const user_course_data = user_list.map(user => {
    const obj = {};
    obj[user] = [];
    for (var i=0; i<users[user]['num_of_courses']; ++i) {
        const course = mkCourseData();
        obj[user].push(course);
    }
    return obj;
}).reduce((a,b) => Object.assign(a,b));

////////////////////////////////////////////////////////////////
// Could make another for courses. e.g. displayes all courses //
// and the user assigned to those courses.                    //
//                                                            //
// Look at course/:username route, could give insperation.    //
////////////////////////////////////////////////////////////////

module.exports = router;