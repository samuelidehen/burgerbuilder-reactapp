import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from "react-router-dom";
import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
