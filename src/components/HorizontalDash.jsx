/* eslint-disable react/prop-types */
function HorizontalDash({ step }) {
  return (
    <>
      <div className="mt-6 flex h-full justify-center gap-1">
        <div className="bg-success w-10 h-1 rounded-sm"></div>
        <div
          className={`${
            typeof step === "number"
              ? `bg-${step >= 1 ? "success" : "grey-1"}`
              : "bg-success"
          } w-10 h-1`}
        ></div>
        <div
          className={`${
            typeof step === "number"
              ? `bg-${step === 2 ? "success" : "grey-1"}`
              : "bg-success"
          } w-10 h-1`}
        ></div>
      </div>
    </>
  );
}

export default HorizontalDash;
