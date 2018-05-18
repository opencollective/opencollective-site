# OpenCollective (new) Website

[![Greenkeeper badge](https://badges.greenkeeper.io/opencollective/opencollective-site.svg)](https://greenkeeper.io/)

[![Circle CI](https://circleci.com/gh/OpenCollective/opencollective-site/tree/master.svg?style=shield&circle-token=529943730e6598363053a54a31969aa0278f0f33)](https://circleci.com/gh/OpenCollective/opencollective-site/tree/master)
[![Slack Status](https://slack.opencollective.com/badge.svg)](https://slack.opencollective.com)
[![Gitter chat](https://badges.gitter.im/OpenCollective/OpenCollective.svg)](https://gitter.im/OpenCollective/OpenCollective)
[![Dependency Status](https://david-dm.org/opencollective/opencollective-site.svg)](https://david-dm.org/opencollective/opencollective-site)


## Setup

```
npm install
```

## Run in dev

```
npm start
```

## Build for production

```
npm run start:prod
```

## Deployment

Use the `npm run deploy:staging` or `npm run deploy:production`.
CircleCI will run the tests on this branch and push to Heroku if successful (to staging only)

For quick pushing of hotfixes, you can do `npm run deploy:hotfix`. It'll take `master` and push to remote `production`, then push to `staging` to keep everything in sync.

### Manually
If you want to deploy the app on Heroku manually (only for production), you need to add the remotes:

```
git remote add heroku-production https://git.heroku.com/opencollective-prod-site.git
```

Then you can run:

```
git push heroku-production master
```

## Test

See [Wiki](https://github.com/OpenCollective/OpenCollective/wiki/Software-testing).

## Stack

- https://github.com/rackt/redux
- https://facebook.github.io/react/