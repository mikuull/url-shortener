"use client";
import React from "react";

const handleSubmit = (e: any) => {
  console.log("test1");
};

const UrlForm = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4 mt-80">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase">
          URL SHORTENER
        </h1>
        <form className="flex flex-col justify-center items-center space-y-4">
          <input
            type="text"
            placeholder="Paste the link"
            className="p-3 rounded-xl bg-[#4f4f4f] text-[#ffffff] placeholder-white"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-pink-600 p-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-800 hover:transition-all hover:ease-in-out"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UrlForm;
