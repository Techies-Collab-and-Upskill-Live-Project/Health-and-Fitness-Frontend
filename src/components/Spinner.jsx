export default function Spinner() {
  return (
    <div className=" my-0 mx-auto h-screen max-w-screen-sm w-full flex items-center justify-center bg-on-boarding bg-cover">
      <img className="animate-spin" src="/Loader.png" alt="Loading spinner" />
    </div>
  );
}