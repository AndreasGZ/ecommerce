import {takeLatest, put, all, call} from "redux-saga/effects";
import UserActionTypes from "./userTypes";
import {
  auth, googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase";
import {
  signInSuccess, signInFailure,
  signOutSuccess, signOutFailure,
  signUpSuccess, signUpFailure
} from "./userActions";


// Handle snapshot and signin
export function* getSnapshotFromUserAuth(userAuth, additionalData){
  try{
    // userRef-document
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    // Snappshot aus dem doc -> Daten
    const userSnapshot = yield userRef.get();
    // Nächste Action -> Sign in success
    yield put(signInSuccess({
      id: userSnapshot.id, ...userSnapshot.data()
    }))
  } catch(error) {
    yield put(signInFailure(error))
  }
}

// GOOGLE
export function* signInWithGoogle(){
 try{
   // User aus dem userRef erhalten
   const {user} = yield auth.signInWithPopup(googleProvider);
   yield getSnapshotFromUserAuth(user)
 } catch(error) {
   yield put(signInFailure(error))
 }
}

export function* onGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

// EMAIL
export function* signInWithEmail({payload: {email, password}}){
  try{
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user)
  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

// SESSION
export function* isUserAuthenticated(){
  try{
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

// SIGN OUT
export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

// SIGN UP
export function* signUp({payload: {
  displayName, email, password
}})
{
  try{
    const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({
        user: user, additionalData: { displayName}
      }));
  } catch(error) {
    yield put(signUpFailure(error))
  }
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
// VEREINEN
export function* userSagas(){
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}
