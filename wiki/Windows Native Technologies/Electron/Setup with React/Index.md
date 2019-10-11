### Initialize npm project
```
npm init
```

### Add Electron, React, and other dependencies
```
npm i -D electron
```
```
npm i -D typescript tslint prettier webpack webpack-cli html-webpack-plugin @babel/cli @babel/core @babel/preset-env babel-loader @babel/plugin-proposal-class-properties @babel/   plugin-transform-arrow-functions @babel/preset-typescript @babel/preset-react @types/react @types/react-dom
```
```
npm i -S react react-dom
```

### Setup project structure
1. Add a `tslint.json` file to the project root with the following
```
{
  "extends": "tslint:recommended",
  "rules": {
    "max-line-length": {
      "options": [
        120
      ]
    },
    "new-parens": true,
    "no-arg": true,
    "no-bitwise": true,
    "no-conditional-assignment": true,
    "no-consecutive-blank-lines": false
  },
  "jsRules": {
    "max-line-length": {
      "options": [
        120
      ]
    }
  }
}
```

2. Add a `tsconfig.json` file to the project root with the following
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5"
  },
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false,
  "buildOnSave": false
}
```

3. Add a `.babelrc` file to the project root with the following
```
{
  "presets": [
    "@babel/env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-arrow-functions"
  ]
}
```

4. Create a folder called `src` at the project root and add a `main.ts` file with the following
```
const url = require("url");
const path = require("path");

import { app, BrowserWindow } from "electron";

let window: BrowserWindow | null;

const createWindow = () => {
  window = new BrowserWindow({ width: 800, height: 600 });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  window.on("closed", () => {
    window = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});
```

5. Add an `index.html` file to the `src` folder with the following
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
``` 

6. Add a `webpack.config.js` file to the project root with the following
```
const path = require("path");

const config = {
  target: "electron-main",
  devtool: "source-map",
  entry: "./src/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  node: {
    __dirname: false,
    __filename: false
  }
};

module.exports = (env, argv) => {
  return config;
};
```

7. Add a `webpack.react.config.js` file to the project root with the following
```
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const config = {
  target: "electron-renderer",
  devtool: "source-map",
  entry: "./src/app/renderer.tsx",
  output: {
    filename: "renderer.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [htmlPlugin]
};

module.exports = (env, argv) => {
  return config;
};
```

8. Create a folder called `app` inside of `src` and add a `renderer.tsx` file with the following
```
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Dashboard} from "./components/Dashboard";

ReactDOM.render(<Dashboard />, document.getElementById('root'));
```

9. Create a `components` folder inside of `app` and add a `Dashboard.tsx` file with the following
```
import * as React from 'react';

export const Dashboard = () => {
    return <div>Hello World!</div>;
};
```

10. Add the following scripts to `package.json`
```
.
  "scripts": {
    "build": "webpack --mode production --config webpack.react.config.js && webpack --mode production",
    "build:dev": "webpack --mode development --config webpack.react.config.js && webpack --mode development",
    "start": "electron ./dist/main.js",
  },
.
```

11. Execute `npm run build` then `npm run start` >> the app should launch