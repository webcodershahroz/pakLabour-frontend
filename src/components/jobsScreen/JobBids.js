import React from "react";
import { useSearchParams } from "react-router-dom";
import myPic from "../../img/profile-photo.jpg";

function JobBids() {
  const [params] = useSearchParams();
  const jobTitle = params.get("title");
  return (
    <>
      <div className="container mx-auto h-fit my-4">
        <h1 className="font-bold text-3xl my-6">{jobTitle}</h1>
        <div className="flex flex-wrap gap-3">
          <button className="flex flex-col p-5 hover:bg-stone-100 cursor-pointer rounded border border-stone-400 xl:w-[49%] h-fit">
            <div className="flex gap-3">
              <img src={myPic} height={100} width={100} alt="" />
              <div className="flex flex-col items-start">
                <p className="text-sm text-gray-600">Dina, Jhelum, Pakistan</p>
                <strong className="text-2xl font-medium text-gray-700">
                  Muhammad Shahroz Shahzad
                </strong>
                <span className="text-gray-500 font-bold">
                  PKR 30000{" "}
                  <span className="text-sm font-normal">in 30 days</span>
                </span>
                <div className="flex">
                  <span className=" w-[fit-content] rounded-full py-1 mr-3 text-gray-700">
                    <strong>Electrition</strong>
                  </span>
                  <span className=" w-[fit-content] rounded-full py-1 mr-3 text-gray-700">
                    <strong>Electrical Engineer</strong>
                  </span>
                  <span className=" w-[fit-content] rounded-full py-1 mr-3 text-gray-700">
                    <strong>Engineer</strong>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-justify my-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
                quos praesentium obcaecati error dolore. Enim recusandae officia
                aut odio labore. Libero repellat haru
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default JobBids;
