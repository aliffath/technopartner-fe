import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

import BottomNav from "./components/BottomNav";
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("access_token");
      const tokenType = Cookies.get("token_type");

      if (!token || !tokenType) {
        setErrorMsg("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      try {
        const response = await axios.get("https://soal.staging.id/api/home", {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        setErrorMsg("Gagal mengambil data user.");
        console.log(error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
      <div className="bg-white w-full flex justify-center">
        <div className="max-w-[480px] w-[99vw] bg-[#F7F9FB] h-screen flex flex-col ">
          <div className="bg-white p-5">
            <img src="/logo-techno.png" alt="" width={97} height={16} />
          </div>
          <div className="bg-[url(/pattern-BG.jpg)] p-8">
            <div className="bg-white rounded-xl py-3 px-4 shadow-md">
              <p className="text-[#333333] font-normal text-xs ">{userData?.result?.greeting}</p>
              <p className="text-[#333333] font-medium text-sm py-2">{userData?.result?.name}</p>
              <div className="flex items-center gap-4">
                <Link to="/qr-code">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <img src={userData?.result?.qrcode} alt="" width={29} height={29} />
                  </div>
                </Link>
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-[#333333] font-normal text-xs pb-2">Saldo</p>
                    <p className="text-[#333333] font-normal text-xs">Points</p>
                  </div>
                  <div>
                    <p className="text-[#333333] font-medium text-xs pb-2">{userData?.result?.saldo}</p>
                    <p className="text-[#00D78B] font-normal text-sm">{userData?.result?.point}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={userData?.result?.banner[1]} alt="" className="w-full h-[181px] object-cover" />
          </div>
          <div className="bg-white p-4">
            <Link to="/menu" className="flex items-center gap-2 justify-end">
              <p className="text-[#00D78B] font-normal text-xs text-end"> View All</p>
              <IoChevronForward size={16} />
            </Link>
          </div>
          <div
            className="fixed bottom-0 max-w-[480px] w-full shadow-lg"
            style={{
              boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.00)",
            }}>
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
