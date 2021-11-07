import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Survey from "./survey";
import Respond from "./respond"
import ProtectedRoute from "./protectedRoute";

import ParticlesBg from "particles-bg";
import '../main.css'
// import { a } from 'react-router-dom'
const Header = (props) => {

  const [isClicked, setIsClicked] = useState({
    surveyClick: false,
    respondClick: false
  })
  useEffect(() => {
    // console.log(isClicked.respondClick, isClicked.surveyClick);

  }, [isClicked.surveyClick, isClicked.respondClick]);
  if (!props.data) {
    return null;
  }
  const handleSurveyClick = () => {

    setIsClicked(prevState => ({
      ...prevState,
      surveyClick: isClicked.surveyClick ? false : true,
      respondClick: false
    }));
  }
  const handleRespondClick = (e) => {
    setIsClicked(prevState => ({
      ...prevState,
      respondClick: isClicked.respondClick ? false : true,
      surveyClick: false
    }));
  }

  const user = props.data;

  return (<>
    <div id="home"  >
      <ParticlesBg type="circle" bg={true} />
      <nav id="nav-wrap">
        <ul id="nav" className="nav">
          {user.userType === "respondent" ? <li> <button className="smoothscroll" onClick={handleRespondClick} > Respond </button> </li>
            : <> </>}
          {user.userType === "coordinator" ? <li> <button className="smoothscroll" onClick={handleSurveyClick} > Survey </button> </li> : <> </>
          }
          <li> <button className="smoothscroll" id="/profile" to="#"> {user.name === "Login" ? `${user.name}` : `Welcome, ${user.name}`} </button>  </li>
        </ul>
      </nav>
    </div>
    {isClicked.surveyClick ? <Survey data={props.data} /> : <> </>}
    {isClicked.respondClick ? <Respond data={props.data} /> : <> </>}

    {/* <Router>
      <Switch>
        <ProtectedRoute path="/survey" component={() => <Survey data={ props.data} />} auth={{ auth: user.loginStatus, userType: user.userType }} />
        <ProtectedRoute path="/respondent" component={() => <Respond data={ props.data} /> } auth={{ auth: user.loginStatus, userType: user.userType }} />
      </Switch>
    </Router> */}

  </>
  );
}


export default Header;
