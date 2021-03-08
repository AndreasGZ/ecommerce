import React from "react";
import CollectionsOverview from "../../components/collectionsOverview/collectionsOverview";
import {Route} from "react-router-dom";
import CollectionPage from "../collection/collection";

// Route bergibt mathc, location und history automatisch
/*
const ShopPage = ({match, location, history}) => {
  console.log("match: ",match);
  console.log("location: ", location);
  console.log("history: ", history);
*/

const ShopPage = ({match}) => {
    return(
      <div className="shop-page">
        <Route exact path={`${match.path}`}
          component={CollectionsOverview}
        />
        <Route path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
}


export default ShopPage;
