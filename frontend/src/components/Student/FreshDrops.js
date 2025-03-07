import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const UserView = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/content");

      const sortedContent = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setContent(sortedContent);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Fresh Drops</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {content.map((item) => (
            <div
              key={item._id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${item.filePathVideo ? "lg:w-full" : "w-full"
                }`}
            >
              <div className="p-6">
                {item.textContent && (
                  <p className="text-gray-700 text-lg mb-4">{item.textContent}</p>
                )}
                {item.filePathImage && (
                  <img
                    src={`http://localhost:5000${item.filePathImage}`}
                    alt="Uploaded"
                    className="w-full h-64 object-contain rounded-lg mb-4"
                  />
                )}
                {item.filePathAudio && (
                  <div className="mb-4">
                    <audio controls className="w-full">
                      <source src={`http://localhost:5000${item.filePathAudio}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {item.filePathVideo && (
                  <div className="mb-4">

                    <video
                      controls
                      className="w-full h-96 object-cover rounded-lg"
                    >
                      <source src={`http://localhost:5000${item.filePathVideo}`} type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  </div>
                )}
                <p className="text-sm text-blue-500">
                  Uploaded on: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserView;
