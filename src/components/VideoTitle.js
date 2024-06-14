import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="mt-6 line-clamp-4 text-lg w-1/4">{overview}</p>
      <div className="pt-5">
        <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-90">
        <FontAwesomeIcon icon={faPlay} /> Play
        </button>
        <button className="mx-5 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
        <FontAwesomeIcon icon={faCircleInfo} /> More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
