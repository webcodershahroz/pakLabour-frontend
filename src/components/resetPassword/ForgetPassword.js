import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";
import logo from "../../img/logo.png";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [userOtp, setUserOtp] = useState("");
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    sendEmail,
    otp,
    isLoading,
    generateOtp,
  } = useContext(StateContext);

  //handle create button click
  const verifyOtp = async () => {
    if (otp === userOtp) {
      navigate("/auth/reset-password", { state: { email } });
    } else {
      setAlertData({
        title: "Invalid OTP",
        message: "Please enter a valid OTP",
        type: "error",
      });

      //setting alert visible
      setIsAlertVisible(true);
      //calling hideAlert function
      hideAlert();
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
                  Enter email address
                </h1>
                <p className="text-sm font-medium text-lg">
                  {" "}
                  Enter email and click send then enter otp sent to your email
                  address
                </p>
              </span>
              <div>
                <p>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your email
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      value={email}
                      id="email"
                      className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="example@gmail.com"
                      required
                    />
                    <button
                      disabled={isLoading || email.length === 0}
                      onClick={() => {
                        sendEmail(email);
                      }}
                      className={`w-1/3 flex items-center justify-center py-2 rounded font-medium   ${
                        isLoading || email.length === 0
                          ? "cursor-not-allowed bg-gray-400"
                          : "bg-brandcolor"
                      }`}
                    >
                      Send OTP
                    </button>
                  </div>
                </p>
              </div>
              <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium">
                  Enter OTP
                </label>
                <input
                  onChange={(e) => setUserOtp(e.target.value)}
                  type="text"
                  name="otp"
                  id="otp"
                  className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="******"
                  required
                  value={userOtp}
                  maxLength={6}
                />
              </div>
              <button
                disabled={isLoading || userOtp.length === 0}
                className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                  isLoading || userOtp.length === 0
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-brandcolor"
                }`}
                onClick={() => {
                  verifyOtp();
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
