import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shopActions";
import CollectionsOverviewContainer from "../../components/collectionsOverview/collectionsOverview.container";
import CollectionPageContainer from "../collection/collection.container";

// Route bergibt mathc, location und history automatisch
/*
const ShopPage = ({match, location, history}) => {
  console.log("match: ",match);
  console.log("location: ", location);
  console.log("history: ", history);
*/


const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    // API_Request nicht im constructor benutzen
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
