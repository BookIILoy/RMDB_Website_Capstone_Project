import React from "react";
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
    return (
        <div className="flex justify-center sticky text-white bg-gray-900 w-full h-[20rem]">
            <div className="my-5">
            <p className="flex"><FaRegCopyright className="my-auto mx-2"/>Copyright 2024. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;