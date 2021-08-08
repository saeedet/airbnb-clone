import Image from "next/image";
import React from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";

function InfoCard({ img, location, title, description, star, price, total }) {
  return (
    <div className="flex py-7 pr-4 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t last:mb-10">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="text-gray-500">{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow xl:max-w-[400px]">
          {description}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <CurrencyFormat
              decimalScale={2}
              value={price * total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <p className="text-lg lg:text-xl font-semibold pb-2">
                  {value} AUD total
                </p>
              )}
            />

            <p className="text-right font-extralight">${price} / night</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
