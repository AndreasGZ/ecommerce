import {createSelector} from "reselect";
import memoize from "lodash.memoize";

const selectShop = state => state.shop;

const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectShopCollections = createSelector(
  [selectShop],
  shop =>
    shop.collections ? Object.values(shop.collections) : []
)

// memoize -> wenn sich die values nicht ändern, muss nicht gererendered werden
export const selectCollection = memoize(collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections =>
      collections ? collections[collectionUrlParam] : null
  )
);
