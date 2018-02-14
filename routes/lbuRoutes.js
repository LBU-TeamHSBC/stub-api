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

var moduleList = ['stuff', 'more stuff', 'even more stuff', 'you get the idea...'];

function courseGen(noOfModules) {
    var profile = [];
    for (var i = 0; i < noOfModules; i++){
        profile.push({
            "ModuleTitle" : moduleList[Math.floor(Math.random() * moduleList.length)],
            "ModuleCompletion" : faker.random.number({max:100})
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
    "Profile:": {
       "Modules:": courseGen(faker.random.number({min:1, max:moduleList.length - 1})),
       "Attendace:": faker.random.number({max:100})
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