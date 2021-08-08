import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";

function MapCard({ img, star, location, total }) {
  return (
    <div className="w-[250px] h-auto bg-white z-50 rounded-3xl p-0">
      <div className="relative h-40">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          //   className="rounded-t-xl"
        />
      </div>
      <div className="flex flex-col pl-2">
        <p className="flex items-center pt-2">
          <StarIcon className="h-5 text-red-400" />
          {star}
        </p>
        <p className="pt-2">{location}</p>
        <CurrencyFormat
          decimalScale={2}
          value={total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <p className="text-md  font-semibold pt-2">{value} AUD total</p>
          )}
        />
      </div>
    </div>
  );
}

export default MapCard;
