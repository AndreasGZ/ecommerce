import React from "react";
import "./sign_in_and_up.scss";
import SignIn from "../../components/signin/signin";
import SignUp from "../../components/signup/signup";

// import "./sign-in-and-sing-up.scss";

const SignInAndSignUpPage = () => (
  <div className="signingPage">
    <SignIn />
    <SignUp />
  </div>
)

export default SignInAndSignUpPage;
