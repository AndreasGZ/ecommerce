import React from "react";
import "./preview-collection.scss";
import CollectionItem from "../collectionItem/collectionItem";
import {withRouter} from "react-router-dom";

const PreviewCollection = ({title, items, history, match, routeName}) => (
  <div className="collection-preview">
    <div className="title-container">
      <h2 className="title" onClick={() => history.push(`${match.path}/${routeName}`)}>
        {title.toUpperCase()}
      </h2>
    </div>
    <div className="preview">
      {
        items
          .filter((item, i) => i < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          )
        )
      }
    </div>
  </div>
)

export default withRouter(PreviewCollection);
