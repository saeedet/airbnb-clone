import React from "react";
import Image from "next/image";

function LargeCard({ img, title, description, buttonText, subTitle, theme }) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-[400px] md:h-[500px] min-w-full">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />

        <div className="absolute top-[30px] md:top-1/2 md:-translate-y-1/2 md:left-20 md:w-[350px] text-center md:text-left">
          <h3
            className={`${title && "text-5xl text-white font-semibold mb-3 "} ${
              subTitle && "text-3xl  md:text-4xl font-bold md:font-medium"
            }`}
          >
            {title || subTitle}
          </h3>
          <p className="text-xl text-white ">{description}</p>

          <button
            className={`text-sm font-semibold px-5 py-3 rounded-lg mt-5 hover:shadow-xl active:scale-95 transition duration-150  ${
              title ? "text-black bg-white" : "text-white bg-gray-900"
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

export default LargeCard;
