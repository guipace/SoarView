import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./services/auth";
import { setUser } from "./store/session";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserPage from "./components/pages/UserPage";
import LandingPage from "./components/pages/LandingPage";
import Footer from "./components/Footer";
import FlightPage from './components/pages/FlightPage';
import HomePage from './components/pages/HomePage';

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className='flex flex-col h-screen'>
      {authenticated && <NavBar setAuthenticated={setAuthenticated} />}
      <Switch>
        <ProtectedRoute path={`/user/:id(\\d+)`} exact={true} authenticated={authenticated}>
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path={`/flight/:id(\\d+)`} exact={true} authenticated={authenticated}>
          <FlightPage />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated}>
          {authenticated ? <HomePage /> : <LandingPage setAuthenticated={setAuthenticated} />}
        </Route>
      </Switch>
      {authenticated && <Footer />}
    </div>
  );
}

export default App;
