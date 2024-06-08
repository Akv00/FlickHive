import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");

        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  useEffect(() => {
    console.log("Dropdown state changed:", toggleDropdown);
  }, [toggleDropdown]);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44 cursor-pointer"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div
          className="flex justify-center"
          onMouseLeave={() => {
            console.log("User icon unhovered");
            setToggleDropdown(false);
          }}
        >
          <img
            className="w-12 h-12 p-2 cursor-pointer"
            alt="usericon"
            src={user?.photoURL}
            onMouseEnter={() => {
              console.log("User icon hovered");
              setToggleDropdown(true);
            }}
          />
          {toggleDropdown && (
            <div
              id="dropdown"
              className="z-10 absolute top-14  divide-gray-100 rounded-lg shadow w-44 dark:bg-black"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    onClick={() => {
                      setToggleDropdown(false);
                      handleSingOut();
                    }}
                    className="singOut text-white pl-4"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
