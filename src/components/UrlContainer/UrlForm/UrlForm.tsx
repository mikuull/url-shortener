"use client";
import Link from "next/link";
import React, { useState } from "react";

const UrlForm = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlInput = e.currentTarget.elements[0] as HTMLInputElement;
    const url = urlInput.value;

    console.log("Submitting URL:", url);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setErrorMessage(`Server error: ${response.status}`);
        setAlertMessage("");
      } else if (data.data === null) {
        setErrorMessage(data.error.message);
        setAlertMessage("");
      } else {
        setCode(data.data.code);
        setAlertMessage(data.data.shortUrl);
        setErrorMessage("");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("An error occurred");
      setAlertMessage("");
    }
  };

  return (
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

      {alertMessage && (
        <div className="flex flex-col items-center space-y-4">
          <div className="mt-4 p-3 bg-green-700 text-white rounded-xl">
            Twoj nowy link:
            <span className="font-semibold"> {alertMessage}</span>
          </div>
          <Link
            href={`/analytics/${code}`}
            className="bg-gradient-to-r from-purple-400 to-pink-600 p-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-800 hover:transition-all hover:ease-in-out max-w-60"
          >
            Przejdź do statystyk
          </Link>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-700 text-white rounded-xl">
          Blad:
          <span className="font-semibold"> {errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
