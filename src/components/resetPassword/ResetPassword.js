import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import logo from "../../img/logo.png";

function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email, setEmail } = location.state;
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
  } = useContext(StateContext);

  const handleChangePassword = () => {
    if (password.length < 0) {
      setAlertData({
        title: "Empty fields",
        message: "Please type password ",
        type: "warning",
      });

      //setting alert visible
      setIsAlertVisible(true);
      //calling hideAlert function
      hideAlert();
    } else if (password.trim() === confirmPassword.trim()) {
      changePassword();
    } else {
      setAlertData({
        title: "Password not match ",
        message: "Create password and confirm password must be same",
        type: "error",
      });

      //setting alert visible
      setIsAlertVisible(true);
      //calling hideAlert function
      hideAlert();
    }
  };
  //change password fetch function
  const changePassword = async () => {
    const payload = {
      email,
      password,
    };
  
    setIsLoading(true);
  
    try {
      const res = await fetch("https://paklabour-backend.vercel.app/auth/change-password", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 404) {
        setAlertData({
          title: "Account Not Found",
          message: "The email address you entered is not registered.",
          type: "error",
        });
      } else if (res.status === 200) {
        setAlertData({
          title: "Password Updated",
          message: "Your password was updated successfully.",
          type: "success", // fixed here
        });
        navigate("/auth/signin");
      } else {
        setAlertData({
          title: "Server Error",
          message: "Something went wrong. Please try again later.",
          type: "error",
        });
      }
  
      setIsAlertVisible(true);
      hideAlert();
  
    } catch (err) {
      console.error("Change password error:", err.message);
      setAlertData({
        title: "Network Error",
        message: "Check your internet connection and try again.",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <div className="h-[100vh] my-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 my-10">
          <Link to="/">
            <img src={logo} height={70} width={82} alt="" />
          </Link>
          <div className=" bg-white rounded-lg shadow dark:border max-w-md dark:border-gray-700 w-full ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <span>
                <h1 className="text-xl font-bold md:text-2xl ">
                  Enter New Password
                </h1>
                <p className="text-sm font-medium text-lg">
                  {" "}
                  Enter new password below to continue
                </p>
              </span>
              <div>
                <p>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Create password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                    <i
                      className={`fa-solid fa-eye${
                        showPassword ? "-slash" : ""
                      } absolute right-0 bottom-[30%] right-4 cursor-pointer`}
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    ></i>
                  </div>
                </p>
              </div>
              <div>
                <p>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      name="confirm-password"
                      id="confirm-password"
                      value={confirmPassword}
                      placeholder="••••••••"
                      className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                    <i
                      className={`fa-solid fa-eye${
                        showPassword ? "-slash" : ""
                      } absolute right-0 bottom-[30%] right-4 cursor-pointer`}
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    ></i>
                  </div>
                </p>
              </div>
              <button
                className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                  isLoading ? "cursor-not-allowed bg-gray-400" : "bg-brandcolor"
                }`}
                onClick={() => {
                  handleChangePassword();
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
