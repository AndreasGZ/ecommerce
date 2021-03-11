import React, {useState} from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import "./sign-up.scss";
import {connect} from "react-redux";
import {signUpStart} from "../../redux/user/userActions";

import {auth, createUserProfileDocument} from "../../firebase/firebase";

const SignUp = ({signUpStart}) => {
  const [userCredentials, setCredetials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const { displayName, email, password, confirmPassword} = userCredentials;

  const handleSubmit = async evt => {
    evt.preventDefault();

    if(password !== confirmPassword){
      alert("password don't match");
      return;
    }

    signUpStart({displayName, email, password})
  }

  const handleChange = evt => {
    const { value, name } = evt.target;
    // Das Value wird sofort gerendert
    setCredetials({...userCredentials, [name]: value})
  }

    return(
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
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

const mapDispatchToProps = dispatch => ({
  signUpStart: (userInfo) => dispatch(signUpStart(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUp);
