"use client"
import React,{useState,useEffect} from 'react'
// import Timer from '../../src/components/timer/Timer'
import Scroll from "../../src/components/scroll/Scroll";
import ContactUs from "../../src/components/contactUs/ConatctUs";
import CosmicJourney from "../../src/components/Home/CosmicJourney"
import PathMorphingLoader from "../../src/components/LoadingScreen/CosmicPulseLoader"
const page = () => {

  return (
    <div className=''>
        {/* <Timer/> */}
        {/* <ContactUs/>
        <Scroll/> */}
        {/* <Timer/> */}
     <CosmicJourney/>
    </div>
  )
}

export default page
