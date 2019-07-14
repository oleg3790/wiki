React is a JavaScript library that was created by Facebook. It is open source and is used for the creation of UIs.
 
### CDN Links
 
#### Development
`
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
`

#### Production
`
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
`

### Components

Components in React are ways to break up a UI into multiple pieces that can be rendered based on the input. A popular syntax for writing the display elements is JSX (similar to XML); although it is not necessary to use JSX as one can use pure JavaScript and replace JSX with React.createElement(); 

When using JSX, it is important to setup a compiler to translate JSX into JavaScript for the browser to parse, along with ES6 to ES5 (for backwards compatibility). A popular compiler to use with React is Babel