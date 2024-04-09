// eslint-disable-next-line react/prop-types
function AppWrapper({ children }) {
  return (
    <div
      className="h-dvh px-4 pt-4 pb-7 grid my-0 mx-auto
        max-w-screen-sm font-montserrat auto-rows-max 
        bg-on-boarding bg-cover bg-white-4"
    >
      {children}
    </div>
  );
}

export default AppWrapper;
