import React from "react";

import wave from "../../Image/music line for lun.svg"

const LandingPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-start p-[120px] w-[100vw] h-[100vh] bg-[#242424]">
        <h1 className="relative mb-[40px] font-bold text-[100px] uppercase tracking-[6px] leading-[1.2] z-20">Post-Millennium <br/> Soundscape</h1>
        <h2 className="font-regular text-[18px] tracking-[1.5px]">Visualizing the music trends of the 21st Century</h2>
        <h2 className="font-regular text-[18px] tracking-[1.5px]">Hao Lun Hung</h2>
        <img src={wave} alt="" className="absolute top-[35vh] left-0 opacity-[45%] z-10" />
    </div>
  );
};

export default LandingPage;
