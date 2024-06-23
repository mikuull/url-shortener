"use client";
import React, { useState, useEffect } from "react";

interface Params {
  params: {
    slug: string;
  };
}

const AnalyticsPage = ({ params }: Params) => {
  const { slug: code } = params;
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!code) {
        setError("Invalid code!");
        return;
      }

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = new URL(`/api/analytic/${code}`, baseUrl);
        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`Failed to fetch analytics data for code: ${code}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Error fetching analytics data");
      }
    };

    fetchData();
  }, [code]);

  if (error) {
    return <div>{error}</div>;
  }

  if (data) {
    return (
      <>
        <div className="flex items-center justify-center">
          <div className="p-80">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 uppercase mb-4">
              LINK ANALYTICS
            </h1>
            <h1>
              Clicked:{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {data.data.clicked}
              </span>
            </h1>
            <h1>
              Original URL:{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {data.data.url.originalUrl}
              </span>
            </h1>
            <h1>
              Short URL:{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {data.data.url.shortUrl}
              </span>
            </h1>
            <h1>
              Code:{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {data.data.url.code}
              </span>
            </h1>
          </div>
        </div>
      </>
    );
  }

  return <div>Loading...</div>;
};

export default AnalyticsPage;
