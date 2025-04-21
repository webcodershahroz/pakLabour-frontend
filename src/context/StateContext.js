import React, { createContext, useState } from "react";

import { jwtDecode } from "jwt-decode";
export const StateContext = createContext();

export function StateContextProvider({ children }) {
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [workerAnalytics, setWorkerAnalytics] = useState();

  // const location = useLocation();

  //alert states
  const [alertData, setAlertData] = useState({
    title: "Error",
    message: "Something went wrong",
    type: "warning",
  });

  //hide alert
  const hideAlert = () => {
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  //decode jwt token from localstorage
  const decodeJwtToken = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const data = jwtDecode(token);
      return data.user;
    }
  };

  //function that chect if user is logged in or not
  const isUserLoggedIn = () => {
    let isLoggedIn = localStorage.getItem("token");
    return isLoggedIn === null ? false : true;
  };

  //function to generate otp
  const generateOtp = () => {
    let tempOtp = "";
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 9);
      tempOtp = tempOtp + randomNumber.toString();
    }
    setOtp(tempOtp);
    return tempOtp;
  };

// Send email OTP to email
const sendEmail = async (email) => {
  setIsLoading(true);
  const generatedOtp = generateOtp();
  const payload = { otp: generatedOtp, email };

  try {
    const res = await fetch("https://paklabour-backend.vercel.app/auth/send-otp", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      setAlertData({
        title: "OTP Sent",
        message: `OTP has been sent to ${email}. Please check your email.`,
        type: "success",
      });
    } else {
      const errorMessage = res.status === 500
        ? "Server error. Please try again later."
        : "Something went wrong. Please try again later.";
      setAlertData({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
    }
  } catch (err) {
    setAlertData({
      title: "Internet Error",
      message: "Please check your internet connection and try again.",
      type: "error",
    });
  } finally {
    setIsAlertVisible(true);
    hideAlert();
    setIsLoading(false);
  }
};


  //logout funtion
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  //function to update worker analytics
  const updateWorkerAnalytics = async (data) => {
    const payload = {
      user: data.user,
      orderCompleted :data.orderCompleted,
      averageRating : data.averageRating,
      totalEarnings:data.earnings,
      withdrawAmount:data.withdrawAmount
    }
    console.log(payload)
    try {
      fetch(`https://paklabour-backend.vercel.app/worker/update-analytics`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();
        setWorkerAnalytics(data);
      });
    } catch (error) {}
  };


  return (
    <StateContext.Provider
      value={{
        isSearch,
        setIsSearch,
        searchQuery,
        setSearchQuery,
        isAlertVisible,
        setIsAlertVisible,
        alertData,
        setAlertData,
        hideAlert,
        decodeJwtToken,
        sendEmail,
        generateOtp,
        isLoading,
        otp,
        logout,
        isUserLoggedIn,
        updateWorkerAnalytics,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
