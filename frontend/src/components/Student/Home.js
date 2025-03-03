import front from "../../images/front.jpg";
import front1 from "../../images/front1.jpg";
import front2 from "../../images/front2.jpg";
import front3 from "../../images/front3.jpg";
import front4 from "../../images/front4.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Student/Navbar";
import { useNavigate } from "react-router-dom";
import slide from "../../images/slide.webp";
import slide1 from "../../images/slide1.webp";
import slide2 from "../../images/slide2.jpg";
import slide3 from "../../images/slide3.jpg";
import React, { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const topCarouselImages = [front, front1, front2, front3, front4];

  const sections = [
    {
      title: "E-Books",
      route: "/ebooks",
      slides: [slide],
    },
    {
      title: "Cheat Sheets",
      route: "/cheatsheets",
      slides: [slide1],
    },
    {
      title: "Subject E-Books",
      route: "/subjectebooks",
      slides: [slide2],
    },
    {
      title: "Interview Questions",
      route: "/interviewquestions",
      slides: [slide3],
    },
  ];

  const handleNextSection = () => {
    const nextIndex = (activeSectionIndex + 1) % sections.length;
    setActiveSectionIndex(nextIndex);
  };

  const handlePrevSection = () => {
    const prevIndex =
      (activeSectionIndex - 1 + sections.length) % sections.length;
    setActiveSectionIndex(prevIndex);
  };

  return (
    <div>
      <Navbar />
      <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          dynamicHeight={false}>
          {topCarouselImages.map((image, index) => (
            <div key={index} className="h-[300px] sm:h-[400px] lg:h-[600px]">
              <img
                src={image}
                alt={`Top Slide ${index}`}
                className="object-fit w-full h-full"
              />
            </div>
          ))}
        </Carousel>
      </div>


      <div className="flex flex-col lg:flex-row items-center justify-between h-full lg:h-screen bg-white">
        <div className="flex flex-col items-center lg:items-start justify-center px-6 py-4 lg:px-28 lg:py-12 w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold mb-6 text-gray-900">
            {sections[activeSectionIndex].title}
          </h1>
          <button
            onClick={() => navigate(sections[activeSectionIndex].route)}
            className="bg-purple-600 text-white text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Explore {sections[activeSectionIndex].title} &rarr;
          </button>
          <div className="flex justify-center items-center mt-8 space-x-4 sm:space-x-10">
            <button
              onClick={handlePrevSection}
              className="bg-white border border-gray-300 text-gray-600 rounded-full px-6 py-2 shadow hover:shadow-lg focus:outline-none text-3xl"
            >
              &#x2039;
            </button>
            <button
              onClick={handleNextSection}
              className="bg-white border border-gray-300 text-gray-600 rounded-full px-6 py-2 text-center shadow hover:shadow-lg focus:outline-none text-3xl"
            >
              &#x203a;
            </button>
          </div>
        </div>


        <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 py-4 lg:p-12">
          <Carousel
            key={activeSectionIndex}
            autoPlay={false}
            infiniteLoop={true}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            dynamicHeight={false}
            className="w-full object-fit"
          >
            {sections[activeSectionIndex].slides.map((image, index) => (
              <div
                key={index}
                className="h-[300px] sm:h-[400px] lg:h-[500px]"
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="object-fill w-full h-full rounded-lg shadow-lg"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
