import { useState, useEffect } from 'react';

import './otp.css'
import { baseUri } from './api';
import axios from "axios";
import Login from "./Login";

const Otp = (props) => {

  const [dataFields, setDataFields] = useState({
    email: props.email,
    otp: "",
    otpStatus: false

  })
  const [errors, setErrors] = useState({
    otp: ""
  })

  useEffect( ( )=> {

  }, [dataFields.otpStatus])

  console.log(dataFields.email)
  const handleOtp = (e) => {
    setDataFields(prevState => ({
      ...prevState,
      otp: e.target.value
    }));
  }

  const validateOtp = () => {
    let formIsValid = true;
    if (dataFields.otp === "") {
      formIsValid = false;
      setErrors(prevState => ({
        ...prevState,
        otp: "cannot be empty"
      }));
    }
    else {
      if (dataFields.otp.length < 6) {
        formIsValid = false;
        setErrors(prevState => ({
          ...prevState,
          otp: "otp must should be 6 digits"
        }));
      }
    }
    return formIsValid;
  }
  // submit otp api calling
  const submitOtp = async (otp) => {
    return await axios
      .post(baseUri + 'verifyemail', {
        email: dataFields.email,
        otp
      })
      .then((response) => {
        if (response.data.status === 'success') {
          alert(response.data.message);
          setDataFields(prevState => ({
            ...prevState,
            otpStatus: true
          }));
        }
        else {
          alert(response.data.message.message)
        }
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });

  }
  // resend otp
  const requestOtp = async () => {
    return await axios
      .post(baseUri + 'requestotp', {
        email: dataFields.email,
      })
      .then((response) => {
        if (response.data.status === 'success') {
          alert(response.data.message);
        }
        else {
          alert(response.data.message.message)
        }
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleVerify = (e) => {
    e.preventDefault();
    if (validateOtp()) {
      submitOtp(Number(dataFields.otp))
    }
    else {
      alert('First fix issues.')
    }
  }
if(dataFields.otpStatus){
  return <> <Login /> </>
}
  return (
    <section className="d-flex">
      <div className="z-1" style={{ width: '600px' }}>
        <div className="main-div" style={{ borderColor: 'border-color: #202637 !important' }}>
          <p className="text-mono mb-0 " style={{ color: 'white', fontSize: '14px' }}> You're almost done! </p>
          <p className="text-mono " style={{ color: 'white', fontSize: '14px' }}> We sent a launch code to
            <span className="code-green text-mono" style={{ fontSize: '14px' }}> {dataFields.email} </span>
          </p>
          <p className="text-mono my-3 " style={{ color: '#ea4aaa', fontSize: '14px' }}>Enter code</p>

          <div>
            <div className="otp-div">
              <input type="text" placeholder="000000" className="otp" maxLength="6" pattern="[0-9]{6}" required autoFocus='true' onChange={handleOtp} />
              <br />
              <span style={{ color: 'red', fontSize: '10px' }}>{errors.otp}</span>
            </div>
            <div>
              <button className="text-mono" style={{ color: 'white', padding: '10px', width: '80px', marginBottom: '10px' }} onClick={handleVerify} >verify</button>
            </div>
          </div>
          <div className="text-gray-mktg">
            {"Didn't get your code? "}
            <input type="submit" className="btn-link" value=" Resend the code " onClick={ requestOtp } />
            <input type="hidden" name="authenticity_token" value="pP5P/WkbA4rxBLUzOzI31AF5e1qRqwyZyEifkAh8bcsOIqwR6KQUGy6K76XPcaWqTQ3MMSjVOP/nB21mLbg4Yw==" />
          </div>
        </div>
      </div >
    </section >
  )
}
export default Otp;