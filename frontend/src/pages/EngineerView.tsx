import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";

const EngineerView = () => {
  const { logout } = useAuthStore((state) => state);

  return (
    <section className="w-screen">
      <Button className="w-fit mx-auto" onClick={logout}>
        Logout
      </Button>
    </section>
  );
};

export default EngineerView;
