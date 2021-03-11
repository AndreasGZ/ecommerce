import React from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import "./sign-up.scss";

import {auth, createUserProfileDocument} from "../../firebase/firebase";

class SignUp extends React.Component {
  constructor(){
    super();
    this.state={
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    const { displayName, email, password, confirmPassword} = this.state;
    if(password !== confirmPassword){
      alert("password don't mathc");
      return;
    }

    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, {displayName});
      // Clear the Form
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch(error){
      console.error(error);
    }
  }

  handleChange = evt => {
    const { value, name } = evt.target;
    // Das Value wird sofort gerendert
    this.setState({ [name]: value})
  }

  render(){
    const {displayName, email, password, confirmPassword} = this.state;
    return(
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm password"
            required
          />
          <CustomButton type="submit" value="Submit Form">
            SIGN UP
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
