import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {

    const [looseWeightBtnState ,setlooseWeightBtnState ]=useState(false);
    
    const [gainWeightBtnState,setgainWeightBtnState]=useState(false);
    
    const [getFitBtnState,setgetFitBtnState]=useState(false);
    function handleClickLooseWgt()
    {
      setlooseWeightBtnState(true);
      setgainWeightBtnState(false);
      setgetFitBtnState(false);
    }
    function handleClickGainWgt()
    {
      setlooseWeightBtnState(false);
      setgainWeightBtnState(true);
      setgetFitBtnState(false);
    }
    function handleClickGetFit()
    {
      setlooseWeightBtnState(false);
      setgainWeightBtnState(false);
      setgetFitBtnState(true);
    }
    const navigate = useNavigate();
    return (
        <div
        className="px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] 
      bg-primary-1 my-0 mx-auto max-w-screen-sm w-screen h-[100dvh]"
      >
        <div className="grid content-between mb-4">
          <img src="/Logo plain background.svg" alt="FudHouse logo" />
        
        </div>   
<div className="max-w-screen-sm w-screen h-[100dvh]">
<div className="pb-60">
    <div className="w-11/12 h-3/6 ">
        <ul className=" justify-center flex flex-grow dark:text-gray-400 ">
    <li className="me-2">
        <a href="#" className="inline-block px-6 py-0.5 text-white bg-primary-9  active" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block  px-6 py-0.5 text-white bg-grey-4  active" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block  px-6 py-0.5 text-white bg-grey-4  active" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block  px-6 py-0.5 text-white bg-grey-4  active" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block px-6 py-0.5 text-white bg-grey-4 active" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block px-6 py-0.5 text-white bg-grey-4 active" aria-current="page"></a>
    </li>
</ul>

<div className="pt-5 pb-8">
        <p className="text-base font-normal font-montserrat text-[#131313] text-center">
          Let's build your profile</p>
          </div>
        
          <div className="pb-12">
    <div className="font-bold font-montserrat text-[#131313] text-4xl text-center" >
        What is your nutritional <br></br>goal
    </div>
</div>
</div>

<div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 ">
      <div className="pb-2">
          <Button
          width="w-full"
          height="h-12"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          handleClick={handleClickLooseWgt}
          bgColor={`transition duration-300 ${
            looseWeightBtnState ? "bg-primary-9" : "bg-grey-1"
          }`}
          
        ><p className="text-[#131313]">Loose Weight</p></Button>
        </div>
        <div className="pb-2">
        <Button
          width="w-full"
          height="h-12"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          handleClick={handleClickGainWgt}
          bgColor={`transition duration-300 ${
            gainWeightBtnState ? "bg-primary-9" : "bg-grey-1"
          }`}
        > <p className="text-[#131313]">Gain Weight</p></Button>
         </div>
         <div className="pb-2">
        <Button
          width="w-full"
          height="h-12"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          handleClick={handleClickGetFit}
          bgColor={`transition duration-300 ${
            getFitBtnState ? "bg-primary-9" : "bg-grey-1"
          }`}
        > <p className="text-[#131313]">Get Fit</p></Button>
        </div>
        </div>
        <div className="pt-4">
          <p className="text-base font-normal font-montserrat text-sm text-[#131313] text-center">
          Did you know? Your nutritional goal should determine <br></br>what you eat and how you eat? <span> </span></p>
          </div>
          <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
          <Button
          width="w-full"
          height="h-14"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          bgColor={`transition duration-300 ${
            looseWeightBtnState||gainWeightBtnState||getFitBtnState ? "bg-primary-9" : "bg-grey-1"
          }`}
        > <p className="text-[#131313]">Next</p></Button>
        </div>
        </div>
      

          </div>
      
         
</div>
    );
}
