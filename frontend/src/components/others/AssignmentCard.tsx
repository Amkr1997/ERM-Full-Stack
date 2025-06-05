import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAssignmentStore, useAuthStore } from "@/store/store";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL_PROD;

const AssignmentCard = () => {
  const { userId } = useAuthStore((state) => state);
  const { allAssignments, setAssignments } = useAssignmentStore();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/assignment/get/all/assignments/${userId}`
        );
        const data = await res.json();

        setAssignments(data?.allAssignments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  console.log(allAssignments);

  return (
    <section>
      {allAssignments?.map(() => {
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};

export default AssignmentCard;
