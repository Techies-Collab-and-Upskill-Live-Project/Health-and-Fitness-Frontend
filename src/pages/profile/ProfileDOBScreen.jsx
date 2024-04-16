/* eslint-disable react/prop-types */
import {  useState } from "react";
import { Button } from "../../components/Button";
import {InputField} from "../../components/input-fields/InputField";
import { useNavigate } from "react-router-dom";

export default function ProfileDOBScreen({setshowWeightScreen}) {
    const [datefield ,setDateFieldState ]=useState(false);  
    const [monthfield,setMonthFieldState]=useState(false);
    const [yearfield, setYearFieldState]=useState(false);
    const [dateIsFocus, setDateIsFocus] = useState(false);
    const [monthIsFocus, setMonthIsFocus] = useState(false);
    const [yearIsFocus, setYearIsFocus] = useState(false);

    const [dateValue,setDateValue]=useState('');
    const [monthValue,setMonthValue]=useState('');
    const [yearValue,setYearValue]=useState('');
   function setDateField(e)
    {
     
      if(e.target.value)
      { setDateFieldState(true);
        setDateValue(e.target.value);
      }
      else
      setDateFieldState(false);
    }
    function setMonthField(e)
    {
      if(e.target.value)
      {  setMonthFieldState(true);
        setMonthValue(e.target.value);
      }
      else
      setMonthFieldState(false);
    }
    function setYearField(e)
    {
      if(e.target.value)
      {setYearFieldState(true);
        setYearValue(e.target.value);
      }
      else
      setYearFieldState(false);
    }
    function handleNextBtnClick()
    {
      setshowWeightScreen(true);
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
<div className="max-w-screen-sm w-screen h-dvh fixed">
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
        <a href="#" className="inline-block  px-6 py-0.5 text-white bg-primary-9 inactive" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block  px-6 py-0.5 text-white bg-grey-4  inactive" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block px-6 py-0.5 text-white bg-grey-4 inactive" aria-current="page"></a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block px-6 py-0.5 text-white bg-grey-4 inactive" aria-current="page"></a>
    </li>
</ul>

<div className="pt-5 pb-8">
        <p className="text-base font-normal font-montserrat text-[#131313] text-center">
          Let's build your profile</p>
          </div>
        
          <div className="pb-12">
    <div className="font-bold font-montserrat text-[#131313] text-4xl text-center" >
        Your Date of Birth
    </div>
</div>
</div>

<div className="w-11/12 h-3/6  justify-center flex flex-row pl-4 pb-16 ">
  <div className="w-1/6 h-2/6 mr-1">
<InputField
          name="day"
          placeholder="DD"
          onChange={setDateField}
          onFocus={setDateIsFocus}
          value={dateValue}
  
        >
            </InputField>
            </div>
            <div className="w-1/6 h-2/6 mr-1">
            <InputField
          name="month"
          placeholder="MM"
          onChange={setMonthField}
          onFocus={setMonthIsFocus}
          value={monthValue}
    
        >
        
            </InputField>
            </div>
            <div className="w-2/5 h-2/6 mr-1">
            <InputField
          name="year"
          placeholder="YYYY"
          onChange={setYearField}
          onFocus={setYearIsFocus}
          value={yearValue}
    
        >
         
      </InputField>
      </div>
        </div>
        <div className="pt-4">
          <p className="text-base font-normal font-montserrat text-sm text-[#131313] text-center">
          Did you know? Your age determines your calorie need<br></br> and the amount of calorie your <br></br>body is able to burn.</p>
          </div>
          <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
          <Button
          width="w-full"
          height="h-14"
          shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
          border="border-[1px] border-[#D0D5DD]"
          bgColor={`transition duration-300 ${
            datefield && monthfield && yearfield? "bg-primary-9" : "bg-grey-1"
          }`}
          handleClick={handleNextBtnClick}
        > <p className="text-[#131313]">Next</p></Button>
        </div>
        </div>
          </div>
</div>
</div>
    );
}
