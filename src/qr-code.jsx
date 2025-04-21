import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
const QrCode = () => {
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setShowText(true);
  };

  return (
    <>
      <div className="bg-white w-full flex justify-center">
        <div className="max-w-[480px] w-[99vw] bg-white h-screen flex justify-center items-center flex-col ">
          <div className="pb-40 flex justify-end items-end w-full px-5">
            <Link to="/home">
              <IoMdClose size={34} />
            </Link>
          </div>
          {showText && <p className="text-center text-sm font-normal text-[#333333] pb-5">Show the QR Code below to the cashier</p>}
          <div className="cursor-pointer" onClick={handleClick}>
            <img src="/QR-large.png" alt="" width={175} height={175} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QrCode;
