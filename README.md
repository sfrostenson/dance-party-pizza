# Gulp Template

Gulp template with browserify, jQuery, bootstrap, backbone/lodash, and D3/topojson dependencies.

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


## Possible Improvements
1. Automatic publishing to the CDN.
2. Add universal SASS styles.
3. Yeoman generator: https://github.com/texastribune/generator-tt-newsapps