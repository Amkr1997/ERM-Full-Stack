import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEngineerStore } from "../../store/store";

const EngineersPage = () => {
  const { allEngineers } = useEngineerStore((state) => state);

  return (
    <main className="w-full">
      <h1 className="py-5 text-2xl text-center">All Engineers List</h1>
      {allEngineers?.map((engineer) => (
        <Card className="w-full mx-auto mb-5" key={engineer._id}>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl">{engineer?.name}</h1>
            </CardTitle>
            <CardDescription>
              Listed Details about {engineer?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-xl">Role: {engineer?.role}</p>
            <p className="font-medium text-xl">
              Skills: {engineer?.skills.join(", ")}
            </p>
            <p className="font-medium text-xl">
              Max Capacity: {engineer?.maxCapacity}%
            </p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default EngineersPage;
