# Manual Visitors Registration Service

This is front for my AWS Lambda Serverless Test Project

Simple Vue3 + bootstrap project deployed on AWS
You shoud have Vue CLI, AWS CLI installed to use all npm scripts.

link:
http://visitorregistrationserver.s3-website.us-east-1.amazonaws.com/

## Project setup

```
npm install

change in .env url to you endpoints
VUE_APP_SERVER_URL = http...

```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Deploy in production

```
--create AWS bucket:
npm run creates3
--make website from bucket
npm run makes3asweb
--grant access to policy change
npm run s3access
--change policy
npm run s3policy

--deploy from ./dist to s3 bucket
npm run deploy

```

### Lints and fixes files

```
npm run lint
```

### Customize configuration
