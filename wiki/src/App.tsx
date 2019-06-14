import React from 'react';
import './styles/App.scss';
import { Route, HashRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import DotNetTechnologies from './pages/dot_net_tech/DotNetTechnologies';

const App: React.FC = () => {
    return (
        <HashRouter basename="/">
            <Layout>
                <div>
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
            <Route path="/dot-net-technologies" component={DotNetTechnologies}/>
        </div>
    );
}

export default App;
