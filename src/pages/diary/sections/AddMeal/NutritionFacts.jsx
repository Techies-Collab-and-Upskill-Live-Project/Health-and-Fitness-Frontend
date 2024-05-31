import { useState } from "react";
import { Modal } from "../MealSection/MealSection";
import ScreenOverlay from "../../../../components/ScreenOverlay";


/* eslint-disable react/prop-types */
export function MealNutrFacts() {
const [factID, setFactID] = useState(null);


function handleClick(id){
  setFactID(id)
}

function handleCancel(){
  setFactID(null)
}


  return (
    <>
    <div
      className="w-full min-h-[216px] flex flex-col justify-around items-center 
      gap-1 text-grey-6 font-montserrat text-base"
    >
      <div className="font-semibold w-full flex justify-between items-center">
        <p>Nutrition Facts</p>
        <svg
          width="15"
          height="18"
          viewBox="0 0 15 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.204 1.5755L11.294 1.6275C12.0721 2.07671 12.721 2.4513 13.1961 2.81795C13.6976 3.20494 14.0956 3.64914 14.2623 4.27132C14.4291 4.8935 14.3065 5.4772 14.0657 6.06309C13.8985 6.46976 13.6527 6.92674 13.3566 7.44801L12.7213 7.0704L12.7131 7.0656L5.7878 3.06728L5.14016 2.68557C5.44025 2.17448 5.71063 1.73795 5.97682 1.393C6.36382 0.891518 6.80801 0.49349 7.4302 0.326777C8.05238 0.160063 8.63608 0.282668 9.22197 0.523468C9.77704 0.751604 10.4259 1.12624 11.204 1.5755Z"
            fill="#151425"
          />
          <path
            d="M4.38873 3.98384L0.91076 10.0077C0.612973 10.5225 0.377514 10.9296 0.290278 11.3926C0.203043 11.8556 0.27423 12.3204 0.36426 12.9083L0.388516 13.0672C0.554702 14.1586 0.691683 15.0581 0.898283 15.7403C1.11435 16.4537 1.44651 17.0712 2.09978 17.4484C2.75305 17.8256 3.45392 17.8045 4.1798 17.6349C4.87387 17.4727 5.7214 17.1416 6.74963 16.7398L6.89938 16.6814C7.45351 16.4654 7.89166 16.2946 8.24901 15.9876C8.60637 15.6805 8.84116 15.2731 9.1381 14.7578L12.6078 8.74792L11.959 8.36226L5.02907 4.36127L4.38873 3.98384Z"
            fill="#151425"
          />
        </svg>
      </div>
      <div
        className="w-full min-h-[188px] rounded border
         border-grey-1 bg-white-4 py-3 px-2 flex flex-col justify-between"
      >
        <Fact id={1} icon="energy.png" name="Energy" value="69kcal" handleEdit={handleClick} />
        <Fact id={2} icon="carbs.png" name="Carbs" value="11g" handleEdit={handleClick} />
        <Fact id={3} icon="protein.png" name="Protein" value="2.5g" handleEdit={handleClick} />
        <Fact id={4} icon="fats.png" name="Fats" value="1.5g" handleEdit={handleClick} />
      </div>
    </div>

    {
    factID !== null &&
     <EditFact onCancel={handleCancel} title={factID === 1? "Energy": factID === 2?
     "Carbs" : factID === 3? "Protein": "Fat"} />
     }
    </>
  );
}

export function Fact({ id, icon, name, value, handleEdit }) {
  return (
    <div
    onClick={()=> handleEdit(id)}
    className="w-full flex justify-between 
    items-center cursor-pointer">
      <div className="flex gap-4 items-center">
        <div
          className="
        w-8 h-8 flex justify-center items-center rounded-full
         bg-white-4 shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)]"
        >
          <img src={`/${icon}`} alt={name} />
        </div>
        <p className="font-medium">{name}</p>
      </div>
      <p className="text-right">{value}</p>
    </div>
  );
}


function EditFact({title, onCancel}){
  return(
 <ScreenOverlay>
   <Modal handleCancel={onCancel} title={title} action="Save" bg="bg-primary-1" actionColor="primary-9">
<div className="flex flex-col justify-around">
  <div className="flex items-center justify-start">
  <input type="text" className="focus:outline-none min-w-11
    border-b border-grey-6 outline-none" />
   <p className="font-semibold text-2xl">{title === "Energy"? "kcal" : "g"}</p>
  </div>
  <p className="text-xs font-medium text-grey-4">
    Enter the {
      title === "Energy"? "calorie/energy " : title === "Carbs" ? "carb ": 
       title ==="Protein" ? "protein ": "fat "
    } content of your meal in {title === "Energy"? "kcal" : "gram"} </p>
</div>
  </Modal>
 </ScreenOverlay>)
}