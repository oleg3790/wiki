## Overview
Sass is a styling language that is used by pre-compilers to compile into CSS. It is intended to ease interaction with styling code.

### Setup in JavaScript package (where Webpack is used for building/bundling)
1. Add the `style-loader`, `css-loader`, and `sass-loader` dependencies to your JS package using npm or yarn
2. Add the following block to your `webpack.config.js` file
```
...
module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
...
```