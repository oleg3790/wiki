This repo is available as a GitHub Pages site built with React using Typescript. GH Pages content is configured to be fetched from the gh-pages branch. 

## Site content
This project uses a tree navigation which is associated with a specific nav page that's pulled from a `site-content` branch. The site-content branch should only have directories with an `Index.md` file under the directory that the page should load to. The example below models the standard structure that the `site-content` branch should follow:

-root repo dir
    -site page 1
        -Index.md
        -sub page 1
            -Index.md
    -site page 2
        -Index.md

## Deployment
To deploy a new version of the site, run `npm run deploy`. This will create a production build of the assets and publish to a `gh-pages` branch on the remote