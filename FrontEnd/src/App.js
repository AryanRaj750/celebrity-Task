import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import "./main.css";
// import Header from "./Components/Header";
// import About from "./Components/About";
// import Survey from "./Components/survey";
// import Respond from "./Components/respond"
import Login from './Components/Login';
// import ProtectedRoute from "./Components/protectedRoute";
// import useAuth from "./Components/useAuth";
// import { useUserContext } from "./Components/userContext";
import { UserContextProvider } from "./Components/userContext";

const App = () => {
  // const { user } = useUserContext();

  return (
    <>
      <div className="App">

        <Router>
          {/* <Header data={{name: user.name, userType: user.userType, loginStatus: user.loginStatus}} /> */}
          <Switch>
            <UserContextProvider>
              <Route exact path="" component={() => <Login />} />
              {/* <ProtectedRoute path="/survey" component={Survey} auth={{ auth: user.loginStatus, userType: user.userType }} />
              <ProtectedRoute path="/respondent" component={Respond} auth={{ auth: user.loginStatus, userType: user.userType }} />
              <ProtectedRoute path="/about" component={About} auth={{ auth: user.loginStatus, userType: user.userType }} /> */}
            </UserContextProvider>
          </Switch>

        </Router>
      </div>
    </>
  );
}

export default App;
