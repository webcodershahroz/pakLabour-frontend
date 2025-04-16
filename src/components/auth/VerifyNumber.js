import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";
import { StateContext } from "../../context/StateContext";
import logo from "../../img/logo.png";

function VerifyNumber({ route }) {
  const location = useLocation();
  const { name, accountType, userLocation, password } = location.state;
  const [email, setEmail] = useState(location.state.email);
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    sendEmail,
    otp,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);


  const navigate = useNavigate();

  //funtion to create a new account
  const createAccount = async () => {
    const payload = {
      name,
      type: accountType,
      location: userLocation,
      email,
      password,
    };
  
    setIsLoading(true);
  
    try {
      const res = await fetch("http://localhost:2000/auth/signup", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setAlertData({
          title: "Server error",
          message: "Something went wrong, please try again later",
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } catch (err) {
      console.log("Create account error: " + err.message);
      setAlertData({
        title: "Network error",
        message: "Could not connect to the server",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };
  
  //verify otp and create account
  const verifyOtpAndCreateAccount = async () => {
    if (otp === userOtp) {
      await createAccount();
    } else {
      setAlertData({
        title: "Verification error",
        message: "Invalid OTP. Please enter a valid OTP",
        type: "error",
      });

      setIsAlertVisible(true);
      hideAlert();
    }
  };

  //handle create button click
  const handleCreateButtonClick = async () => {
    if (userOtp.length > 0) await verifyOtpAndCreateAccount();
    else {
      setAlertData({
        title: "Empty fields",
        message: "Please fill all the fields",
        type: "warning",
      });

      //setting alert visible
      setIsAlertVisible(true);
      //calling hideAlert function
      hideAlert();
    }
  };


  useEffect(() => {
    const callSendEmail = async () => {
      if (!emailSent) {
        await sendEmail(email);
        setEmailSent(true);
      }
    };
    callSendEmail();
  }, [emailSent, email]);
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
                  Verify your email
                </h1>
                <p className="text-sm font-medium text-lg">
                  {" "}
                  Enter otp sent to your email number
                </p>
              </span>
              <div>
                <p>
                  {editEmail ? (
                    <>
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
                          className={`bg-brandcolor mt-1 w-1/3 flex items-center justify-center py-2 rounded-full font-medium`}
                          onClick={() => {
                            setEditEmail(false);
                            sendEmail(email);
                          }}
                        >
                          Okay
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="font-bold">Your email: </span>
                      <br />
                      {email || "your email"}
                      <button
                        onClick={() => {
                          setEditEmail(true);
                        }}
                        className="underline text-blue-600 ml-1"
                      >
                        edit
                      </button>
                    </>
                  )}
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
                  className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="******"
                  required
                  value={userOtp}
                  maxLength={6}
                />
              </div>
              <button
                className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                  isLoading ? "cursor-not-allowed bg-gray-400" : "bg-brandcolor"
                }`}
                onClick={() => {
                  handleCreateButtonClick();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyNumber;
