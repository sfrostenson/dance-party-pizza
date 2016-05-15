# TK project name

## Dependencies
This template uses gulp and browserify as a project scaffolding tool. To use it, you'll need node and gulp installed.

To install node with homebrew:
````
brew install node
````
To install gulp globally:
````
npm install -g gulp
````

## Installing and using this template
To install project dependencies in package.json:
````
npm install
````

To install additional dependencies and devDependencies:
````
npm install <PKGNAME> --save
````
````
npm install <PKGNAME> --save-dev
````

To run gulp:
````
gulp
````
The default `gulp` command launches watchify to monitor changes in src, browserify to compile bundled.js in build & a server that refreshes automatically.

To minify files for production:
````
gulp build
````
The `gulp build` command compresses generated js/css. Must have run the default `gulp` command at least once.


## TODO
- return straight line at pause state
- check functionality of pause, play, upload
  - i.e. on upload, should autoplay
- functionality of microphone
- style of buttons/navs
- make responsive
- other visualization views

- how can i call foundation-css locally instead of linking to CDN?

## resources
- https://lostechies.com/derickbailey/2013/09/23/getting-audio-file-information-with-htmls-file-api-and-audio-element/
