import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function ProfileGenderScreen({setshowDOBScreen}) {

    const [femaleBtnState ,setfemaleBtnState ]=useState(false);
    
    const [maleBtnState,setmaleBtnState]=useState(false);
    
    function handlefemaleBtnState()
    {
      setfemaleBtnState(true);
      setmaleBtnState(false);
    }
    function handlemaleBtnState()
    {
      setfemaleBtnState(false);
      setmaleBtnState(true);
    }
    function handleNextBtnClick()
    {
      setshowDOBScreen(true);
    }
    const navigate = useNavigate();
    return (
      <div>
        <div
        className="px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] 
      bg-primary-1 my-0 mx-auto max-w-screen-sm w-screen h-[100dvh]"
      >
        <div className="grid content-between">
          <img src="/Logo plain background.svg" alt="FudHouse logo" />
        
        </div>   
<div className="max-w-screen-sm w-screen h-[100dvh] fixed">
<div className="pt-10">
    <div className="w-11/12 h-3/6 ">
        <ul className=" justify-center flex flex-grow dark:text-gray-400 ">
    <li className="me-2">
        <a href="#" className="inline-block px-6 py-0.5 text-white bg-primary-9  active" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block  px-6 py-0.5 text-white bg-primary-9  active" aria-current="page"></a>
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
        What is your Sex?
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
          handleClick={handlefemaleBtnState}
          bgColor={`transition duration-300 ${
            femaleBtnState ? "bg-primary-9" : "bg-grey-1"
          }`}
          
        ><p className="text-[#131313]">Male</p></Button>
        </div>
        <div className="pb-2">
        <Button
          width="w-full"
          height="h-12"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          handleClick={handlemaleBtnState}
          bgColor={`transition duration-300 ${
            maleBtnState ? "bg-primary-9" : "bg-grey-1"
          }`}
        > <p className="text-[#131313]">Female</p></Button>
         </div>
        </div>
        <div className="pt-4">
          <p className="text-base font-normal font-montserrat text-sm text-[#131313] text-center">
          Did you know? Your sex determines your calorie <br></br>need and the amount of calorie your <br></br>
          body is able to burn. <span> </span></p>
          </div>
          <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
          <Button
          width="w-full"
          height="h-14"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          handleClick={handleNextBtnClick}
          bgColor={`transition duration-300 ${
            femaleBtnState||maleBtnState? "bg-primary-9" : "bg-grey-1"
          }`}
        > <p className="text-[#131313]">Next</p></Button>
        </div>
        </div>
          </div>
</div>
</div>
    );
}
