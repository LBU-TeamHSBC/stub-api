var faker = require('faker');
var express = require('express');
var router = express.Router();

router.get('/users/:username', function(req, res, next) {
    const user = req.params.username
    const data = {
        "login": user,
        "id": parseInt(Math.random() * 1000000, 10),
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
        "followers": 20,
        "following": 0,
        "created_at": "2008-01-14T04:33:35Z",
        "updated_at": "2008-01-14T04:33:35Z"
    }
    res.send(data);
});

module.exports = router;