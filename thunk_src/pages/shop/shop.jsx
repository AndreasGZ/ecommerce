import React from "react";
import {Route} from "react-router-dom";
import CollectionPage from "../collection/collection";
import {connect} from "react-redux";
import {fetchCollectionsStartAsync} from "../../redux/shop/shopActions";
import CollectionsOverviewContainer from "../../components/collectionsOverview/collectionsOverview.container";
import CollectionPageContainer from "../collection/collection.container";

// Route bergibt mathc, location und history automatisch
/*
const ShopPage = ({match, location, history}) => {
  console.log("match: ",match);
  console.log("location: ", location);
  console.log("history: ", history);
*/


class ShopPage extends React.Component{
  componentDidMount() {
    // API_Request nicht im constructor benutzen
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render(){
    const {match} = this.props;
    return(
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
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
