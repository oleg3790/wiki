## Overview
There are various ways to configure React to work client side, one can add the CDN scripts to their HTML and start writing React in minutes; however, this option poses some challenges with productivity and when trying to organize your project in a scalable manner. 
<br/><br/>
One of the best ways to setup React is so that you can utilize JSX and also bundle your code; and for this we will be using Babel for compiling and Webpack for bundling. To manage the packages, we will be using NodeJS NPM (Node Package Manager).

## Project Initialization
**NodeJS needs to be installed on your machine for this to work**

- Start by creating a folder inside of your .NET project to hold the contents of the client side project. Once you have a folder created, navigate into the folder. 
- Open command prompt and navigate to the newly created folder. Run npm init, which will initiate the creation of a package.json file (make sure this file is included in your .NET solution, add it if it is not)
- Now that we have the project initiated, we need to install React, Babel, and Webpack. In CMD run the below command (double check the version of each library installed to make sure its dependencies align with the lib version)

```
npm i -S react react-dom
npm i -D babel-core babel-loader webpack babel-preset-env babel-preset-react
```

Also, install html-webpack-plugin, we will use this to automatically generate a Index.html based off of any template and including the js assets
```
npm i -D html-webpack-plugin
```

- A package-lock.json file will be generated that keeps references to the installed dependencies.
- Create a webpack.config.js file in the root client directory and paste the below js into it. This will configure Webpack to bundle the js code approporiately and also use the babel-loader we installed to translate the written js code into code that the browser can interpret.

```
module.exports = {
    context: __dirname,
    entry: './App.js',
    output: {
        path: __dirname + '/dist',
        filename: 'Bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'Index.html',
            template: 'assets/Index.html'
        })
    ],
}
```

- Add a directory `assets` and a `Index.html` file under the new directory with the following code

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

- Add an App.js file to the root of your client project directory. The below code can be added to the file as this will be treated as the entry point where React will render elements to a specific HTML element defined here (container)

```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello World</h1>, document.getElementById('root'));
```

- Now we need to run Webpack so that it can generate the necessary client files in the `dist` directory. Add the below key value pairs to the package.json file, inside the scripts key (test can be excluded)

```
  "scripts": {
    "build:dev": "webpack --mode development",
    "build:prod": "webpack --mode production"
  }
```
