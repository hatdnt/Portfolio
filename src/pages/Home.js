import React from "react";
import services from "../utils/services";
import ChatDrawer from "../components/ChatDrawer";

export default function Home() {
  const [isActive, setIsActive] = React.useState("website development");
  const setActive = (name) => {
    setIsActive(name);
  };
  const filterService =
    isActive === "All"
      ? services
      : services.filter((service) => service.tag === isActive);
  const tags = [
    { id: 6, name: "All" },
    { id: 1, name: "website development" },
    { id: 2, name: "logo" },
    { id: 3, name: "internet of things" },
    { id: 4, name: "data analyst" },
  ];
  return (
    <main>
      <div className="flex p-12 justify-center text-white text-center bg-purple-500">
        <div>
          <ChatDrawer />
          <h1 className="text-3xl font-semibold ">
            Hello guys, welcome to Dikraf{" "}
            <span className="text-green-300">Digital Product Solutions</span>
          </h1>
          <p className="text-lg my-4">
            Best Digital Agency for solve your bussiness problem
          </p>
          <input
            type="text"
            placeholder="Search Services"
            className="py-2 w-1/2 px-4 rounded-full"
          />
        </div>
      </div>
      <div className="p-12">
        <ul className="flex flex-wrap justify-center">
          {tags.map((tag) => (
            <li
              key={tag.id}
              onClick={() => setActive(tag.name)}
              className={`p-2 text-sm lg:text-base lg:p-4 rounded-lg mx-1 hover:cursor-pointer ${
                tag.name === isActive
                  ? "text-white bg-green-300 "
                  : "text-green-600 border border-green-300"
              }`}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
      <div className=" px-12">
        <ul className="flex flex-wrap justify-center">
          {filterService.map((service) => (
            <li
              key={service.id}
              onClick={() => setActive(service.id)}
              className={` rounded w-full lg:w-auto shadow text-sm lg:text-base mb-2  rounded-lg mx-1 hover:cursor-pointer `}
            >
              <div className="bg-gray-200 h-[130px]"></div>

              <div className="bg-[#fdfbfb] p-4  lg:p-8">
                <p className="text-xs text-green-600">{service.tag}</p>
                <h5 className="py-1">{service.name}</h5>{" "}
                <p className="text-purple-600 font-bold">{service.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
