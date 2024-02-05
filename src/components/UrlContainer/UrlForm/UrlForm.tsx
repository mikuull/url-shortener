"use client";
import React from "react";

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${e.target[0].value}`,
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const UrlForm = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4 mt-80">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase">
          URL SHORTENER
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-4"
        >
          <input
            type="text"
            placeholder="Paste the link"
            className="p-3 rounded-xl bg-[#4f4f4f] text-[#ffffff] placeholder-white"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-pink-600 p-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-800 hover:transition-all hover:ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UrlForm;
