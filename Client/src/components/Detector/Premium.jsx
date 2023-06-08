import React from 'react'
import {useNavigate} from "react-router-dom"
import "./Detector.css"

function Premium() {
  const navigate=useNavigate();
  function navigateToDetector(){
    navigate("/premium/detector")
  }
  return (
    <div className='premium'>
        <div className='premium-mid'>
            <h3 className='premium-heading'>
                Get the <span style={{color:"green"}}>AmplifAI</span> Premium !
            </h3>

            <p className='premium-text'>
             Just ₹119/month after. Debit and credit cards accepted. Cancel anytime.
            </p>

            <div className='premium-button'>
                <button className='button' onClick={navigateToDetector}>Get Started</button>
                <button className='button' style={{backgroundColor:"green",border:"1px solid green"}}>See other Plans</button>
            </div>
        </div>

    </div>
  )
}

export default Premium