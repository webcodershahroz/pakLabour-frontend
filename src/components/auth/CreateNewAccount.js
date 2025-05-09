import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";
import logo from "../../img/logo.png";

function CreateNewAccount() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState(location.state || "");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  //alert states
  const [alertData, setAlertData] = useState({
    title: "Error",
    message: "Something went wrong",
    type: "warning",
  });

  //funtion to create a new account
  const checkIsUserExists = async () => {
    const payload = { email };
    setIsLoading(true);
  
    try {
      const res = await fetch("https://paklabour-backend.vercel.app/auth/user-exists", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 404) {
        navigate("/auth/verify-number", {
          state: {
            name,
            email,
            userLocation,
            accountType,
            password,
          },
        });
      } else if (res.status === 200) {
        setAlertData({
          title: "Duplicate email",
          message:
            "Another account is using this email. Try signing up with a different one.",
          type: "warning",
        });
        setIsAlertVisible(true);
        hideAlert();
      } else {
        setAlertData({
          title: "Server error",
          message: "Something went wrong, please try again later.",
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } catch (err) {
      console.log("User exists error: " + err.message);
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
  

  const handleNextButtonClick = async () => {
    if (email.length > 0 && password.length > 0 && accountType.length > 0)
      await checkIsUserExists();
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

  //hide alert
  const hideAlert = () => {
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <div className="h-fit mb-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 my-10">
          <Link to="/">
            <img src={logo} height={70} width={82} alt="" />
          </Link>
          <div className=" bg-white rounded-lg shadow dark:border max-w-md dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <span>
                <h1 className="text-xl font-bold md:text-2xl ">
                  Can't have an account
                </h1>
                <p className="text-sm font-medium text-lg">
                  {" "}
                  Creating a new account
                </p>
              </span>
              <p className="text-sm font-medium text-lg underline decoration-black decoration-2">
                {" "}
                Why are you creating an account? <br /> Are you a...?
              </p>
              <div className="flex items-center justify-center flex-wrap">
                <div
                  to={"/dashboard"}
                  onClick={() => {
                    setAccountType("worker");
                  }}
                  className={`border border-1 border-dark shadow rounded p-4 cursor-pointer m-1  ${
                    accountType === "worker"
                      ? "bg-brandcolor"
                      : "hover:bg-stone-100"
                  } `}
                >
                  <h1 className="text-lg font-medium">Worker</h1>
                  <p>I want to find work</p>
                </div>
                <div
                  to={"/dashboard"}
                  onClick={() => {
                    setAccountType("postWork");
                  }}
                  className={`border border-1 border-dark shadow rounded p-4 cursor-pointer m-1  ${
                    accountType === "postWork"
                      ? "bg-brandcolor"
                      : "hover:bg-stone-100"
                  }`}
                >
                  <h1 className="text-lg font-medium">Post works</h1>
                  <p>I want to post work</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="name"
                  value={name}
                  className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Muhammad Shahroz"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Location
                </label>
                <input
                  type="text"
                  onChange={(e) => setUserLocation(e.target.value)}
                  name="userlocation"
                  id="userlocation"
                  value={userLocation}
                  className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Pakistan"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  value={email}
                  className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium "
                >
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    value={password}
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
              </div>

              <button
                onClick={() => {
                  handleNextButtonClick();
                }}
                className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                  isLoading ? "cursor-not-allowed bg-gray-400" : "bg-brandcolor"
                }`}
                disabled={isLoading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewAccount;
