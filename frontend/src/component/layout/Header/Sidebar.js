import React from "react";

const Sidebar = () => {
  return (
    <div className=" md:px-20 px-3 bg-white z-50">
      <ul className="py-5 space-y-5">
        <li className="focus:text-hClr hover:text-hClr  cursor-pointer hover:border-b-[1px] w-fit px-2 pb-2">
          Home
        </li>
        <li className="focus:text-hClr hover:text-hClr  cursor-pointer hover:border-b-[1px] w-fit px-2 pb-2">
          About
        </li>
        <li className="focus:text-hClr hover:text-hClr  cursor-pointer hover:border-b-[1px] w-fit px-2 pb-2">
          Testimonials{" "}
        </li>
        <li className="focus:text-hClr hover:text-hClr  cursor-pointer hover:border-b-[1px] w-fit px-2 pb-2">
          Products
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
