import {all, call} from "redux-saga/effects";
import {shopSagas} from "./shop/shopSagas";
import {userSagas} from "./user/userSagas";
import {cartSagas} from "./cart/cartSagas"

export default function* rootSaga(){
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas)
  ]);
  /*
  yield ...
  yield ...
  zweiter yield wartet auf ende es ersten

  all nimmt alle "gleichzeitig"
  */
}
