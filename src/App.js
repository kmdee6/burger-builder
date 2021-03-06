import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/" exact component={BurgerBuilder}/>
                            <Route path="/checkout" component={Checkout}/>
                            <Route path="/orders" component={Orders} />
                        </Switch>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
