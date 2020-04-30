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
  entry: './rezure/App.tsx',
  output: {
      path: __dirname + '/dist',
      filename: 'rezure.js'
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
      filename: 'Rezure.html',
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
      "rezure/**/*"
  ],
  "exclude": [
      "node_modules",
      "**/*.spec.ts"
  ]
}
```