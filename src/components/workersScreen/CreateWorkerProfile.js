import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import Alert from "../utils/Alert";

function CreateWorkerProfile() {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const {
    isAlertVisible,
    setIsAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    decodeJwtToken,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);

  //job states
  const [workerProfileData, setWorkerProfileData] = useState({
    workerName: decodeJwtToken().name,
    workerTagline: "",
    workerDescription: "",
    workerLocation: "",
    workerCategory: "",
    workerPhoneno:""
  });

  //handle text input change
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setWorkerProfileData({ ...workerProfileData, [name]: value });
  };

   //handle file input change
   const handleFileInputChange = (e) => {
    setPictureUrl(e.target.files[0]);
    try {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
    } catch (error) {
      console.log(error.message)
    }
  };

  //funtion to hire worker
  const createWorkerProfile = async () => {
    setIsLoading(true);
  
    try {
      const userId = await decodeJwtToken()._id;
      const formData = new FormData();
      formData.append("user", userId);
      formData.append("workerAnalytics", userId);
      formData.append("workerTagline", workerProfileData.workerTagline);
      formData.append("workerDescription", workerProfileData.workerDescription);
      formData.append("workerLocation", workerProfileData.workerLocation);
      formData.append("workerCategory", workerProfileData.workerCategory);
      formData.append("workerPhoneno", workerProfileData.workerPhoneno);
  
      if (pictureUrl) formData.append("picture", pictureUrl);
  
      const res = await fetch("http://localhost:2000/worker/create-worker-profile", {
        method: "POST",
        body: formData,
      });
  
      if (res.status === 201) {
        setAlertData({
          title: "Success",
          message: "Profile Created Successfully",
          type: "success",
        });
        setIsAlertVisible(true);
        hideAlert();
        navigate('/my-profile');
      } else {
        const data = await res.json();
        setAlertData({
          title: "Error",
          message: "There is an error creating worker profile: " + (data.error || ""),
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
    } catch (error) {
      setAlertData({
        title: "Internet error",
        message: "Check your internet connection and try again: " + error.message,
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
    } finally {
      setIsLoading(false);
    }
  };
  

  //function to handle post button click
  const handleCreateProfileButtonClick = async () => {
    if (
      workerProfileData.workerTagline.length > 0 &&
      workerProfileData.workerDescription.length > 0 &&
      workerProfileData.workerLocation.length > 0 &&
      workerProfileData.workerCategory.length > 0 &&
      workerProfileData.workerPhoneno.length > 0
    ) await createWorkerProfile();
    else {
      setAlertData({
        title: "Empty Fields",
        message: "Please fill all the fields ",
        type: "warning",
      });
      setIsAlertVisible(true);
      hideAlert();
    }
  };
  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}

      <strong className="font-bold text-4xl my-7 block ml-10">
        Create a Worker Profile
      </strong>
      <div className="border border-gray mx-8 rounded px-10 py-2">
        <div className="pb-2 flex justify-start items-baseline flex-wrap">
          <div className="xl:w-1/3 md:w-1/3">
            {/* <h2 className="font-bold text-3xl mt-7 mb-4"></h2> */}
            <h2 className="text-base/7 font-semibold text-gray-900">
              Enter required details
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Fill all the field carefully...
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 xl:w-2/3">
            <div className="sm:col-span-4">
              <label
                htmlFor="tagline"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Tagline
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    maxlength="50"
                    onChange={handleTextInputChange}
                    type="text"
                    name="workerTagline"
                    id="tagline"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Tagline that describe your business"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  maxLength="300"
                  onChange={handleTextInputChange}
                  name="workerDescription"
                  id="description"
                  rows="3"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brandcolor sm:text-sm/6"
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write about your skills related to job
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Phone no.
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    type="tel"
                    name="workerPhoneno"
                    id="phoneno"
                    pattern="[0-9]{4}-[0-9]{7}"
                    required
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="0349-5898836"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    type="text"
                    name="workerLocation"
                    id="location"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Pakistan"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="start-time"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 w-1/2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    placeholder="Electrition"
                    type="text"
                    name="workerCategory"
                    id="category"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Profile view Photo
              </label>
              <input
                onChange={handleFileInputChange}
                id="file-upload"
                name="file-upload"
                type="file"
              />
            </div>
            <div>
              {previewUrl?<img src={previewUrl} height={200} width={200} alt="d" />:''}
              
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProfileButtonClick}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandcolor ${
              isLoading ? "cursor-not-allowed bg-gray-400" : "bg-brandcolor"
            }`}
          >
            Create profile
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateWorkerProfile;
