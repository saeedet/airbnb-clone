import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function Banner() {
  const router = useRouter();

  const clickHandler = () => {
    const startDate = new Date();
    router.push({
      pathname: "/search",
      query: {
        location: "Sydney",
        startDate: startDate.toISOString(),
        endDate: startDate.toISOString(),
        numberOfGuest: 1,
      },
    });
  };

  return (
    <div className="relative h-[400px] md:h-[600px] text-center">
      <Image
        src="https://a0.muscache.com/im/pictures/e4a2a61c-589f-4e49-b3b8-968a6bc23389.jpg?im_w=2560"
        layout="fill"
        objectFit="cover"
      />

      <div className=" absolute top-20 md:top-48 w-full md:text-left md:pl-[80px]">
        <p className=" pt-5 pb-2 md:py-5 text-white text-[25px] md:text-[55px] font-bold md:w-[350px] md:leading-[50px] leading-7">
          Olympian & Paralympian Online Experiences
        </p>
        <button
          onClick={clickHandler}
          className="text-black bg-white px-8 py-2 shadow-md rounded-lg font-bold my-3 hover:shadow-xl active:scale-95 transition duration-150 hover:bg-red-400"
        >
          Explore now
        </button>
      </div>
    </div>
  );
}

export default Banner;
