import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex py-5 px-6 justify-between items-center">
        <h2 className="flex items-center text-3xl bg-amber-100 rounded-xl px-3">
          <span className="text-red-900 text-2xl font-bold lowercase">
            Famous
          </span>
          <span className="text-3xl pe-2">Erm</span>
        </h2>

        <div className="flex items-center gap-2">
          <NavLink to={"/login"}>
            <button className="text-lg font-bold bg-red-800 rounded-2xl text-white px-3 py-1 hover:bg-amber-50 hover:text-red-950 transition-all duration-200 cursor-pointer">
              Log-In
            </button>
          </NavLink>
          <NavLink to={"/register"}>
            <button className="text-lg font-bold bg-amber-50 rounded-2xl text-red-950 px-3 py-1 hover:bg-red-800 hover:text-white transition-all duration-200 cursor-pointer">
              Sign-Up
            </button>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
