import { Link } from "react-router-dom";
import { useAuthStore, useUserProfileStore } from "../store/store";
import { ShieldUser } from "lucide-react";

const Profile = () => {
  const { profile } = useUserProfileStore((state) => state);
  const { logout } = useAuthStore((state) => state);

  return (
    <section className="w-screen">
      {profile?.name && (
        <h1 className="text-center text-3xl font-bold py-3">
          {profile.name}'s Profile
        </h1>
      )}
      <div className="py-8 flex flex-col items-center gap-5">
        <ShieldUser className="w-48 h-48 opacity-50" />

        <button
          onClick={logout}
          className="bg-[#fa5252] hover:bg-[#c92a2a] text-white font-bold py-1 px-4 rounded-2xl cursor-pointer"
        >
          Log-Out
        </button>

        <Link to={"/update/profile"}>
          <button className="bg-[#fa5252] hover:bg-[#c92a2a] text-white font-bold py-1 w-full px-4 rounded-2xl cursor-pointer">
            Update Profile
          </button>
        </Link>

        {profile?.role === "engineer" && (
          <Link to={"/update/profile"}>
            <button className="bg-[#fa5252] hover:bg-[#c92a2a] text-white font-bold py-1 w-full px-4 rounded-2xl cursor-pointer">
              Update Profile
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Profile;
