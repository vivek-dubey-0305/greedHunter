import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../utils/data";
import { ChevronDown, Menu, X, User, Share } from "lucide-react";
import { useClickAway } from "react-use";
import { useUserContext } from "../context/UserContext"; // Adjust the import path as needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    width: 0,
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const navigate = useNavigate();

  const { user, setUser, isAuthenticated, logoutUser } = useUserContext();

  // Handle click outside for mobile menu and user dropdown
  useClickAway(navRef, () => {
    if (isMenuOpen) {
      closeMenu();
    }
  });

  useClickAway(userDropdownRef, () => {
    if (isUserDropdownOpen) {
      setIsUserDropdownOpen(false);
    }
  });

  const calculateDropdownPosition = (element) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setDropdownPosition({
      left: rect.left + window.scrollX - 100,
      width: rect.width + 200,
    });
  };

  const handleDropdownEnter = (key, event) => {
    if (window.innerWidth < 1024) return;
    setIsClosing(false);
    calculateDropdownPosition(event.currentTarget);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setIsClosing(false);
    if (window.innerWidth < 1024) return;
    setIsClosing(true);
    setTimeout(() => {
      if (isClosing) {
        setActiveDropdown(null);
        setIsClosing(false);
      }
    }, 200);
  };

  const toggleMobileDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Close dropdowns on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent page scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore page scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isMenuOpen]);

  const handleLogOut = async () => {
    const res = await logoutUser();
    // console.log("Logout Response", res);
    // console.log("Logout Response", res.user);

    setIsMenuOpen(false);
    navigate("/");
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   ...res.user
    // }));

    // console.log("REs", res);
  };

  return (
    <nav
      className="bg-black text-white fixed top-0 left-0 right-0 border-b-2 border-b-yellow-400/40 z-50"
      ref={navRef}
    >
      <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            <span className="text-purple-500">greed</span><span className="text-yellow-500">Hunter</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-300 mr-7">
              Home
            </Link>
            <Link to="/platform/about us" className="hover:text-gray-300 mr-7">
              About Us
            </Link>

            {/* {
              Object.keys(menuItems).map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={(e) => handleDropdownEnter(key, e)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center underline ${
                    activeDropdown === key ? "text-gray-300" : ""
                  }`}
                >
                  {menuItems[key].title}
                </button>

                // Dropdown Content 
                {activeDropdown === key && (
                  <div
                    ref={dropdownRef}
                    className={`w-screen max-w-md absolute top-full pt-2 transition-opacity duration-200 ${
                      isClosing ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="bg-white text-black rounded-lg shadow-xl p-6">
                      <div className="grid grid-cols-2 gap-8">
                        {menuItems[key].sections?.map((section, idx) => (
                          <div key={idx}>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                              {section.title}
                            </h3>
                            <div className="space-y-0.5">
                              {section.items.map((item, itemIdx) => (
                                <Link
                                  key={itemIdx}
                                  to={`${key}/${item.name.toLowerCase()}`}
                                  className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                  <div>
                                    <div className="flex items-center">
                                      <span className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </span>
                                      {item.isNew && (
                                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                          New
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {!menuItems[key].sections && (
                          <div className="space-y-0.5">
                            {menuItems[key].items.map((item, idx) => (
                              <Link
                                key={idx}
                                to={`${key}/${item.name.toLowerCase()}`}
                                className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))} */}

            <Link to="/platform/contact us" className="hover:text-gray-300">
              Contac Us
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              onClick={() => navigator.share({ url: window.location.href })}
            >
              <Share className="h-5 w-5" />
            </button>

            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-xl overflow-hidden z-50">
                    {!isAuthenticated ? (
                      <Link
                        to={`/sotp`}
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                      >
                        Verify
                      </Link>
                    ) : (
                      ""
                    )}

                    <Link
                      to={`/user/${user._id}/settings`}
                      className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      Settings
                    </Link>

                    {/* <Link
                      to={`/leaderboard`}
                      className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      LeaderBoard
                    </Link> */}
                    <button
                      onClick={handleLogOut}
                      className="block px-4 py-3 hover:bg-gray-100 transition-colors text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={"/get-in"}
                className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden absolute w-full bg-black border-t border-gray-800 
               max-h-[80vh] overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">

              <div  className="border-b border-gray-800 pb-2">

            <Link to="/events" onClick={() => setIsMenuOpen(false)} className="w-full flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg">
              Events
            </Link>
              </div>
              {Object.keys(menuItems).map((key) => (
                <div key={key} className="border-b border-gray-800 pb-2">
                  <button
                    onClick={() => toggleMobileDropdown(key)}
                    className="w-full flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg"
                  >
                    {menuItems[key].title}
                  </button>

                  {activeDropdown === key && (
                    <div className="pl-4 mt-2 space-y-3 max-h-[50vh] overflow-y-auto">
                      {menuItems[key].sections?.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            {section.title}
                          </h3>
                          {section.items.map((item, itemIdx) => (
                            <Link
                              onClick={() => setIsMenuOpen(false)}
                              key={itemIdx}
                              to={`${key}/${item.name.toLowerCase()}`}
                              className="block p-2 hover:bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center">
                                {item.name}
                                {item.isNew && (
                                  <span className="ml-2 px-2 py-1 bg-blue-900 text-blue-100 rounded-full text-xs">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      ))}

                      {!menuItems[key].sections &&
                        menuItems[key].items.map((item, idx) => (
                          <Link
                            onClick={() => setIsMenuOpen(false)}
                            key={idx}
                            to={`${key}/${item.name.toLowerCase()}`}
                            className="block p-2 hover:bg-gray-800 rounded-lg"
                          >
                            <p className="text-gray-100">{item.name}</p>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                {user ? (
                  <>
                    {!isAuthenticated ? (
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        to={`/sotp`}
                        className="block p-3 text-center hover:bg-gray-800 rounded-lg"
                      >
                        Verify
                      </Link>
                    ) : (
                      ""
                    )}

                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to={`/user/${user._id}/settings`}
                      className="block p-3 text-center hover:bg-gray-800 rounded-lg"
                    >
                      Settings
                    </Link>
                    <Link
                      className="block p-3 text-center hover:bg-gray-800 rounded-lg text-red-500"
                      onClick={handleLogOut}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to="/get-in"
                      className="block w-full p-3 bg-blue-600 hover:bg-blue-700 text-center rounded-lg transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
