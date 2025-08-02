import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

import logoImg from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContex";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();

  // Get username or email for display
  const displayName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Combined function for navigation and scrolling
  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      scrollToTop();
      setIsMobileMenuOpen(false);
    }
  };

  const favoriteItems = useSelector((state) => state.favorites.items);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={scrollToTop} className="flex items-center">
              <img src={logoImg} alt="Books Heaven" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Books Heaven
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={scrollToTop}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Books
            </Link>
            <Link
              to="/about"
              onClick={scrollToTop}
              className="text-gray-900 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              About
            </Link>
          </div>

          {/* Right side - Search & Icons */}
          <div className="flex items-center space-x-4">
            {/* Search input (Desktop) */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="bg-gray-100 py-2 pl-10 pr-4 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearchOutline className="absolute left-3 text-gray-500 text-lg" />
              </div>
              <button type="submit" className="hidden">
                Search
              </button>
            </form>

            {/* Auth Buttons or User Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-gray-900 hover:bg-gray-00 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
                  aria-label="User menu"
                >
                  <span className="truncate max-w-[120px]">{displayName}</span>
                </button>

                {/* User Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="py-1">
                      {currentUser && (
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      )}
                      <ul>
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <button
                              onClick={() => handleNavigation(item.href)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors duration-150"
                            >
                              {item.name}
                            </button>
                          </li>
                        ))}
                        <li className="border-t border-gray-100">
                          <button
                            onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                  LOG IN
                </Link>
              </div>
            )}

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              onClick={scrollToTop}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 hidden sm:block"
              aria-label="Favorites"
            >
              <HiOutlineHeart className="h-6 w-6 text-gray-900" />
              {favoriteItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {favoriteItems.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              onClick={scrollToTop}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <HiOutlineShoppingCart className="h-6 w-6 text-gray-900" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md md:hidden hover:bg-gray-100 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6 text-gray-900" />
              ) : (
                <HiMenu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 border-t border-gray-200 mt-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="bg-gray-100 py-2 pl-10 pr-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearchOutline className="absolute left-3 top-2.5 text-gray-500 text-lg" />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => {
                  scrollToTop();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/books"
                onClick={() => {
                  scrollToTop();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                Books
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  scrollToTop();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/favorites"
                onClick={() => {
                  scrollToTop();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200 sm:hidden"
              >
                Favorites
                {favoriteItems.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {favoriteItems.length}
                  </span>
                )}
              </Link>

              {/* Mobile Auth Links */}
              {!currentUser && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link
                    to="/login"
                    onClick={() => {
                      scrollToTop();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200 block"
                  >
                    Log In
                  </Link>
                </div>
              )}

              {/* Mobile User Menu */}
              {currentUser && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-gray-900 font-medium">
                    Hello, {displayName}
                  </div>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        scrollToTop();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors duration-200 block"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-gray-100 transition-colors duration-200 block"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
