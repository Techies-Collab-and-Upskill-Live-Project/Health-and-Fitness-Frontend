import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { useNavigate } from "react-router-dom";

export default function ProfileHeightScreen() {
  const [heightValue, setheightValue] = useState('');
  const [selectedType, setSelectedType] = useState("Cm");
  const [btnClickedCm, setBtnClickCm] = useState(true);
  const [btnClickedFt, setBtnClickFt] = useState(false);
  const [heightIsFocus, setheightIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (heightValue !== "") {
      setInputValue(`${heightValue} ${selectedType}`);
    } else {
      setInputValue(` ${selectedType}`);
    }
  }, [heightValue, selectedType]);

  function setheightField(e) {
    setheightValue(e.target.value);
  }

  function handleClickCm() {
    setBtnClickCm(true);
    setBtnClickFt(false);
    setSelectedType("Cm");
  }

  function handleClickFt() {
    setBtnClickFt(true);
    setBtnClickCm(false);
    setSelectedType("Ft");
  }

  function handleNxtBtn() {

  }

  const navigate = useNavigate();
  return (
    <div>
      <div className="px-4 pt-4 pb-7 grid gap-3.5 grid-rows-[1.5fr_1fr] bg-primary-1 my-0 mx-auto max-w-screen-sm w-screen h-[100dvh]">
        <div className="grid content-between">
          <img src="/Logo plain background.svg" alt="FudHouse logo" />
        </div>
        <div className="max-w-screen-sm w-screen h-[100dvh] fixed">
          <div className="pt-10">
            <div className="w-11/12 h-3/6 ">
              <ul className="justify-center flex flex-grow dark:text-gray-400 ">
                <li className="me-2">
                  <a href="#" className="inline-block px-6 py-0.5 text-white bg-primary-9  active" aria-current="page"></a>
                </li>
                <li className="me-2">
                  <a href="#" className="inline-block  px-6 py-0.5 text-white bg-primary-9  active" aria-current="page"></a>
                </li>
                <li className="me-2">
                  <a href="#" className="inline-block  px-6 py-0.5 text-white bg-primary-9 active" aria-current="page"></a>
                </li>
                <li className="me-2">
                  <a href="#" className="inline-block  px-6 py-0.5 text-white bg-primary-9  active" aria-current="page"></a>
                </li>
                <li className="me-2">
                  <a href="#" className="inline-block px-6 py-0.5 text-white bg-primary-9 active" aria-current="page"></a>
                </li>
                <li className="me-2">
                  <a href="#" className="inline-block px-6 py-0.5 text-white bg-grey-4 inactive" aria-current="page"></a>
                </li>
              </ul>
              <div className="pt-5 pb-8">
                <p className="text-base font-normal font-montserrat text-[#131313] text-center">Let's build your profile</p>
              </div>
              <div className="pb-12">
                <div className="font-bold font-montserrat text-[#131313] text-4xl text-center" >
                  What is your Height?
                </div>
              </div>
            </div>
            <div className="w-11/12 justify-center flex flex-row pl-4 pb-16 ">
              <div className="w-1/6 h-4/6 mr-1">
                <InputField
                  name="height"
                  placeholder=""
                  onChange={setheightField}
                  onFocus={setheightIsFocus}
                  value={inputValue}
                />
              </div>
            </div>
            <div className="w-11/12 h-3/6  justify-center flex flex-row pl-4 pb-16 ">
              <Button
                width="w-1/6"
                height="h-14"
                shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
                border="border-[1px] border-[#D0D5DD]"
                handleClick={handleClickCm}
                bgColor={`transition duration-300 ${
                  btnClickedCm ? "bg-primary-9" : "bg-grey-1"
                }`}
              >
                <p className="text-[#131313]">Cm</p>
              </Button>
              <Button
                width="w-1/6"
                height="h-14"
                shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
                border="border-[1px] border-[#D0D5DD]"
                handleClick={handleClickFt}
                bgColor={`transition duration-300 ${
                  btnClickedFt ? "bg-primary-9" : "bg-grey-1"
                }`}
              >
                <p className="text-[#131313]">Ft</p>
              </Button>
            </div>
            <div className="pt-4">
              <p className="text-base font-normal font-montserrat text-sm text-[#131313] text-center">
              We use your weight and height and to recommend <br></br>meals that suits your nutritional goal.
              </p>
            </div>
            <div className="w-11/12 h-3/6  justify-center flex flex-col pl-4 pb-4 pt-6">
              <Button
                width="w-full"
                height="h-14"
                shadowBox="shadow-[0px_1px_2px_0px_#1018280d]"
                border="border-[1px] border-[#D0D5DD]"
                handleClick={handleNxtBtn}
                bgColor={`transition duration-300 ${
                  inputValue ? "bg-primary-9" : "bg-grey-1"
                }`}
              >
                <p className="text-[#131313]">Next</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
