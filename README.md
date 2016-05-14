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
Builds are done with gulp. Bundling is handled by Webpack, and transpiling from ES2015 is done by Babel. 

## Server
It includes a lightweight express server using handlebars to render the initial page.

## CSS
CSS is compiled using SASS with the gulp-sass project. SASS files are split into logical files, ready to be customized. 

### Icons
Icons are built into icon font files using Fontcustom. Open Iconic is included and can easily be built via the command line. Another custom folder is included to begin making your own icon font.
