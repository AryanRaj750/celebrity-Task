import { useState } from 'react';

import {requestOtp} from './api';
const ForgotPassword = () => {
    const [userId, setUserId] = useState("");
    const [otp, setEmail] = useState("");
    const [password, setPassword] = useState("")

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    const handleName = (event) => {
        setUserId(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleRequestOtp = async () => {
        await requestOtp(userId)
            .then((res) => {
                console.log(res)
                return res
            }).catch(err => {
                console.log(err);
                return err
            })
    }

    return (

        <section className="d-flex">
            <div className="m-4 p-4 f4  form-group color-shadow-small bg-gray-800-mktg rounded-2 signup-content-container" >
                <h3 style={{ marginBottom: 35, paddingLeft: 15, color: '#24292f', textAlign: 'center' }}>Password Forgot</h3>
                <div className="login-register">
                    <form action="" >
                        <label htmlFor="fullname" className="text-mono signup-text-prompt">Email or userName</label>
                        <input type="text" value={userId} placeholder=" Type your username or email here..." onChange={handleName} className=" border-0 rounded-0 p-1 box-shadow-none color-text-white f4 text-mono input-box" />

                            <input type="submit"  value="Continue" className="continue text-mono" onClick={handleRequestOtp} />


                        <label htmlFor="email" className="text-mono signup-text-prompt">O.T.P</label>
                        <input type="email" value={otp} onChange={handleEmail} className=" border-0 rounded-0 p-1 box-shadow-none color-text-white f4 text-mono" placeholder=" Enter OTP"/>

                        <label htmlFor="passwword" className="text-mono signup-text-prompt">Password</label>
                        <input type="password" value={password} placeholder=" set new password" onChange={handlePassword} className=" border-0 rounded-0 p-1 box-shadow-none color-text-white f4 text-mono" />

                        <input type="submit" value="Submit" className=" text-mono submit p-0" />
                    </form>
                </div>
            </div>
        </section>


    );
}

export default ForgotPassword;
