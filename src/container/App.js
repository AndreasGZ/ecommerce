import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Homepage from "../pages/homepage/homepage";
import ShopPage from "../pages/shop/shop";
import CheckoutPage from "../pages/checkout/checkout";
import Header from "../components/header/header";
import SignInAndSignUpPage from "../pages/sign_in_up/sign_in_up";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../redux/user/userSelectors";
import {checkUserSession} from "../redux/user/userActions";


/*

  const HatsPage = () => (
    <div><h1>HATS PAGE</h1></div>
  )
 exact= {true oder false}
 exact -> true -> Es soll genau so sein, wie der Path
 exact = false -> /hats rendert Homepage und HatsPage

 <Route exact path="/hats" component={HatsPage}/>

 Switch -> Sobald ein Route gefunden wird, wird kein weiterer geladen
 -> exact=false trifft erst auf '/' -> es wird nur Homepage gerandert
 */

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    // Subscription zerstören -> unlisten the listener
    this.unsubscribeFromAuth();
  }

  render(){
    const {currentUser} = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => currentUser ?
              (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
