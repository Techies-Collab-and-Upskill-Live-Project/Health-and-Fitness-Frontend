function AccountActivationContent() {
  return (
    <div className="px-4 font-montserrat text-grey-6 text-center">
      <MailBox />
      <ActivationText />
      <Footer />
    </div>
  );
}

export default AccountActivationContent;

function MailBox() {
  return (
    <div className="h-[140px] flex items-center justify-center">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M55 13.75H22.5C19.75 13.75 17.5 16 17.5 18.75V41.25C17.5 42.5761 18.0268 43.8479 18.9645 44.7855C19.9021 45.7232 21.1739 46.25 22.5 46.25H55C57.775 46.25 60 44.025 60 41.25V18.75C60 17.4239 59.4732 16.1521 58.5355 15.2145C57.5979 14.2768 56.3261 13.75 55 13.75ZM55 22.925L38.75 31.25L22.5 22.925V18.75L38.75 27.025L55 18.75V22.925ZM12.5 41.25C12.5 41.675 12.575 42.075 12.625 42.5H2.5C1.12 42.5 0 41.375 0 40C0 38.625 1.12 37.5 2.5 37.5H12.5V41.25ZM7.5 17.5H12.625C12.575 17.925 12.5 18.325 12.5 18.75V22.5H7.5C6.125 22.5 5 21.375 5 20C5 18.625 6.125 17.5 7.5 17.5ZM2.5 30C2.5 28.625 3.625 27.5 5 27.5H12.5V32.5H5C3.625 32.5 2.5 31.375 2.5 30Z"
          fill="#3F6A11"
        />
      </svg>
    </div>
  );
}

function ActivationText() {
  return (
    <div
      className="flex items-center justify-center gap-5 
    text-wrap  text-md font-medium
    flex-col"
    >
      <p>
        You are almost done! Click on the activation link sent to
        <b> example@email.com</b> to activate your FudHouse account.
      </p>
      <p>
        Also check your spam box if you can&apos;t find the mail in your inbox.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className="h-[96px] flex justify-end gap-4 items-center text-sm flex-col">
      <p className="w-full h-1 bg-grey-2"></p>
      <p className=" text-nowrap">
        Didn&apos;t receive the email?{" "}
        <span className="cursor-pointer text-primary-9 font-medium">
          Resend activation mail
        </span>
      </p>
    </div>
  );
}
