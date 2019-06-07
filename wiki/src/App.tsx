import React from 'react';
import './App.css';
import { Route, Link, HashRouter } from 'react-router-dom';

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;

const App: React.FC = () => {
    return (
        <HashRouter basename="/">
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        </HashRouter>
    );
}

export default App;
