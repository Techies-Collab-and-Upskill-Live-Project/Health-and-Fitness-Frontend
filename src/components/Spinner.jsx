export default function Spinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-on-boarding bg-cover">
     <img className="animate-spin" src="/Loader.png" alt="Loading spinner" />
    </div>
  );
}
