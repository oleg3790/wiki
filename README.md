## Overview
This solution uses React w/Typescript to build a GitHub Pages site that renders site navigation and [markdown](https://www.markdownguide.org/basic-syntax/) content (of each navigational item) using the GitHub API off of a `site-content` branch in the repository.

## What problem does this solve
Having a basic (blog, wiki, etc.) GH Pages site with a tree navigation is somewhat of a hassle to maintain as seperate HTML files. If you want to host a site with GH Pages and leverage the Markdown syntax, while at the same time, add content to the site without creating new html files; this solution solves that problem. Markdown syntax and HTML is supported inside the `Index.md` file which allows you to add content to the `site-content` branch directly and used GitHub's Markdown preview when adding page content to the `Index.md` content files.

## Site content model
Given that this solution will look at a `site-content` branch in the repo in which it is tied to, you will need to manually instantiate that branch and setup the layout to model the below structure. Each node in the site navigation is associated with a directory name for which the associated content should be an `Index.md` file. 

```
-root repo dir
    -site page 1
        -Index.md
        -sub page 1
            -Index.md
    -site page 2
        -Index.md
```

## Deployment
To deploy the React app to your site, run `npm run deploy`. This will create a production build of the assets and publish to a `gh-pages` branch on the remote. (Make sure to have the GitHub repo setting set to pull from the `gh-pages` branch)
