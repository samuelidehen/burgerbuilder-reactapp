import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your email"
        },
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your password"
        },
        value: ""
      }
    },
    isSignUp: true
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  inputChangeHandler = (e, controlName) => {
    const updatedcontorls = { ...this.state.controls };
    const updatedFormElem = { ...updatedcontorls[controlName] };
    updatedFormElem.value = e.target.value;
    updatedcontorls[controlName] = updatedFormElem;
    this.setState({
      controls: updatedcontorls
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => this.inputChangeHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success"> SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
