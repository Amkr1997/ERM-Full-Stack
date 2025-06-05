import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isAuth =
      location.pathname === "/login" || location.pathname === "/register";

    setShowNav(isAuth);
  }, [location.pathname]);

  return (
    <section>
      {showNav ? (
        <nav className="flex pt-5 pb-3 justify-center items-center w-full">
          <div className="w-fit flex flex-col items-center">
            <h2 className="flex items-center text-3xl font-bold py-0 rounded-xl px-3 uppercase tracking-[4px]">
              Resourcely
            </h2>
            <p className="text-[0.75rem] py-0 text-[#c92a2a] font-medium uppercase">
              Your assistant for resource planning
            </p>
          </div>
        </nav>
      ) : (
        <nav className="flex pt-3 pb-3 ps-3 pe-5 justify-between items-center">
          <NavLink to={"/"} className={"cursor-pointer"}>
            <div className="w-fit flex flex-col items-center">
              <h2 className="flex items-center text-2xl font-bold py-0 rounded-xl px-3 uppercase tracking-[4px]">
                Resourcely
              </h2>
              <p className="text-[0.625rem] py-0 text-[#c92a2a] font-medium uppercase">
                Your assistant for resource planning
              </p>
            </div>
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink to={"/engineers/page"}>
              <button className="cursor-pointer w-fit px-2 text-white bg-red-400 rounded-2xl">
                Engineers
              </button>
            </NavLink>

            <NavLink to={"/assignments/page"}>
              <button className="cursor-pointer w-fit px-2 text-white bg-red-400 rounded-2xl">
                Assignments
              </button>
            </NavLink>

            <NavLink to={"/projects/page"}>
              <button className="cursor-pointer w-fit px-2 text-white bg-red-400 rounded-2xl">
                Projects
              </button>
            </NavLink>

            <NavLink to={"/profile"}>
              <CircleUserRound className="w-8 h-8 cursor-pointer bg-black text-white rounded-full" />
            </NavLink>
          </div>
        </nav>
      )}
    </section>
  );
};

export default Navbar;
