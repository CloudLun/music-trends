import React from "react";

import wave from "../../Image/music line for lun.svg";

const EndingPage = () => {
  return (
    <div className="relative flex justify-center items-center w-[100vw] h-[100vh] bg-[#242424]">
      <div className="relative w-[750px] font-semibold text-[24px] tracking-[1.5px] z-20">
        After this quick introduction, hope it could help you to find your own
        rhythm for modern music. If you would like to play more about
        visualization and look deeper into the album lists, please visit this
        website URL.
      </div>
      <img
        src={wave}
        alt=""
        className="absolute top-[35vh] left-0 opacity-[45%] z-10"
      />
    </div>
  );
};

export default EndingPage;
