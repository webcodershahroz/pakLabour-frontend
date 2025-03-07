import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Workers() {
  const [SearchResultWorkers, setSearchResultWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //function to get the workers
  const getWorkers = async () => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:2000/worker/get-workers`).then(async (res) => {
        const data = await res.json();
        setSearchResultWorkers(data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    //function call to getWorkers
    const callGetWorkers = async () => {
      await getWorkers();
    };

    callGetWorkers();
  }, []);
  return (
    <>
      <div className="container mx-auto mb-10 flex gap-4 flex-wrap">
        {SearchResultWorkers.map((worker) => {
          return (
            <button onClick={()=>{
              const params = new URLSearchParams();
              params.append('name',worker.workerName.toLowerCase())
              params.append('id',worker.userId)

              navigate(`/worker?${params.toString()}`)
              
            }} className=" flex flex-col gap-2 w-72 items-center border border-stone-400 rounded cursor-pointer hover:bg-stone-100">
              <div className="relative w-full">
                <img
                  src={`http://localhost:2000/${worker.workerPicture}`}
                  alt=""
                  className="h-52 w-full border-b border-stone-400"
                />
                <img
                  src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                  alt=""
                  className="h-20 w-20 rounded-full absolute right-[36%] -bottom-10"
                />
              </div>
              <strong className="font-bold mt-8"> {worker.workerName} </strong>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p className="ms-2 text-sm font-bold text-black">5.0</p>
                <span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
                <p className="text-sm font-medium text-black">115 reviews</p>
              </div>
              <p className="text-justify p-2">
                {worker.workerDescription}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Workers;
