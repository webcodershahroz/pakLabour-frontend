import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
function Dashboard() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
  });

  //decode jwt token from localstorage
  const decodeJwtToken = () => {
    const token = localStorage.getItem("token");
    const data = jwtDecode(token);
    return data.user;
  };
  useEffect(() => {
    setUserDetails(decodeJwtToken());
  }, []);
  return (
    <div className="h-[70vh] mb-14">
      <div
        className={`relative h-[10rem] w-12/12 bg-brandcolor flex flex-col items-start justify-start bg-gradient-to-r from-brandcolor from-10% via-emerald-400 via-30% to-emerald-500 to-90% gap-y-14 px-10 py-10 mb-20`}
      >
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Welcome, {userDetails.name}
        </h1>
        <div className="w-full flex items-center justify-center absolute -bottom-9">
          {userDetails.type === "postWork" &&
              <div  className="flex justify-evenly items-center w-[50%] bg-white drop-shadow-xl rounded py-5 ">
                <p className="text-2xl font-medium">Post your job here</p>
                <Link
                  to={"/post-job"}
                  className="bg-black rounded text-white px-6 py-3 "
                >
                  Post a job
                </Link>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
