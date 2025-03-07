import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";

function ProfileSettings() {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
    const userId = await decodeJwtToken()._id;
    const formData = new FormData();
    formData.append("userId", userId);
    if (pictureUrl) formData.append("picture", pictureUrl);
    console.log(pictureUrl);
    try {
      fetch("http://localhost:2000/auth/upload-picture", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (res.status === 201) {
          const data = await res.json();
          setAlertData({
            title: "Success",
            message: "Picture updated successfully",
            type: "success",
          });
          setIsAlertVisible(true);
          hideAlert();
          updateLocalStorage(data);
        } else {
          setAlertData({
            title: "Error",
            message: "There is error updating your picture",
            type: "error",
          });
          setIsAlertVisible(true);
          hideAlert();
        }
        setIsLoading(false);
      });
    } catch (error) {
      setAlertData({
        title: "Internet error",
        message: "Check your internet error and try again",
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
      setIsLoading(false);
    }
  };

  //update localstorage with new picture url
  const updateLocalStorage = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
  };

  //handle file input change
  const handleFileInputChange = (e) => {
    setIsUpdating(true)
    setPictureUrl(e.target.files[0]);
    try {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPictureUrl = async () => {
    const picture = await decodeJwtToken().picture;
    setPictureUrl(picture)
  };
  useEffect(() => {
    //get picture url from local stroage
    getPictureUrl();

  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <div class="p-2 md:p-4 relative">
        <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 class="pl-6 text-2xl font-bold sm:text-xl">Account</h2>

          <div class="grid max-w-2xl mx-auto mt-8">
            <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                class="object-contain w-40 h-40 p-1 rounded-full ring-2 ring-brandcolor"
                src={isUpdating?previewUrl:`http://localhost:2000/${pictureUrl}`}
                alt=""
              />

              <div class="flex flex-col space-y-5 sm:ml-8 ">
                <div>
                  <p className="font-bold text-2xl">Muhammad Shahroz Shahzad</p>
                  <p>shahrozshahzad17@gmail.com</p>
                </div>
                <input onChange={handleFileInputChange} type="file"></input>
                <button
                  onClick={handleChangePictureButtonClick}
                  class={`text-white  font-medium rounded-lg px-5 py-2.5 absolute right-5 bottom-4  
                    ${
                      isLoading || !isUpdating ? "cursor-not-allowed bg-gray-400" : "bg-black"
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
