# Burst Starter Kit
This project is my personal starter kit for a single page web app.

Client libraries include:
* React
* Redux
 * Redux Thunk - Create actions that return a thunk. Great for async actions.
 * Reselect - Memoize selectors to help reduce renders in your react tree
 * Redux Logger - Console logging of actions
* React Router
 * React Router Redux - Keep route in the store and use actions to navigate from other actions.
* Lodash


## Build
Builds are done with [gulp](http://gulpjs.com/). Bundling is handled by [Webpack](https://webpack.github.io/), and transpiling from ES2015 is done by [Babel](https://babeljs.io/). 

### Gulp
Gulp will watch .scss and .js/.jsx files for changes and automatically re-run the build processes. 

Start the gulp build and gulp watch:
```
gulp
```

Just build:
```
gulp build
```

Just watch:
```
gulp watch
```

## Server
It includes a lightweight express server using handlebars to render the initial page.

To start the server locally use:
```
npm start
```

This will run server.js on port 8000. This can easily be changed in server.js to be anything you want.


## CSS
CSS is compiled using [SASS](http://sass-lang.com/) with the [gulp-sass](https://www.npmjs.com/package/gulp-sass) project. SASS files are split into logical files, ready to be customized.

```
/src
--/sass
---/styles.css - Master entry point that includes all other .scss files.
---/modules - Globally available variables and mixins
----/colors - Variables for site-wide colors
----/layers - Variables for z-index to keep consistency
----/typography - Variables for type faces and weights
----/breakpoints - Variables for responsive breakpoints
---/partials - Globally included css
----/normalize - Removes and reset browser specific styles
----/base - Base styles
----/buttons - Buttons of varying types ready to be added
----/fonts - App specific fonts. Includes the icon font 'open iconic' and 'open sans' as starters
----/icons - Generated icon file from font-custom
---/sections - application specific sections
---/components - React specific CSS files for specific components
---/vendor - Place to keep vendor specific stylesheets
``` 

### Icons
Icons are built into icon font files using [Fontcustom](https://github.com/FontCustom/fontcustom). [Open Iconic](https://github.com/iconic/open-iconic) is included as a starter and can easily be built via the foncustom command line tool. Another custom folder is included to begin making your own icon font.
