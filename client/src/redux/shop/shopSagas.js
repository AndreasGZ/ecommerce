import {takeLatest, call, put, all} from "redux-saga/effects";
//Take every listens to every action of a specific type
//takeLatest führt nur das letzte aus
// call invokes a Method inside a generator funktion
// put -> creating actions, wie dispatch
import ShopActionTypes from "./shopTypes";
import {firestore, convertCollectionSnapshotToMap} from "../../firebase/firebase";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shopActions";

// Sagas
//Die Funktionen sollen zusammen laufen ohne sich gegenseitig zu behindern
// takeEvery -> nonblocking call
export function* fetchCollectionsAsync(){
  yield console.log("fetchCollectionsAsync:","I am fired");

  try{
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap,
       snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch(error){
    yield put(fetchCollectionsFailure(error.message));
  }


}

export function* fetchCollectionsStart(){
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync);
}

export function* shopSagas(){
  yield all([
    call(fetchCollectionsStart)
  ])
}
/*
SagaMiddleware läuft im Hintergrund
Wenn ein Generator mehrmals aufgerufen wird, dann kann dann alte Prozess
abgebrochen werden

In der SagaMiddleware wird über Abbruch entschieden -> yields sind notwendig zum Kontrollieren
*/
