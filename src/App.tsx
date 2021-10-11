import { ReactElement, lazy, Suspense, useEffect, useState } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import {
  auth,
  convertAuthSnapshotToMap,
  createNewAccount,
  NewUser,
} from "./utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserAction } from "./redux/auth/auth.actions";
import WithLoading from "./components/WithLoading/WithLoading";
import Loading from "./components/loading/loading";
import { selectCurrentUser } from "./redux/auth/auth.selector";

const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));

const ChatPageWithLoading = WithLoading(ChatPage);
const SignInPageWithLoading = WithLoading(SignInPage);

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const currentUser = convertAuthSnapshotToMap(userAuth);

        dispatch(setCurrentUserAction(currentUser));
        history.push("/chatpage");
      } else {
        dispatch(setCurrentUserAction(userAuth));
      }
      setIsLoading(false);
    });

    return unsubscribeFromAuth;
  }, [dispatch, history]);

  return (
    <div className="App">
      {currentUser ? <NavBar /> : null}
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route
            exact
            path="/"
            render={(props) => (
              <SignInPageWithLoading isLoading={isLoading} otherProps={props} />
            )}
          />
          <Route
            exact
            path="/chatpage"
            render={(props) =>
              currentUser ? (
                <ChatPageWithLoading isLoading={isLoading} otherProps={props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Suspense>
      </Switch>
      <ToastContainer />
    </div>
  );
};

export default App;
