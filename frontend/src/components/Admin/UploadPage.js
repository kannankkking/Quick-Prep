import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("E-books");
  const [course, setCourse] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "Subject E-books" && !course) {
      alert("Please select a course for Subject E-books.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("course", course);
    formData.append("thumbnail", thumbnail);
    formData.append("pdf", pdf);

    try {
      const response = await axios.post("http://localhost:5000/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Upload successful!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/admin-dashboard");
      }, 3000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.response?.data?.error || "Upload failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[1200px] bg-white p-8 shadow-lg rounded-lg">
        <h1 className="font-bold text-2xl text-center mb-6 text-blue-600">
          UPLOAD
        </h1>
        {successMessage && (
          <div
            className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-md shadow-lg flex items-center space-x-2 animate__animated animate__fadeIn animate__delay-1s"
          >
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="E-books">E-books</option>
            <option value="Cheat sheets">Cheat sheets</option>
            <option value="Subject E-books">Subject E-books</option>
            <option value="Interview Questions">Interview Questions</option>
          </select>

          {category === "Subject E-books" && (
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="w-full p-4 rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
            </select>
          )}

          <div className="flex justify-center">
            <label className="flex items-center justify-center cursor-pointer bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-lg border-2 border-blue-300 rounded-full transition-all duration-300 hover:bg-blue-600 hover:shadow-2xl hover:border-blue-400 px-5 py-2 text-gray-800 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2 drop-shadow-md"
              >
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path
                  d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z"
                ></path>
              </svg>
              Upload Thumbnail
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
                className="hidden"
              />
            </label>
          </div>

          {thumbnailPreview && (
            <div className="flex justify-center mt-4">
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-72 h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="flex justify-center">
            <label className="flex items-center justify-center cursor-pointer bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-lg border-2 border-blue-300 rounded-full transition-all duration-300 hover:bg-blue-600 hover:shadow-2xl hover:border-blue-400 px-5 py-2 text-gray-800 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2 drop-shadow-md"
              >
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path
                  d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z"
                ></path>
              </svg>
              Upload PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                required
                className="hidden "
              />
            </label>
          </div>

          <div className="flex justify-center">
            <button className="relative px-4 py-2 rounded-full bg-gray-200 text-gray-900 font-extrabold text-lg shadow-lg transition-all overflow-hidden hover:text-gray-200 group">
              <span className="absolute inset-0 w-0 h-full bg-gray-900 rounded-lg shadow-lg transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10">Upload</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
