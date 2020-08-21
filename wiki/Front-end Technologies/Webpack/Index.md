### Overview
Webpack is a development tool used to package and bundle web front-end code. It allows developers to write thier code in a specific format or using a web standard and use use Webpack to standardize the code into a format that will be easily and efficiently loaded in a web browser.

### Webpack dev server
If you are using the development server that Webpack provides, you can develop your project in an independenly manner and still connect to your API's and resources at runtime


#### Proxy
Use a proxy and specify the paths with which to direct each request to

**In webpack.config.js**
```
...
    devServer: {
        host: "localhost.x.com",
        https:true,
        port: 8080,
        proxy: {
            "/api": {
                target: "https://localhost-2.x.com",
                secure: false,
                changeOrigin: true
            },
            /Share": {
                target: "https://localhost.x.com",
                secure: false,
                changeOrigin: true
            }
        }
    }
...
```

The above example shows that you can develop your app at localhost.x.com:8080 but requests that are going to `\api` are redirected to `https://localhost-2.x.com`, which could be a local server driven off of another codebase.