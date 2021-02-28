import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Homepage from "../pages/homepage/homepage";
import ShopPage from "../pages/shop/shop";

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

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
