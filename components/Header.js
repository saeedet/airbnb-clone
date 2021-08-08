import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  GlobeAltIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import { ScaleControl } from "react-map-gl";

function Header({ placeholder, searchHeader }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const router = useRouter();
  const [pageY, setPageY] = useState(() => searchHeader && 1);
  const [searchIconDeg, setSearchIconDeg] = useState();

  const scrollHandler = () => {
    if (window.pageYOffset === 0 && searchHeader) {
      setPageY(1);
    } else if (window.pageYOffset < 40) {
      setPageY(window.pageYOffset);
    }
    if (window.pageYOffset < 1100) {
      setSearchIconDeg(window.pageYOffset);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const searchHandler = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuest: numberOfGuest,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const selectHandler = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <header
      className={`sticky mb-[-100px] top-0 z-50 grid grid-cols-3 bg-rgba(255,255,255,0.72)  py-4 md:px-20 transition duration-100 ${
        pageY && "bg-custom-blur shadow-md"
      }`}
    >
      {/* Logo */}

      <div
        onClick={() => router.push("/")}
        className="hidden md:flex relative  items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src={pageY ? "/red_logo.png" : "/white_logo.png"}
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Search */}

      <div
        className={`flex items-center md:border-2 md:shadow-md rounded-full py-2 w-screen md:w-auto bg-white transition duration-100 ${
          pageY && "header__searchSwitch"
        }`}
        style={{
          transform: `Scale(${1 - pageY / 1000})`,
        }}
      >
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type="text"
          placeholder={placeholder || "Start your search"}
          className="pl-5 bg-transparent outline-none flex-grow text-sm font-semibold text-gray-600 placeholder-gray-600"
        />
        <SearchIcon
          className="md:mx-2 hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer"
          style={{ transform: `rotate(${searchIconDeg / 10}deg)` }}
        />
      </div>

      {/* Right section */}

      <div
        className={`hidden md:flex items-center space-x-4 justify-end text-white font-semibold transition duration-100 ${
          pageY && "header__onTopText"
        }`}
      >
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div
          className={`flex items-center space-x-2 cursor-pointer border-2 p-2 rounded-full text-gray-500 bg-white transition duration-100 ${
            pageY && "header__menuSwitch"
          }`}
        >
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="absolute top-[75px] left-1/2 transform -translate-x-1/2 flex flex-col col-span-3 mx-auto bg-white p-5 rounded-3xl shadow-2xl mt-3">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={selectHandler}
          />
          <div className="flex items-center border-b pb-1 mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500 hover:bg-red-400 py-1 rounded-xl shadow-sm transition duration-100"
              onClick={() => setSearchInput("")}
            >
              Cancel
            </button>
            <button
              className="flex-grow text-red-400 hover:text-white hover:bg-red-400 py-1 rounded-xl shadow-sm transition duration-100"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
