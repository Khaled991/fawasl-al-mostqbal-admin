import { ReactElement, lazy, Suspense, useEffect, useState } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.css';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { auth, convertAuthSnapshotToMap } from './utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserAction } from './redux/auth/auth.actions';
import WithLoading from './components/WithLoading/WithLoading';
import Loading from './components/loading/loading';
import { selectCurrentUser } from './redux/auth/auth.selector';
import SideBar from './components/SideBar/SideBar';

const ChatPage = lazy(() => import('./pages/ChatPage/ChatPage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const ProblemTablePage = lazy(
  () => import('./pages/ProblemTablePage/ProblemTablePage')
);

const ChatPageWithLoading = WithLoading(ChatPage);
const SignInPageWithLoading = WithLoading(SignInPage);
const ProblemTablePageWithLoading = WithLoading(ProblemTablePage);

const currentPath = window.location.href;
const App = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const currentUser = convertAuthSnapshotToMap(userAuth);

        dispatch(setCurrentUserAction(currentUser));
        history.push(currentPath.split(window.location.host)[1]);
      } else {
        dispatch(setCurrentUserAction(userAuth));
      }
      setIsLoading(false);
    });

    return unsubscribeFromAuth;
  }, [dispatch, history]);

  return (
    <div className="app">
      {currentUser ? <SideBar /> : null}
      <div className="pr-0 md:pr-32 pt-16 md:pt-0">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <SignInPageWithLoading
                  isLoading={isLoading}
                  otherProps={props}
                />
              )}
            />
            <Route
              exact
              path="/chatpage"
              render={props =>
                currentUser ? (
                  <ChatPageWithLoading
                    isLoading={isLoading}
                    otherProps={props}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/problemtable"
              render={props =>
                currentUser ? (
                  <ProblemTablePageWithLoading
                    isLoading={isLoading}
                    otherProps={props}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </Suspense>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
