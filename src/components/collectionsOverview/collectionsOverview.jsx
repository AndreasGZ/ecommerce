import React from "react";
import "./collections-overview.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectShopCollections} from "../../redux/shop/shopSelectors";
import PreviewCollection from "../previewCollection/previewCollection";

const CollectionsOverview =({collections}) => {
  return(
  <div className="collections-overview">
    {
      collections.map(
        ({id, ...otherCollectionProps}) => (
          <PreviewCollection key={id} {...otherCollectionProps} />
        )
      )
    }
  </div>
)}

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections
})

export default connect(mapStateToProps)(CollectionsOverview);
