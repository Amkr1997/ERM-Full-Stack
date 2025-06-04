import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL_PROD;

const EngineerView = () => {
  const { logout, userId } = useAuthStore((state) => state);

  useEffect(() => {
    // fetching all assignments.
    (async () => {
      try {
        const engineersData = await fetch(
          `${API_URL}/get/all/assignments/${userId}`
        );

        const res = await engineersData.json();

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="w-screen">
      <Button className="w-fit mx-auto" onClick={logout}>
        Logout
      </Button>
    </section>
  );
};

export default EngineerView;
