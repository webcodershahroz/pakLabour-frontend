import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";
import logo from "../../img/logo.png";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //alert states
  const [alertData, setAlertData] = useState({
    title: "Error",
    message: "Something went wrong",
    type: "warning",
  });

  //function to login user
  const doLogin = async () => {
    const payload = {
      email,
      password,
    };
    setIsLoading(true);
    fetch("http://localhost:2000/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        //navigation to create new account
        if (res.status === 404) {
          navigate("/auth/create-new-account", { state: email });
        }
        //showing alert of incorrect password
        else if (res.status === 401) {
          setAlertData({
            title: "Incorrect password",
            message: "Please enter the correct password",
            type: "error",
          });

          setIsAlertVisible(true);
          hideAlert();
        } else if (res.status === 200) {
          try {
            const data = await res.json();
            localStorage.setItem("token", JSON.stringify(data));
            // navigate("/dashboard");
            window.location.href = "/dashboard";
          } catch (error) {
            console.log("Local storage " + error.message);
          }
        }
        //server error
        else {
          setAlertData({
            title: "Server error",
            message: "Something went wrong please try again later",
            type: "error",
          });

          setIsAlertVisible(true);
          hideAlert();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("create new account error " + err.message);
        setIsLoading(false);
      });
  };

  const handleSignInButtonClick = async () => {
    if (email.length > 0 && password.length > 0) await doLogin();
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

      <div className="h-[100vh] mb-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 my-10">
        <Link to="/">
          <img src={logo} height={70} width={82} alt="" />
        </Link>
          <div className=" bg-white rounded-lg shadow dark:border max-w-md  dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <span>
                <h1 className="text-xl font-bold md:text-2xl ">
                  Sign in to your account
                </h1>
                <p className="text-sm font-normal">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur error alias minus ipsam debitis
                </p>
              </span>

              <div className="space-y-4 md:space-y-6">
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
                    Password
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
                  <Link
                    to={"/auth/forget-password"}
                    className="float-right my-1 clear-both text-sm underline text-blue-600 my-3"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button
                  onClick={() => {
                    handleSignInButtonClick();
                  }}
                  className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                    isLoading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-brandcolor"
                  }`}
                  to={"/auth/create-new-account"}
                  disabled={isLoading}
                >
                  Sign in
                </button>
                <div>
                  Don't have an account?{" "}
                  <Link
                    to={"/auth/create-new-account"}
                    className="underline text-blue-600"
                  >
                    Create now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;

// <div className="flex items-center justify-between">
//                   <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input
//                         id="remember"
//                         aria-describedby="remember"
//                         type="checkbox"
//                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                         required=""
//                       />
//                     </div>
//                     <div className="ml-3 text-sm">
//                       <label htmlFor="remember" className="">
//                         Remember me
//                       </label>
//                     </div>
//                   </div>
//                 </div>
