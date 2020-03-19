import React from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";

export default function WithErrorHandler(WrappedComponent, axios) {
  return class extends React.Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({
            error
          });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }
    errorconfirmHandler = () => {
      this.setState({
        error: null
      });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            closeBackdrop={this.errorconfirmHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
}
