import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useProjectStore } from "../../store/store";

const DisplayProjects = () => {
  const { allProjects } = useProjectStore((state) => state);

  return (
    <main className="w-full">
      <h1 className="py-5 text-2xl text-center">All Engineers List</h1>
      {allProjects?.map((project) => (
        <Card className="w-full mx-auto mb-5" key={project._id}>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl">{project?.name}</h1>
            </CardTitle>
            <CardDescription>
              Listed Details about {project?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-xl">
              Required Skills: {project?.requiredSkills?.join(", ")}
            </p>
            <p className="font-medium text-xl">Status: {project?.status}</p>
            <p className="font-medium text-xl">
              Team Size: {project?.teamSize}
            </p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default DisplayProjects;
