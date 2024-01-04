
import { NavLink } from "react-router-dom";
import logo1 from "./logo1.png";

const Navbar = () => {

  return (
    <div className="bg-slate-500">
      <nav className="flex justify-between items-center h-[50px] max-w-6xl mx-auto">
        <NavLink to="/login">
          <div className="ml-5">
            <img src={logo1} className="h-[40px]" alt="logo" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/">
            <div className="flex items-center">
              <button className=" border text-white p-1 w-[70px] rounded-md ">Signup</button>
            </div>
          </NavLink>
          <NavLink to="/login">
            <div className="flex items-center">
              <button className=" border text-white p-1 w-[70px] rounded-md ">Login</button>
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

