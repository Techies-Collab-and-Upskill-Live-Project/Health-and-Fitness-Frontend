// eslint-disable-next-line react/prop-types
function AppWrapper({ bg = "bg-on-boarding", children }) {
  return (
    <div
      className={`overflow-auto h-dvh px-4 pt-4 pb-7 grid my-0 mx-auto
        max-w-screen-sm font-montserrat auto-rows-max 
         bg-cover bg-white-4 ${bg}`}
    >
      {children}
    </div>
  );
}

export default AppWrapper;
