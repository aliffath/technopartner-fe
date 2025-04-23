import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://soal.staging.id/oauth/token",
        {
          grant_type: "password",
          client_id: "e78869f77986684a",
          client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
          username: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Cookies.set("access_token", response.data.access_token);
      Cookies.set("token_type", response.data.token_type);

      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      return;
    }
  };
  return (
    <>
      <div className="bg-white w-full flex justify-center">
        <div className="max-w-[480px] w-[99vw] bg-[#F7F9FB] h-screen flex justify-center items-center flex-col px-10">
          <div>
            <img src="/logo-techno.png" alt="" width={254} height={42} />
          </div>
          <div className="w-full my-8">
            <form onSubmit={handleLogin}>
              <div className="py-5">
                <p className="font-normal text-[12px] text-center text-[#A7A7A7] pb-1">Email</p>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-md">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="grow bg-white border-none outline-none focus:ring-0 focus:outline-none focus:border-none"
                    placeholder="Masukan Email"
                  />
                </div>
              </div>

              <div className="py-5">
                <p className="font-normal text-[12px] text-center text-[#A7A7A7] pb-1">Pasword</p>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-md">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="grow bg-white border-none outline-none focus:ring-0 focus:outline-none focus:border-none"
                    placeholder="Masukan Password"
                  />
                </div>
              </div>
              <div className="flex justify-center py-5">
                <button type="submit" className="bg-white shadow-lg border-none rounded-lg p-3 w-[131px] font-bold text-[#464644] text-sm">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
