Follow the guide in `Configuring new React app (without create-react-app)` to create a new React app, and then modify the app to fulfill the below requirements

#### Required Dependencies
- react
- react-dom
- @types/react
- @types/react-dom
- typescript (dev)
- ts-loader (dev)
- webpack (dev)
- webpack-cli (dev)
- html-webpack-plugin (dev)

#### webpack.config.json
```
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './App.tsx',
  output: {
      path: __dirname + '/dist',
      filename: 'app.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              exclude: /(node_modules)/,
              use: {
                  loader: 'ts-loader',
              }
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'Index.html',
          template: 'assets/Index.html'
      })
  ]
}
```

#### tsconfig.json
```
{
  "compilerOptions": {
      "module": "CommonJS",
      "noImplicitAny": true,
      "removeComments": true,
      "preserveConstEnums": true,
      "sourceMap": true,
      "jsx": "react"
  },
  "include": [
      "app/**/*"
  ],
  "exclude": [
      "node_modules",
      "**/*.spec.ts"
  ]
}
```