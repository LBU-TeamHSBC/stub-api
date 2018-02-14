var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v1.0.0';
const api_provider = 'GitHub';

// Get authed user data
router.get('/user', function(req, res, next) {
    const user = req.params.username;
    const data = mkUserData(user);
    const extras = {
        "two_factor_authentication": true,
        "total_private_repos": 100,
        "private_gists": 81,
        "plan": { "name": "Medium", "space": 400, "private_repos": 20, "collaborators": 0 },
        "owned_private_repos": 100,
        "disk_usage": 10000,
        "collaborators": 8
    };
    res.send(Object.assign(data, extras));
});


// Get user details
router.get('/users/:username', function(req, res, next) {
    const user = req.params.username;
    const data = mkUserData(user);
    res.send(data);
});

// Get list of repos for user
router.get('/users/:username/repos', function(req, res, next) {
    data = []
    let repoCount = faker.random.number({min: 1, max: 20});
    for (let i=0; i<repoCount; ++i) {
        data.push({
            id: faker.random.number({min: 10, max: 1000000}),
            name: faker.lorem.words(2),
            forks_count: faker.random.number(100)
        });
    }
    res.send(data);
});

// Get languages for repo
router.get('/repos/:username/:repo/languages', function(req, res, next) {
    const data = {};
    const languages = [
        'bash', 'c', 'c++', 'go', 'java', 'javascript',
        'kotlin', 'lua', 'python', 'rust', 'sql'
    ];
    const langCount = faker.random.number({min: 1, max: 4});
    for (let i=0; i<langCount; ++i) {
        let id = faker.random.number(languages.length - 1);
        let lang = languages[id];
        data[lang] = faker.random.number(90000);
    }
    res.send(data)
});

const mkUserData = user => ({
    "login": user,
    "id": faker.random.number({min: 10, max: 1000000}),
    "avatar_url": faker.image.avatar(),
    "gravatar_id": "",
    "url": "https://api.github.com/users/" + user,
    "html_url": "https://github.com/" + user + "",
    "followers_url": "https://api.github.com/users/" + user + "/followers",
    "following_url": "https://api.github.com/users/" + user + "/following{/other_user}",
    "gists_url": "https://api.github.com/users/" + user + "/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/" + user + "/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/" + user + "/subscriptions",
    "organizations_url": "https://api.github.com/users/" + user + "/orgs",
    "repos_url": "https://api.github.com/users/" + user + "/repos",
    "events_url": "https://api.github.com/users/" + user + "/events{/privacy}",
    "received_events_url": "https://api.github.com/users/" + user + "/received_events",
    "type": "User",
    "site_admin": false,
    "name": faker.name.firstName() + " " + faker.name.lastName(),
    "company": faker.company.companyName(),
    "blog": faker.internet.url(),
    "location": faker.address.state(),
    "email": faker.internet.email(),
    "hireable": faker.random.boolean(),
    "bio": "There once was...",
    "public_repos": 2,
    "public_gists": 1,
    "followers": faker.random.number(),
    "following": 0,
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