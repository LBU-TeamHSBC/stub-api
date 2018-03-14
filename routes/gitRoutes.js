var faker = require('faker');
var express = require('express');
var router = express.Router();

const version = 'v2.0.1';
const api_provider = 'GitHub';

const user_list = [1, 2, 3, 4, 5, 6];

const languages = [
    'bash', 'c', 'c++', 'go', 'java', 'javascript',
    'kotlin', 'lua', 'python', 'rust', 'sql', 'php'
];

const mkUserData = user => ({
    "login": user,
    "id": faker.random.number({min: 10, max: 1000000}),
    "avatar_url": faker.image.avatar(),
    "type": "User",
    "name": faker.name.firstName() + " " + faker.name.lastName(),
    "company": faker.company.companyName(),
    "blog": faker.internet.url(),
    "bio": faker.random.words(50),
    "public_repos": faker.random.number({min: 1, max: 5}),
    "public_gists": faker.random.number(5),
    "followers": faker.random.number(1500),
    "following": faker.random.number(100)
});

const mkRepoData = _ => ({
    id: faker.random.number({min: 10, max: 1000000}),
    name: faker.lorem.words(2),
    forks_count: faker.random.number(100),
    stars: faker.random.number(200),
    created_at: faker.date.past(10),
    updated_at: faker.date.recent(300)
});

const mkRepoLangData = _ => {
    const data = {};
    const langCount = faker.random.number({min: 1, max: 3});
    for (let i=0; i<langCount; ++i) {
        let idx = faker.random.number(languages.length - 1);
        let lang = languages[idx];
        data[lang] = faker.random.number({min: 1000, max: 90000});
    }
    return data;
};

const users = user_list.map(user => {
    const a = mkUserData(user);
    const ob = {};
    ob[user] = a;
    return ob;
}).reduce((a,b) => Object.assign(a,b));

const user_repos = user_list.map(user => {
    const ob = {};
    ob[user] = [];
    for (let i=0; i<users[user]['public_repos']; ++i) {
        const repo = mkRepoData();
        ob[user].push(repo);
    }
    return ob;
}).reduce((a,b) => Object.assign(a,b));

const user_repos_langs = user_list.map(user => {
    const ob = {};
    const repo_langs = {};
    for (repo of user_repos[user]) {
        repo_langs[repo.name] = mkRepoLangData();
    }
    ob[user] = repo_langs;
    return ob;
}).reduce((a,b) => Object.assign(a,b));

router.get('/raw_data', function(req, res, next) {
    res.json({
        users,
        user_repos,
        user_repos_langs
    });
});

// Get authed user data
router.get('/user', function(req, res, next) {
    const user = faker.internet.userName();
    const data = mkUserData(user);
    const extras = {
        "two_factor_authentication": true,
        "total_private_repos": faker.random.number(100),
        "private_gists": faker.random.number(81),
        "plan": { "name": "Medium", "space": 400, "private_repos": 20, "collaborators": 0 },
        "owned_private_repos": faker.random.number(150),
        "disk_usage": faker.random.number(15000),
        "collaborators": faker.random.number(8)
    };
    res.json(Object.assign(data, extras));
});

// Get unauthed user details
router.get('/users/:username', function(req, res, next) {
    const user = req.params.username;
    if (users.hasOwnProperty(user)) {
        res.json(users[user]);
    }
    res.status(404).send();
});

// Get list of repos for authed user
router.get('/user/repos', function(req, res, next) {
    data = []
    let repoCount = faker.random.number({min: 1, max: 20});
    for (let i=0; i<repoCount; ++i) {
        data.push(mkRepoData());
    }
    res.json(data);
});

// Get list of repos for user
router.get('/repos/:username', function(req, res, next) {
    const user = req.params.username;
    if (user_repos.hasOwnProperty(user)) {
        res.json(user_repos[user]);
        return;
    }
    res.status(404).send();
});

// Get languages for repo
router.get('/repos/:username/:repo/languages', function(req, res, next) {
    const user = req.params.username;
    const repo = req.params.repo;
    if (user_repos_langs.hasOwnProperty(user)
            && user_repos_langs[user].hasOwnProperty(repo)) {
        const langs = user_repos_langs[user][repo];
        res.json(langs);
        return;
    }
    res.status(404).send();
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