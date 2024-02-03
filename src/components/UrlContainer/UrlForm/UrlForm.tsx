import Button from "@/components/Button";
import React from "react";

const UrlForm = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase">
          URL SHORTENER
        </h1>
        <form className="flex flex-col justify-center items-center space-y-4">
          <input
            type="text"
            placeholder="Paste the link"
            className="p-3 rounded-xl bg-[#4f4f4f] text-[#ffffff] placeholder-white"
          />
          <Button
            href="/"
            title="Submit"
            property="bg-gradient-to-r from-purple-400 to-pink-600"
          />
        </form>
      </div>
    </>
  );
};

export default UrlForm;
