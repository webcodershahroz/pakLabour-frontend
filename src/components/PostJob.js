import React, { useContext, useState } from "react";
import Alert from "../components/utils/Alert";
import { StateContext } from "../context/StateContext";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [pictureUrl, setPictureUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    price: "",
    searchTags: "",
  });

  //handle text input change
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
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

  //funtion to post job
  const postJob = async () => {
    setIsLoading(true);
    const userId = await decodeJwtToken()._id;
    console.log(userId);
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("title", jobData.title);
    formData.append("description", jobData.description);
    formData.append("price", jobData.price);
    formData.append("searchTags", jobData.searchTags);

    if (pictureUrl) formData.append("picture", pictureUrl);

    try {
      fetch("http://localhost:2000/job/post-job", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (res.status === 201) {
          setAlertData({
            title: "Success",
            message: "Job Posted Successfully",
            type: "success",
          });
          setIsAlertVisible(true);
          hideAlert();
          navigate('/my-jobs');
        } else {
          setAlertData({
            title: "Error",
            message: "There is error posting your job",
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

  //function to handle post button click
  const handlePostButtonClick = async () => {
    if (
      jobData.title.length > 0 &&
      jobData.description.length > 0 &&
      jobData.searchTags.length > 0 
      
    ){
      if(jobData.price.length > 3)
        await postJob();
      else{
        setAlertData({
          title: "Price Limit",
          message: "Price must be greater than or equal to 1000",
          type: "warning",
        });
        setIsAlertVisible(true);
        hideAlert();
      }
      }
      
    
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

      <strong className="font-bold text-4xl mb-7 block ml-10">
        Post a job
      </strong>
      <div className="border border-gray mx-8 rounded px-10 py-2">
        <div className="pb-2 flex justify-start items-baseline flex-wrap">
          <div className="xl:w-1/3 md:w-1/3">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Enter Job details
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Fill all the field carefully...
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 xl:w-2/3">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input  maxlength="50"
                    onChange={handleTextInputChange}
                    type="text"
                    name="title"
                    id="title"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Title of your job"
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
                <textarea maxLength="300"
                  onChange={handleTextInputChange}
                  name="description"
                  id="description"
                  rows="3"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brandcolor sm:text-sm/6"
                ></textarea>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Write about your job</p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="Price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    type="number"
                    name="price"
                    id="price"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    placeholder="Price : Rs 1000"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="tags"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Search Tags
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brandcolor">
                  <input
                    onChange={handleTextInputChange}
                    placeholder="Tag1,Tag2,Tag3 Tag3,Tag4"
                    type="text"
                    name="searchTags"
                    id="searchTags"
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
                Work Photo
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
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            onClick={handlePostButtonClick}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandcolor ${
              isLoading ? "cursor-not-allowed bg-gray-400" : "bg-brandcolor"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default PostJob;
