import { useState, useEffect } from 'react';
import { baseUri } from './api';
import axios from "axios";
import Otp from "./otp";

const Register = () => {
    const [userFields, setUserName] = useState({
        email: "",
        password: "",
        name: "",
        age: 16,
        gender: 'male',
        userType: "respondent",
        signupStatus: false
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        name: "",
        age: ""
    });

    useEffect(() => {
        console.log(userFields.userType)
    }, [userFields]);

    const handleUserType = (event) => {
        setUserName(prevState => ({
            ...prevState,
            userType: event.target.value
        }));
    }
    const handleGender = (event) => {
        setUserName(prevState => ({
            ...prevState,
            gender: event.target.value
        }));
    }
    const handleAge = (event) => {
        setUserName(prevState => ({
            ...prevState,
            age: event.target.value
        }));
        setErrors(prevState => ({
            ...prevState,
            age: ""
        }));
    }
    const handleUserEmail = (event) => {
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
    const handleUserName = (event) => {
        setUserName(prevState => ({
            ...prevState,
            name: event.target.value
        }));
        setErrors(prevState => ({
            ...prevState,
            name: ""
        }));
    }

    const handleSubmit = async () => {
        await axios.post(baseUri + 'signup', {
            userType: userFields.userType,
            name: userFields.name,
            gender: userFields.gender,
            age: userFields.age,
            email: userFields.email,
            password: userFields.password
        })
            .then((response) => {
                if(response.data.status === 'success'){
                    alert(response.data.message);
                    setUserName(prevState => ({
                        ...prevState,
                        signupStatus: true
                    }));
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

    const ageValidation = () => {
        let formIsValid = true;
        if (userFields.age < 16 || userFields.age > 80) {
            formIsValid = false;
            setErrors(prevState => ({
                ...prevState,
                age: "age must be in range (16, 80)"
            }));
        }
        return formIsValid;
    }

    //email validation
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

    const usernameValidation = () => {
        let formIsValid = true;
        if (userFields.name === "") {
            formIsValid = false;
            setErrors(prevState => ({
                ...prevState,
                name: "cannot be empty"
            }));
        }
        else {
            if (userFields.name.length < 5) {
                formIsValid = false;
                setErrors(prevState => ({
                    ...prevState,
                    name: "username at least should 5 digits"
                }));
            }
        }

        return formIsValid;
    }
    const handleSignup = (e) => {
        e.preventDefault();

        if (emailValidation() && passwordValidation() && usernameValidation()) {
           handleSubmit()

        }
    }

    if(userFields.signupStatus){

        return <> <Otp email = {userFields.email} /> </>
    }
    return (
        <>
            <form action="" id="signup-box">
                <div>
                    <label htmlFor="userType" className="signup-text-prompt text-mono" >user type</label>
                    <select type="text" id="userType" value={userFields.userType} style={{ marginBottom: '15px' }} onChange={handleUserType} className=" login-input-box  text-mono" title="Choose user type">
                        <option value="coordinator">Coordinator</option>
                        <option value="respondent" >Respondent</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gender" className="signup-text-prompt text-mono" >Gender</label>
                    <select type="text" id="gender" value={userFields.userType} style={{ marginBottom: '15px' }} onChange={handleGender} className=" login-input-box  text-mono" title="Choose your gender">
                        <option value="male">Male</option>
                        <option value="female" >Female</option>
                        <option value="other" >Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="age" className="signup-text-prompt text-mono" >Age</label>
                    <input type="number" id="age" value={userFields.age} min="16" max="80" onChange={handleAge} className=" login-input-box  text-mono" />
                    <span style={{ color: 'red', fontSize: '10px' }}>{errors.age}</span>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor="email" className="signup-text-prompt text-mono" >email</label>
                    <input type="text" id="email" value={userFields.email} placeholder=" Type email here..." onChange={handleUserEmail} className=" login-input-box  text-mono" onClick={ageValidation} title="Enter your email" />
                    <span style={{ color: 'red', fontSize: '10px' }}>{errors.email}</span>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <label htmlFor="passwd" className="signup-text-prompt text-mono" >password</label>
                    <input type='password' id="passwd" className=" login-input-box  text-mono" value={userFields.password} placeholder=" Type password here..." onChange={handlePassword} onClick={emailValidation} title="Enter your password" />
                    <span title="password must be 8 digits, containing at least , one uppercase, lowercase, number and special letter" style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <label htmlFor="username" className="signup-text-prompt text-mono" >name</label>
                    <input type="text" id="username" className=" login-input-box  text-mono" value={userFields.name} placeholder=" Type username here..." onChange={handleUserName} onClick={passwordValidation} title="Type your real name" />
                    <span style={{ color: 'red', fontSize: '10px' }}>{errors.name}</span>
                </div>

                {/* <button className=" text-mono login-btn" >submit </button> */}
            </form>
            <div className="signup-div">
                <input type='submit' value="signup" id="signup-btn" className="text-mono " style={{ marginLeft: '0px' }} onClick={handleSignup} title="Click to create new account" />

            </div>
        </>
    );
}

export default Register;
