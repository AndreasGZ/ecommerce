import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionsFetching} from "../../redux/shop/shopSelectors";
import WithSpinner from "../../components/withSpinner/withSpinner";
import CollectionsOverview from "../../components/collectionsOverview/collectionsOverview";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
