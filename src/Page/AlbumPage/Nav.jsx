import React, { useState } from "react";

const Nav = ({ onAngleChange, selectAngle, onYearChange, onGenreChange }) => {
  const [show, setShow] = useState(true);

  const nextPageHandler = () => {
    // window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    setShow(!show);
  };
  return (
    <div className="relative">
      <nav className="absolute top-0 flex items-center justify-between px-[40px] py-[20px] w-[100%] h-[80px] text-[14px] bg-[#242424] z-40">
        <div className="flex items-center gap-2">
          <div className="font-bold text-[18px] tracking-[1.5px]">
            TOP 100 ALBUMS BY YEARS
          </div>
          <select
            name=""
            id=""
            className={`text-[18px] bg-[#282828] focus:outline-none ${
              selectAngle === "years" ? "visible" : "hidden"
            }`}
            onChange={onYearChange}
          >
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
          </select>
        </div>
        <div
          className={`block w-[12px] h-[12px]  border-r-2  border-b-2 ${
            show === false ? "rotate-45" : "rotate-[-135deg]"
          } cursor-pointer`}
          onClick={nextPageHandler}
        ></div>
      </nav>
      <div
        className={`absolute top-[80px] left-0 flex flex-col justify-center items-center w-[100vw] h-[calc(100vh-80px)] text-[24px] bg-[#242424] opacity-[0.9] z-20 ${
          show === false && "hidden"
        } transition-transform duration-400`}
      >
        <p className="w-[40%]">
          To present the overview of music trend during these 23 years, this
          Album wall listing from top-left to bottom-right shows top 100 albums
          every years between 2000 to 2022. Please change the selection on the
          navigation to pick the year you are interested.
        </p>
      </div>
    </div>
  );
};

export default Nav;
