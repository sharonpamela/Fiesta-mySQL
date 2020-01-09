import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import containers
import StoreDetail from './containers/StoreDetail';

// import Components
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Stores from './components/Stores';
import Products from './components/Products';
import Inventory from './components/Inventory';

import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      stores: [],
      products: [],
      inventory: []
    };
    // this.fetchStores = this.fetchStores.bind(this);
  }
  componentDidMount() {
    axios.get('/api/stores')
      .then(response => {
        this.setState({ stores: response.data });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/products')
      .then(response => {
        this.setState({ products: response.data });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });


    axios.get('/api/inventory')
      .then(response => {
        this.setState({ inventory: response.data });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/stores' render={() => <Stores stores={this.state.stores} />} />
          <Route exact path='/stores/:id' component={StoreDetail}/>
          <Route exact path='/products' render={() => <Products products={this.state.products} />} />
          <Route exact path='/inventory' render={() => <Inventory inventory={this.state.inventory} />} />
          
        </Switch>
      </Router>
    );
  }
}

export default App;
