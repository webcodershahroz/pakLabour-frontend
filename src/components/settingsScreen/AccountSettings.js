import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";

function ProfileSettings() {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name:"",
    email:""
  })
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);
  //function to update picture
  const handleChangePictureButtonClick = async () => {
    setIsLoading(true);
    try {
      const userId = await decodeJwtToken()._id;
      const formData = new FormData();
      formData.append("userId", userId);
      if (pictureUrl) formData.append("picture", pictureUrl);
  
      console.log("Uploading picture:", pictureUrl);
  
      const res = await fetch("https://paklabour-backend.vercel.app/auth/upload-picture", {
        method: "POST",
        body: formData,
      });
  
      if (res.status === 201) {
        const data = await res.json();
  
        // Update localStorage with new token (including updated picture)
        localStorage.setItem("token", JSON.stringify(data));
  
        setAlertData({
          title: "Success",
          message: "Picture updated successfully",
          type: "success",
        });
      } else {
        setAlertData({
          title: "Error",
          message: "There was an error updating your picture",
          type: "error",
        });
      }
  
      setIsAlertVisible(true);
      hideAlert();
  
    } catch (error) {
      console.error("Upload picture error:", error.message);
      setAlertData({
        title: "Internet Error",
        message: "Check your internet connection and try again",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };
  

  //handle file input change
  const handleFileInputChange = (e) => {
    setIsUpdating(true);
    setPictureUrl(e.target.files[0]);
    try {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPictureUrl = async () => {
    const picture = await decodeJwtToken().picture;
    setPictureUrl(picture);
  };
  useEffect(() => {
    //get picture url from local stroage
    const jwtData = decodeJwtToken();
    setUserDetails(jwtData)
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <div className="p-2 md:p-4 relative">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Account</h2>

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-contain w-40 h-40 p-1 rounded-full ring-2 ring-brandcolor"
                src={
                  isUpdating
                    ? previewUrl
                    : `https://paklabour-backend.vercel.app/${userDetails.picture}`
                }
                alt=""
              />

              <div className="flex flex-col space-y-5 sm:ml-8 ">
                <div>
                  <p className="font-bold text-2xl">{userDetails.name}</p>
                  <p>{userDetails.email}</p>
                </div>
                <input onChange={handleFileInputChange} type="file"></input>
                <button
                  onClick={handleChangePictureButtonClick}
                  className={`text-white  font-medium rounded-lg px-5 py-2.5 absolute right-5 bottom-4  
                    ${
                      isLoading || !isUpdating
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-black"
                    }`}
                  disabled={isLoading || !isUpdating}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
