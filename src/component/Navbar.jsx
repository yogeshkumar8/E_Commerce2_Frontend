import { IoCartOutline } from "react-icons/io5";
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import logo1 from "./logo1.png";

const Navbar = () => {
  const { cart } = useSelector((state) => state);

    const handleLogout = async () => {
    try {
        const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies) in the request
        });

        if (response.ok) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
            }
    } catch (error) {
        console.error('Error during logout:', error);
        }
    };


  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="bg-slate-500">
      <nav className="flex justify-between items-center h-[50px] max-w-6xl mx-auto">
        <NavLink to="/home">
          <div className="ml-5">
            <img src={logo1} className="h-[40px]" alt="logo" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/home">
            <p>Home</p>
          </NavLink>
          <NavLink to="/cart">
            <div className="flex items-center">
              <div className="relative">
                <IoCartOutline className="text-3xl" />

                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-green-500 text-xs w-5 h-5 flex
                    justify-center items-center animate-bounce rounded-full text-white">
                    {cart.length}
                  </span>
                )}
              </div>
              <p className="text-sm">Cart</p>
            </div>
          </NavLink>
          
          {isLoggedIn && (
            <button className="text-slate-100" onClick={handleLogout}>
              Logout
            </button>
          )}



        </div>
      </nav>
    </div>
  );
};

export default Navbar;

