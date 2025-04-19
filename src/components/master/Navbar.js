import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../img/logo.png";

function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
    logout,
    decodeJwtToken,
    isUserLoggedIn,
  } = useContext(StateContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    type: "",
    picture:"",
  });
  const location = useLocation();

  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserDetails(decodeJwtToken());
      console.log(userDetails.picture)
      // getPictureUrl();
    }
  }, []);

  return (
    <>
      {!location.pathname.includes("/auth/") && (
        <nav className="h-fit w-full border-b border-gray flex items-center px-5 justify-between flex-wrap">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={logo} className="h-[70px] w-[82px]"alt="" />
            </Link>
            <Link
              to="/"
              className="hover:underline decoration-brandcolor decoration-2 underline-offset-4 mx-7"
            >
              {isUserLoggedIn() ? "Dashboard" : "Home"}
            </Link>
            {isUserLoggedIn() && userDetails.type === "postWork" ? (
              <>
                <div>
                  <button
                    onClick={() => setShowDropDown((prev) => !prev)}
                    className="relative flex items-center"
                  >
                    <p>My Work</p>
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <ul
                    role="menu"
                    hidden={!showDropDown}
                    className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
                  >
                    <li
                      onClick={() => {
                        navigate("/my-jobs");
                        setShowDropDown((prev) => !prev);
                      }}
                      role="menuitem"
                      className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                    >
                      <p className="ml-2">My Jobs</p>
                    </li>
                    <li
                      onClick={() => {
                        navigate("/my-orders");
                        setShowDropDown((prev) => !prev);
                      }}
                      role="menuitem"
                      className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                    >
                      <p className="ml-2">Orders</p>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              isUserLoggedIn() && (
                <>
                  <div>
                    <button
                      onClick={() => setShowDropDown((prev) => !prev)}
                      className="relative flex items-center"
                    >
                      <p>My business</p>
                      <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <ul
                      role="menu"
                      hidden={!showDropDown}
                      className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
                    >
                      <li
                        onClick={() => {
                          navigate("/my-profile");
                          setShowDropDown((prev) => !prev);
                        }}
                        role="menuitem"
                        className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                      >
                        <p className="ml-2">My profiles</p>
                      </li>
                      <li
                        onClick={() => {
                          navigate("/my-orders");
                          setShowDropDown((prev) => !prev);
                        }}
                        role="menuitem"
                        className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                      >
                        <p className="ml-2">Orders</p>
                      </li>
                      <li
                        onClick={() => {
                          navigate("/my-applied-jobs");
                          setShowDropDown((prev) => !prev);
                        }}
                        role="menuitem"
                        className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                      >
                        <p className="ml-2">Applied jobs</p>
                      </li>
                      <li
                        onClick={() => {
                          navigate("/analytics");
                          setShowDropDown((prev) => !prev);
                        }}
                        role="menuitem"
                        className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                      >
                        <p className="ml-2">Analytics</p>
                      </li>
                    </ul>
                  </div>
                </>
              )
            )}
          </div>

          <div
            className={`w-6/12 flex relative items-center ${
              location.pathname === "/" ? "hidden" : ""
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
            <button
              to={`/search/jobs/${searchQuery}`}
              onClick={() => {
                //handle search button click
                const params = new URLSearchParams();
                params.append("type", "jobs");
                params.append("query", searchQuery);

                navigate(`/search?${params.toString()}`);
              }}
              className={`absolute right-0 top-0 bottom-0 px-3 bg-black text-white h-full rounded-r flex items-center justify-center ${
                searchQuery.length === 0 ? "pointer-events-none" : ""
              }`}
            >
              Search
            </button>
          </div>

          <div className="flex items-center px-5 justify-between">
            {isUserLoggedIn() ? (
              <>
                <Link className="mr-6" to={"/message"}>
                  <i
                    className="fa-classic fa-envelope fa-xl"
                    style={{ color: "#42f5aa" }}
                  ></i>
                </Link>
                <div>
                  <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="h-[48px] w-[48px] rounded-full"
                  >
                    <img
                      className="rounded-full p-1"
                      src={`http://localhost:2000/${decodeJwtToken().picture}`}
                      alt="P"
                    />
                  </button>
                  <ul
                    role="menu"
                    hidden={!showProfileMenu}
                    className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none right-6"
                  >
                    <li
                      onClick={() => {
                        const params = new URLSearchParams();
                        params.append("type", "account");
                        navigate(`/settings?${params.toString()}`);
                      }}
                      role="menuitem"
                      className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                    >
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <p className="ml-2">Profile</p>
                    </li>
                    <li
                      onClick={() => {
                        logout();
                      }}
                      role="menuitem"
                      className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-red-500"
                    >
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                      <p className="ml-2 text-red-600">Logout</p>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
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
