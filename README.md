# Ionic App - Random User List

## Objectives

Create an app cross-platform with Ionic framework:
* Display users list
* Add an user
* Delete an user
* Display user info

Detail of this exercice [here](https://gist.github.com/skelz0r/80a41c9ef24b16879c3a#file-ionic-base-md)

## Resources

* [Ionic documentation](http://ionicframework.com/docs/)
* [AngularJS documentation](https://docs.angularjs.org/api)

## Requirements
* cordova
* npm

## How test app

Download the app on your machine
```
git clone https://github.com/popovkov57/tutoApp.git
```
Install project dependance
```
npm install angularjs
npm install angular-mocks
npm install protractor --save-dev
./node_modules/protractor/bin/webdriver-manager update

```
Test app on your browser
```
cd tutoApp
ionic serve
```
Start unit tests
```
gulp test
```
Start protractor tests
```
./node_modules/protractor/bin/protractor tests/e2e/protractor.config.js
```
Start linter
```
gulp lint
```

