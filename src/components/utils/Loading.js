import React from "react";

function Loading() {
  return (
    <>
      <div className="p-4 my-5 container flex flex-wrap gap-3">
        <div className="animate-pulse flex flex-col gap-3 p-5 hover:bg-stone-100 cursor-pointer rounded border border-stone-400 w-full xl:w-[49%]">
          <strong className="w-1/2 text-xl h-[20px] w-full bg-stone-300"></strong>
          <span className="bg-stone-300 w-[60px] h-[10px] rounded px-2"></span>
          <p className="h-[100px] w-full bg-stone-300"></p>
          <button className="bg-stone-300 rounded w-[50px] h-[20px] px-2 py-1 "></button>
        </div>
        <div className="animate-pulse flex flex-col gap-3 p-5 hover:bg-stone-100 cursor-pointer rounded border border-stone-400 w-full xl:w-[49%]">
          <strong className="w-1/2 text-xl h-[20px] w-full bg-stone-300"></strong>
          <span className="bg-stone-300 w-[60px] h-[10px] rounded px-2"></span>
          <p className="h-[100px] w-full bg-stone-300"></p>
          <button className="bg-stone-300 rounded w-[50px] h-[20px] px-2 py-1 "></button>
        </div>
      </div>
    </>
  );
}

export default Loading;
