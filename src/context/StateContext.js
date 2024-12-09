import React, { createContext, useState } from "react";

import { jwtDecode } from "jwt-decode";
export const StateContext = createContext();

export function StateContextProvider({ children }) {
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);


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
    const data = jwtDecode(token);
    return data.user;
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

  //send email of otp to email
  const sendEmail = async (email) => {
    setIsLoading(true)
    let generatedOtp = generateOtp();
    const payload = {
      otp: generatedOtp,
      email,
    };
    console.log(payload);
    fetch("http://localhost:2000/auth/send-otp", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //show alert when otp is sent
        if (res.status === 200) {
          setAlertData({
            title: "Otp send",
            message: "OTP is sent to " + email + "check your email",
            type: "success",
          });

          setIsAlertVisible(true);
          hideAlert();
        }
        //server error
        else if (res.status === 500) {
          setAlertData({
            title: "google error",
            message: "Something went wrong please try again later",
            type: "error",
          });

          setIsAlertVisible(true);
          hideAlert();
        } else {
          setAlertData({
            title: "Server error",
            message: "Something went wrong please try again later",
            type: "error",
          });

          setIsAlertVisible(true);
          hideAlert();
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setAlertData({
          title: "Internet Error",
          message: "Check Your internet and try again",
          type: "error",
        });

        setIsAlertVisible(true);
        hideAlert();
        setIsLoading(false)
      });

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
      generateOtp,isLoading,otp
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
