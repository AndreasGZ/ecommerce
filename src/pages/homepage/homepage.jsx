import React from "react";
import "./homepage.scss";
import Directory from "../../components/directory/directory";
import {HomePageContainer} from "./homepage.styled.jsx";

const Homepage = ({history}) => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
)

export default Homepage;
