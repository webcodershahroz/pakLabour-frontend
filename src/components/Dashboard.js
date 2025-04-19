import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { StateContext } from "../context/StateContext";

function Dashboard() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
  });
  const {decodeJwtToken  } = useContext(StateContext);

  const updateLastActive = async () => {
    try {
      const userId = await decodeJwtToken()._id; // Decode user ID from JWT token
      const payload = { user: userId };
  
      const res = await fetch("http://localhost:2000/review/update-lastActive", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        console.log("Last active updated successfully:", data);
      } else {
        console.error("Error updating last active:", data.message);
      }
    } catch (error) {
      console.error("Error in updateLastActive:", error.message);
    }
  };
  

  useEffect(() => {
    const jwtData = decodeJwtToken()
    setUserDetails(jwtData);
    console.log(jwtData._id)
    if(jwtData.type === "worker"){
      updateLastActive()
    }  
  }, []);
  return (
    <div className="h-[70vh] mb-14">
      <div
        className={`relative h-[10rem] w-12/12 bg-brandcolor flex flex-col items-start justify-start bg-gradient-to-r from-brandcolor from-10% via-emerald-400 via-30% to-emerald-500 to-90% gap-y-14 px-10 py-10 mb-20`}
      >
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Welcome, {userDetails.name}
        </h1>
        <div className="w-full flex items-center justify-center absolute -bottom-10">
          {userDetails.type === "postWork" ? (
            <div className="flex justify-evenly items-center w-[50%] bg-white drop-shadow-xl rounded py-5 flex-wrap">
              <p className="text-2xl font-medium">Post your job here</p>
              <Link
                to={"/post-job"}
                className="bg-black rounded text-white px-6 py-3 "
              >
                Post a job
              </Link>
            </div>
          ) : (
            <div className="flex justify-evenly items-center w-[50%] bg-white drop-shadow-xl rounded py-5 flex-wrap">
              <p className="text-2xl font-medium">Create a worker profile</p>
              <Link
                to={"/create-worker-profile"}
                className="bg-black rounded text-white px-6 py-3 "
              >
                Create now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
