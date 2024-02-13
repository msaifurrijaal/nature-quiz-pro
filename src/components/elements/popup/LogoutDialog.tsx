import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

type LogoutDialogProps = {
  title: string;
  nOnClick: React.Dispatch<React.SetStateAction<boolean>>;
  yOnClick: () => void;
};

const LogoutDialog = ({ title, nOnClick, yOnClick }: LogoutDialogProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <div className="flex justify-end">
          <Link to="" onClick={() => nOnClick(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => nOnClick(false)}
            className="font-medium text-base bg-white text-primary border border-primary rounded-md py-2 px-4
            group-hover:border-green-700 group-hover:text-green-700"
          >
            Kembali
          </button>
          <button
            onClick={() => yOnClick()}
            className="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
            group-hover:bg-green-700"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
