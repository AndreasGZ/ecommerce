import React from "react";
import CollectionsOverview from "../../components/collectionsOverview/collectionsOverview";
import {Route} from "react-router-dom";
import CollectionPage from "../collection/collection";
import {firestore, convertCollectionSnapshotToMap} from "../../firebase/firebase";
import {connect} from "react-redux";
import {updateCollections} from "../../redux/shop/shopActions";
import WithSpinner from "../../components/withSpinner/withSpinner";

// Route bergibt mathc, location und history automatisch
/*
const ShopPage = ({match, location, history}) => {
  console.log("match: ",match);
  console.log("location: ", location);
  console.log("history: ", history);
*/

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
  state = {
      loading: true
    };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection("collections");

    /*Observable / observer
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({loading: false});
    });*/

    /*Promisebased pattern
    API-Call to fetch the data back
    Hier gibt es jetzt keinen Live on snapshot
    sondern ein einmaliger Promise
    */
    collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({loading: false});
    })

    /*
    Using restApi
    fetch("https://firestore.googleapis.com/v1/projects/crowndb-541f3/databases/(default)/documents/collections").then(
    response => response.json()).then(
    collections => console.log(collections)
  )
    */
  }

  render(){
    const {match} = this.props;
    const {loading} = this.state;
    return(
      <div className="shop-page">
        <Route exact path={`${match.path}`}
          render={(props) =>
            <CollectionsOverviewWithSpinner
              isLoading={loading}
              {...props}
            />}
        />
        <Route path={`${match.path}/:collectionId`}
        render={(props) =>
          <CollectionPageWithSpinner
            isLoading={loading}
            {...props}
          />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
