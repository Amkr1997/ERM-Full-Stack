// import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex pt-5 pb-3 justify-center items-center">
        <div className="w-fit flex flex-col items-center">
          <h2 className="flex items-center text-3xl font-bold py-0 rounded-xl px-3 uppercase tracking-[4px]">
            Resourcely
          </h2>
          <p className="text-[0.75rem] py-0 text-[#c92a2a] font-medium uppercase">
            Your assistant for resource planning
          </p>
        </div>

        {/* <div className="flex items-center gap-2">
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
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;
