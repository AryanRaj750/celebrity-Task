import axios from "axios";
// const baseUrl = 'https://aryan-student-hub.herokuapp.com/'
export const baseUri = 'http://localhost:5000/user/'

export const requestOtp = async (email) => {
    return await axios
        .post(baseUri + 'requestotp', {
            email
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
};
