import { ReactElement, lazy, Suspense } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

const ChatPage = lazy(() => import('./pages/ChatPage/ChatPage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));

const App = (): ReactElement => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Suspense fallback={<div>loading...</div>}>
            <Route exact path="/" component={SignInPage} />
            <Route exact path="/chatpage" component={ChatPage} />
          </Suspense>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
