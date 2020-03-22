import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrder = [];
        for (let key in res.data) {
          fetchOrder.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          loading: false,
          orders: fetchOrder
        });
      })
      .catch(err =>
        this.setState({
          loading: false
        })
      );
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            price={order.price}
            customer={order.customer.name}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    );
  }
}
export default WithErrorHandler(Orders, axios);
