import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuest } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const totalDays =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 3600 * 24) || 1;

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuest} guests`}
        searchHeader={true}
      />
      <main className="flex mt-[100px]">
        <section className=" flex-grow pt-14 px-6">
          <p className="text-xs">
            <span className="border-b-2 py-1">300+ Stays</span> -{" "}
            <span className="span">{range}</span> -{" "}
            <span className="span">{numberOfGuest} Guest</span> -{" "}
            <span className="span">
              {totalDays} Night{totalDays > 1 && "s"}
            </span>
          </p>

          <h1 className="text-3xl font-semibold mt-6 mb-6">
            Stays in {location}
          </h1>

          <div className="flex lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price }) => (
                <InfoCard
                  key={Math.random()}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={totalDays}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden sticky top-[85px] xl:inline-flex xl:min-w-[600px] h-screen">
          <Map searchResults={searchResults} totalDays={totalDays} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://jsonkeeper.com/b/RV0L").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
