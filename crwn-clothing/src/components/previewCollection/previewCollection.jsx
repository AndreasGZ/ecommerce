import React from "react";
import "./preview-collection.scss";
import CollectionItem from "../collectionItem/collectionItem";

const PreviewCollection = ({title, items}) => (
  <div className="collection-preview">
    <h2>{title.toUpperCase()}</h2>
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

export default PreviewCollection;
