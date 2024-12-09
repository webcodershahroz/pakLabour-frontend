import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateContext";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(StateContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
  });
  const location = useLocation();
  //function that chect if user is logged in or not
  const isUserLoggedIn = () => {
    let isLoggedIn = localStorage.getItem("token");
    return isLoggedIn === null ? false : true;
  };
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
    <>
      {!location.pathname.includes("/auth/") && (
        <nav className="h-20 w-full border-b border-gray flex items-center px-5 justify-between ">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold underline decoration-brandcolor decoration-4"
            >
              PakLabour
            </Link>
            <Link
              to="/"
              className="hover:underline decoration-brandcolor decoration-2 underline-offset-4 mx-7"
            >
              {isUserLoggedIn() ? "Dashboard" : "Home"}
            </Link>
            {isUserLoggedIn() && userDetails.type === "postWork" && (
              <Link
                to="/my-jobs"
                className="hover:underline decoration-brandcolor decoration-2 underline-offset-4 mr-7"
              >
                My jobs
              </Link>
            )}
          </div>
          <div
            className={`w-6/12 flex relative items-center ${
              location.pathname === "/" ? "invisible" : ""
            }`}
          >
            <input
              type="text"
              id="txtSearch"
              className="h-10 w-full outline-none px-2 rounded shadow-md "
              placeholder="Search work"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Link
              to={`/search/jobs/${searchQuery}`}
              className={`absolute right-0 top-0 bottom-0 px-3 bg-black text-white h-full rounded-r flex items-center justify-center ${
                searchQuery.length === 0 ? "pointer-events-none" : ""
              }`}
            >
              Search
            </Link>
          </div>

          <div className="flex items-center px-5 justify-between">
            {isUserLoggedIn() ? (
              <>
                <Link className="mr-6" to={"/message"}>
                  <i
                    className="fa-classic fa-envelope fa-xl"
                    style={{ color: "gray" }}
                  ></i>
                </Link>
                <button className="h-[48px] w-[48px] border-2 border-gray-200 rounded-full">
                  <img
                    className="rounded-full p-1"
                    src={require("../../img/profile-photo.jpg")}
                    alt=""
                  />
                </button>
              </>
            ) : (
              <>
                <div>
                  <Link
                    to="/workers"
                    className="hover:underline hover:decoration-brandcolor hover:decoration-2 underline-offset-4"
                  >
                    Workers
                  </Link>
                </div>
                <div className="mx-7">
                  <Link
                    to="/jobs"
                    className="hover:underline hover:decoration-brandcolor hover:decoration-2 underline-offset-4"
                  >
                    Jobs
                  </Link>
                </div>
                <div className="w-px h-7 bg-black"></div>
                <Link
                  className="ml-7 px-2.5 py-1.5 border-2 border-brandcolor rounded-lg font-bold text-brandcolor hover:bg-brandcolor hover:text-white"
                  to="/auth/signin"
                >
                  Sign in
                </Link>{" "}
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
