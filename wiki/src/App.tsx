import React from 'react';
import './styles/App.scss';
import { Route, Link, HashRouter } from 'react-router-dom';
import Layout from './Layout';

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;

const App: React.FC = () => {


    return (
        <HashRouter basename="/">
            <Layout>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    {_getRoutes()}
                </div>
            </Layout>
        </HashRouter>
    );
}

const _getRoutes = () => {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
        </div>
    );
}

export default App;
