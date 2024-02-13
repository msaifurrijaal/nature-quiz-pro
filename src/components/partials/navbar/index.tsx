import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { useIsUserLogin } from "../../../context/IsLogin";
import LogoutDialog from "../../elements/popup/LogoutDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isUserLogin } = useIsUserLogin();
  const [, , removeCookie] = useCookies(["token"]);
  const location = useLocation();

  const handleLogout = () => {
    removeCookie("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0 z-50">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div className="cursor-pointer">
            <Link to="/">
              <h1 className="text-xl font-semibold text-primary">
                Nature Science Pro
              </h1>
            </Link>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-4 cursor-pointer md:hidden"
          >
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              style={{ color: "#020617" }}
            />
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full pl-4 md:pl-0 md:w-auto transition-all duration-500 ease-in ${
              open ? "top-14 " : "top-[-490px]"
            }`}
          >
            {location.pathname !== "/quiz" && (
              <li className="group">
                <Link
                  to="/"
                  className={`font-medium text-base ${
                    location.pathname === "/" ? "text-primary" : "text-dark"
                  } py-2 mx-4 flex group-hover:text-primary`}
                >
                  Home
                </Link>
              </li>
            )}
            {location.pathname !== "/quiz" && (
              <li className="group">
                <Link
                  to=""
                  className={`font-medium text-base ${
                    location.pathname === "/products"
                      ? "text-primary"
                      : "text-dark"
                  } py-2 mx-4 flex group-hover:text-primary`}
                >
                  Leaderboard
                </Link>
              </li>
            )}
            {isUserLogin && location.pathname !== "/quiz" && (
              <li className="group">
                <Link
                  to=""
                  onClick={() => setModalOpen(true)}
                  className=" mx-4 md:mx-2 flex"
                >
                  <div
                    className="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
              group-hover:bg-primaryDark transition duration-200"
                  >
                    Logout
                  </div>
                </Link>
              </li>
            )}
            {!isUserLogin && location.pathname !== "/quiz" && (
              <li className="group">
                <Link to="/login" className=" mx-4 md:mx-2 flex">
                  <div
                    className="font-medium text-base bg-primary text-white rounded-md py-2 px-4 
                  group-hover:bg-primaryDark transition duration-200"
                  >
                    Masuk
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {modalOpen && (
        <LogoutDialog
          title="Are you sure to logout?"
          nOnClick={setModalOpen}
          yOnClick={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
