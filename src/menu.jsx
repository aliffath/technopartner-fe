import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import BottomNav from "./components/BottomNav";

const Menu = () => {
  const [dataMenu, setDataMenu] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const getMenu = async () => {
      const token = Cookies.get("access_token");
      const tokenType = Cookies.get("token_type");

      if (!token || !tokenType) {
        return;
      }

      try {
        const response = await axios.post(
          "https://soal.staging.id/api/menu",
          { show_all: 1 },
          {
            headers: {
              Authorization: `${tokenType} ${token}`,
            },
          }
        );

        const categories = response?.data?.result?.categories || [];
        setDataMenu(response.data);
        setTabs(categories?.map((item) => item.category_name));
      } catch (error) {
        console.log(error);
      }
    };

    getMenu();
  }, []);

  return (
    <>
      <div className="bg-white w-full flex justify-center">
        <div className="max-w-[480px] w-[99vw] bg-[#F7F9FB] h-screen flex flex-col">
          <div className="w-full bg-white">
            <div>
              <p className="text-[#464644] font-bold text-base leading-5 text-center py-5">MENU</p>
            </div>

            <div className="overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <div className="flex space-x-2 min-w-max px-2 py-2" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                {tabs.map((tab, index) => (
                  <p
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 cursor-pointer text-xs font-normal whitespace-nowrap transition-colors duration-200 ${
                      activeTab === index ? "border-b-3 font-medium border-[#3B3A38] text-[#3B3A38]" : "text-[#A7A7A7]"
                    }`}>
                    {tab}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F7F9FB]">{tabs[activeTab] && <p className="text-[#383838] font-medium text-xs leading-4">{tabs[activeTab]}</p>}</div>

            {/* Content */}
            <div className="bg-white p-4 space-y-5 flex-1 overflow-y-auto">
              {dataMenu && dataMenu?.result?.categories[activeTab] && dataMenu?.result?.categories[activeTab]?.menu.length > 0 ? (
                dataMenu?.result?.categories[activeTab].menu.map((item, index) => (
                  <div key={index} className="flex justify-between gap-4">
                    <img src={item.photo} alt={item.name} width={62} height={62} className="object-cover" />
                    <div className="flex flex-col ">
                      <div>
                        <p className="text-xs leading-4 font-semibold text-[#3B3A38]">{item.name}</p>
                        <p className="text-xs font-normal leading-4 text-[#A7A7A7]">{item.description}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs leading-4 font-medium text-[#3B3A38] mt-1">{item.price.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Tidak ada menu pada kategori ini.</p>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
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

export default Menu;
