// import Fade from "react-reveal";
import { useState, useEffect } from 'react';
import { baseUri } from './api';
import axios from "axios";
import Signup from './Register'
import { Link } from "react-router-dom";
import Header from './Header';
import { useUserContext } from "./userContext";
import Survey from "./survey";
import Respond from "./respond"

const Login = (props) => {
    const {login, user} = useUserContext ()

    const [userFields, setUserName] = useState({
        email: "",
        password: ""
    });
    const [loginClick, setLoginClick] = useState(true);
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });


    useEffect(() => {
        // console.log(loginClick)
        return function cleanup() {
            document.removeEventListener('click', handleLoginClick);
        };
    }, [loginClick, user.loginStatus])

    const handleEmail = (event) => {
        setUserName(prevState => ({
            ...prevState,
            email: event.target.value
        }));
        setErrors(prevState => ({
            ...prevState,
            email: ""
        }));
    }
    const handlePassword = (event) => {
        setUserName(prevState => ({
            ...prevState,
            password: event.target.value
        }));
        setErrors(prevState => ({
            ...prevState,
            password: ""
        }));
    }

    const handleSignupClick = () => {
        setLoginClick(false)

    }
    const handleLoginClick = () => {
        setLoginClick(true);

    }
    function setCookie(c_name, value, expiredays) {
        return localStorage.setItem(c_name, value);
    }
    //userName validation
    const passwordValidation = () => {
        let formIsValid = true;

        if (userFields.password === "") {
            formIsValid = false;
            setErrors(prevState => ({
                ...prevState,
                password: "cannot be empty"
            }));
        }
        else {
            if (userFields.password.length < 8) {
                formIsValid = false;
                setErrors(prevState => ({
                    ...prevState,
                    password: "password at least should 8 digits"
                }));
            }
            else if (typeof userFields.password !== "undefined") {
                if (!userFields.password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')) {
                    formIsValid = false;
                    setErrors(prevState => ({
                        ...prevState,
                        password: "it must follow ABc@1234"
                    }));
                }
            }
        }

        return formIsValid
    }
    const emailValidation = () => {
        let formIsValid = true;
        if (userFields.email === "") {
            formIsValid = false;
            setErrors(prevState => ({
                ...prevState,
                email: "cannot be empty"
            }));
        }
        else if (typeof userFields.email !== "undefined") {
            if (!userFields.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                formIsValid = false;
                setErrors(prevState => ({
                    ...prevState,
                    email: "invalid email format"
                }));
            }
        }
        return formIsValid
    }
    const handleSubmit = async () => {
        await axios.post(baseUri + 'login', {
            email: userFields.email,
            password: userFields.password
        })
        .then((response) => {
            if(response.data.status === 'success'){
                login(response.data.name, response.data.userType, true)
                setCookie("csx", response.data.access_token, '1')
                alert("suucessfully login ")
            }
            else{
                alert(response.data.message.message)
            }
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });

    }
    const handleLogin = (e) => {
        e.preventDefault();

        if (emailValidation() && passwordValidation()) {
            handleSubmit()
        }
        else {
            alert('First fix issues.')
        }
    }

    if(user.user.loginStatus){

        return <Header data={{name: user.user.name, userType: user.user.userType, loginStatus: user.user.loginStatus}} />

    }

    return (
        <section className="d-flex" id="bg-img" style={{backgroundImage: "url('./images/signuppic.jpg')"}}>

            <div className="login-register main-div" style={loginClick ? {height: '350px'}:{height: '570px'} }>
                <div className="nav-buttons ">
                    <button id="loginBtn" className={loginClick ? 'active' : 'inactive'} onClick={handleLoginClick} >login </button>
                    <button id="registerBtn" className={loginClick ? 'inactive' : 'active'} onClick={handleSignupClick}>signup</button>

                </div> {loginClick ? <>
                    <form id="login-div" action="" >
                        <div style={{display: 'block', width: '100%'}}>
                            <label htmlFor="username" className="signup-text-prompt text-mono" >email</label>
                            <input type="text" id="username" value={userFields.username} placeholder=" Type username here..." title="Enter username" onChange={handleEmail} className=" login-input-box  text-mono" />
                            <span style={{ color: 'red', fontSize: '10px' }} title="only alphabetics takes of more than 5 letters">{errors.username}</span>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <label htmlFor="passwd" className="signup-text-prompt text-mono" >password</label>
                            <input type='password' id="passwd" className=" login-input-box  text-mono" value={userFields.password} placeholder=" Type password here..." title="Enter password" onChange={handlePassword} onClick={emailValidation} />
                            <span title="password must be 8 digits, containing at least , one uppercase, lowercase, number and special letter" style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span>
                        </div>

                        <br />

                    </form>
                    <div className="forgot-div">
                            <input type='submit' value="login" className="text-mono login-btn" style={{ marginLeft: '0px' }} onClick={handleLogin} title="click to access your profile" />
                            <Link to='/forgotpassword'> <input type='submit' value="forgot password?" className="text-mono forgot-btn" title="click to recover new password" />
                            </Link>
                        </div>
                </> : <Signup />
                }
            </div>

        </section>
    );

}
export default Login;
