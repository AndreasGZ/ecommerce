import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Homepage from "../pages/homepage/homepage";
// import ShopPage from "../pages/shop/shop";
// import CheckoutPage from "../pages/checkout/checkout";
// import SignInAndSignUpPage from "../pages/sign_in_up/sign_in_up";
import Header from "../components/header/header";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/userSelectors";
import { checkUserSession } from "../redux/user/userActions";
import ErrorBoundary from "../components/error-boundary/error-boundary.component";


/*
  chunking -> mehrere kleine Bundles, die nur dann geladen werden sollen,
  wenn die Route aufgrufen wurde 

  aus react {Suspense laden} -> Route mit Supense umschließen
  <Suspense fallback={<div>...Loading</div>}><Route .../></Supsense>
  Suspense kann mehrere Routes umschließen und wartet
  bei allen lazy-loaded Components bis sie geladen sind

  const Homepage = React.lazy(()=>import("../pages/homepage/homepage"))

*/
const Homepage = React.lazy(() => import("../pages/homepage/homepage"))
const ShopPage = React.lazy(() => import("../pages/shop/shop"))
const CheckoutPage = React.lazy(() => import("../pages/checkout/checkout"))
const SignInAndSignUpPage = React.lazy(() => import("../pages/sign_in_up/sign_in_up"))

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

const App = ({ currentUser, checkUserSession }) => {
  //Set, um zu sehen, wie oft eine Funktion erstellt wird
  let functions = new Set();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  // checkUserSession kann in dem Array eingetragen werden, da es über mapDispatchToProps aufgerufen wird
  functions.add(checkUserSession);
  /*
  Wenn Funktion immer neu erstellt wird -> 
  callback = useCallback(()=>{checkUserSession();}, [(params)]);
  memoizing functions

  useMemo: memoizing functions output -> damit werden die values gecached und können weiter genutzt werden
  const doSomethingComplicated = useMemo(()=>{...}, [(params)]);
  Solange params ungeändert bleibt, wird der output genutzt, statt die ganze Funktion

  gechunkte App auf Heroku sind größer als angegeben, da Heroku gzipping nicht einfach so liefert
  -> gzipping auf server-seite

  Profiler-Api:
  ab react 16.10 gibt es den Profiler
  import {Profiler} from "react";
  <Profiler id="beispielProfiler" onRender={(id, phase, actualDuration) => {
    console.log({
      id, phase, actualDuration
    })
  }}>
    <Componente />
  </Profiler> 
  */

  console.log("Functions", functions); //Wenn eine Funktion eine neue Referenz bekommt, wird sie ins Set eingefügt

  return (
    <div>
      <ErrorBoundary>
        <Header />
        <Switch>
          <Suspense fallback={<div>...Loading</div>}>
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signin" render={() => currentUser ?
              (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
          </Suspense>
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
