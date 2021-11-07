import { useState, useEffect } from 'react'
import { baseUri } from './api';
import axios from "axios";
import Header from './Header';

const Survey = (props) => {

    const [surveyData, setSurveyData] = useState({
        surveyName: "",
        productModel: "",
        purchasedFrom: "",
        discountOffer: 0,
        lastDate: "",
        createStatus: false

    })

    const handleSurveyName = (event) => {
        setSurveyData(prevState => ({
            ...prevState,
            surveyName: event.target.value
        }));
    }

    const handleProductModel = (event) => {
        setSurveyData(prevState => ({
            ...prevState,
            productModel: event.target.value
        }));
    }

    const handlePurchasedFrom = (event) => {
        setSurveyData(prevState => ({
            ...prevState,
            purchasedFrom: event.target.value
        }));
    }

    const handleDiscountOffer = (event) => {
        setSurveyData(prevState => ({
            ...prevState,
            discountOffer: event.target.value
        }));
    }

    const handleLastDate = (event) => {
        setSurveyData(prevState => ({
            ...prevState,
            lastDate: event.target.value
        }));
    }
    function getCookie(c_name) {
        return localStorage.getItem(c_name);
    }
    const handleCreateSurvey = async () => {
        const validCookie = getCookie("csx");

        if (validCookie) {
            const headers = {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ validCookie
            }
            return await axios.post(baseUri + "survey", {
                surveyData: {
                    discountOffer: surveyData.discountOffer,
                    productModel: surveyData.productModel,
                    purchasedFrom: surveyData.purchasedFrom,
                    surveyName: surveyData.surveyName,
                    lastDate: surveyData.lastDate
                },

            }, { headers: headers  })
                .then((response) => {
                    // console.log(response)
                    if (response.data.status === 'success') {
                        alert("survey created ")
                        setSurveyData(prevState => ({
                            ...prevState,
                            createStatus: true

                        }));
                    }
                    else {
                        alert(response.data)
                    }
                    return response.data
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            alert('seesion expired. Kindly login again...')
        }
    }
    if(surveyData.createStatus){
        return <div style={{marginLeft: '480px', marginTop: '150px'}}>
        <p>{` surveyName: ${surveyData.surveyName}, `} <br /><br />
        {`productModel: ${surveyData.productModel}, `}<br /><br />
        {`purchasedFrom: ${surveyData.purchasedFrom},`}<br /><br />
        {`discountOffer: ${surveyData.discountOffer},`}<br /><br />
        {`lastDate: ${surveyData.lastDate},`}<br /><br />
        {`status:${surveyData.createStatus}`}
        </p>
        </div>
    }
    return <>
        <div style={{ marginLeft: '540px', marginTop: '80px' }}>
            <div>
                <p >Create Survery</p>
            </div>
            <div >
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="surveyname" className="signup-text-prompt text-mono">Survey Name </label><br />
                    <input type="text" id="surveyname" value={surveyData.surveyName} placeholder="Title/Name of Survey..." onChange={handleSurveyName} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="productmodel" className="signup-text-prompt text-mono">Product modal </label><br />
                    <input type="text" id="productmodel" value={surveyData.productModel} placeholder="Product Modal..." onChange={handleProductModel} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="purchasedfrom" className="signup-text-prompt text-mono"> Purchase Address</label><br />
                    <input type="text" id="purchasedfrom" value={surveyData.purchasedFrom} placeholder="Purchased Address..." onChange={handlePurchasedFrom} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="discountoffer" className="signup-text-prompt text-mono">Discount Amount</label><br />
                    <input type="text" id="discountoffer" value={surveyData.discountOffer} placeholder="Discount Amount..." onChange={handleDiscountOffer} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="lastdate" className="signup-text-prompt text-mono">Last Date </label><br />
                    <input type="date" id="lastdate" placeholder="Discount Amount..." onChange={handleLastDate} />
                </div>

            </div >
            <div className="create-survey-edit" style={{ display: 'inline-block', marginBottom: '20px' }}>
                <input type="submit" className="text-mono" value="create" onClick={handleCreateSurvey} />
            </div>
            <div className="create-survey-edit" style={{ display: 'inline-block', marginBottom: '20px', marginLeft: '50px' }}>
                <input type="submit" className="text-mono" value="edit" />
            </div>

        </div>


    </>

}

export default Survey;