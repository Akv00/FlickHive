import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // User is signed in
        console.log("User is signed in");
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        console.log("user added");
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
        // User is signed out
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    console.log("Dropdown state changed:", toggleDropdown);
  }, [toggleDropdown]);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44 cursor-pointer" src={LOGO} alt="logo" />
      {user && (
        <div
          className="flex justify-center"
          onMouseLeave={() => {
            setToggleDropdown(false);
          }}
        >
          { showGptSearch && (
            <select
              className="py-2 mr-5 mb-5 px-4 m-2 mx-4 bg-gray-900 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}
          <button
            className="py-2 mr-10 mb-5 px-4 m-2 mx-4 bg-red-800 text-white font-bold rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
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
