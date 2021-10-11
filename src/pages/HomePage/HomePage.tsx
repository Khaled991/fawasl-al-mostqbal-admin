import { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import SideBar from '../../components/SideBar/SideBar';
import '../../components/SideBar/SideBar.scss';
// import './HomePage.scss';
const ChatPage = lazy(() => import('../ChatPage/ChatPage'));

const HomePage = (): ReactElement => {
  return (
    <div className="home-page">
      <SideBar />
      <main>
        <Switch>
          <Suspense fallback={<div>loading...</div>}>
            <Route exact path="/chat" component={ChatPage} />
          </Suspense>
        </Switch>
      </main>
    </div>
  );
};

export default HomePage;
