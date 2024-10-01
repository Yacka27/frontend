import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { DirectorView } from './components/director/DirectorView';
import { GeneroView } from './components/genero/GeneroView';
import { MediaView } from './components/media/MediaView';
import { ProductoraView } from './components/productora/ProductoraView';
import { TipoView } from './components/tipo/TipoView';
import { Header } from './components/ui/Header';


const App = ()=> {
    return <Router>
        <Header/>
        <Switch>
            <Route exact path='/' component= {MediaView}/>
            <Route exact path='/tipo' component= {TipoView}/>
            <Route exact path='/director' component= {DirectorView}/>
            <Route exact path='/productora' component= {ProductoraView}/>
            <Route exact path='/genero' component= {GeneroView}/>
            <Redirect to='/'/>
        </Switch>
        
    </Router>
}

export {
    App
};
