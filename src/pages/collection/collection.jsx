import React, {useEffect} from "react";
import "./collection.scss";
import CollectionItem from "../../components/collectionItem/collectionItem";
import {connect} from "react-redux";
import {selectCollection} from "../../redux/shop/shopSelectors";
// import {firestore} from "../../firebase/firebase";

const CollectionPage = ({collection}) => {
  // CompoenntWillUnmount
  /*
  useEffect(()=>{
    console.log("I am subscribing");
    const unsubscribeFromCollections = firestore
      .collection("collections")
      .onSnapshot(snapshot => console.log(snapshot));
    // cleanup function -> componentWillUnmount
    return () => {
      console.log("I am unsubscribing");
      unsubscribeFromCollections();
    }
  }, []);
  */

  const {title, items} = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title.toUpperCase()}</h2>
      <div className="items">
        {
          items.map((item) => (
              <CollectionItem key={item.id} item={item} />
            )
          )
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) =>({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
