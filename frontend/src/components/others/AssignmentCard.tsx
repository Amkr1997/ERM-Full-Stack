import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Project = {
  createdAt: string;
  description: string;
  endDate: string;
  managerId: string;
  name: string;
  requiredSkills: string[];
  startDate: string;
  status: string;
  teamSize: number;
  updatedAt: string;
  _id: string;
};

type Manager = {
  createdAt: string;
  email: string;
  maxCapacity: number;
  name: string;
  role: string;
  skills: string[];
  updatedAt: string;
  _id: string;
};

type Assignment = {
  allocationPercentage: number;
  createdAt: string;
  endDate: string;
  enigneerId: string;
  managerId: Manager;
  name: string;
  projectId: Project;
  role: string;
  startDate: Date;
  updatedAt: string;
  _id: string;
};

type AssignmentCardProps = {
  assignment: Assignment;
};

const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  return (
    <section>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl capitalize font-normal">
              Assignment Name:{" "}
              <span className="font-medium">{assignment?.name}</span>
            </h1>
          </CardTitle>
          <CardDescription>
            <h3 className="text-2xl text-gray-800">
              Assignment under project: {assignment?.projectId?.name}
            </h3>
            <p className="text-xl text-gray-800">
              Project Description: {assignment?.projectId?.description}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl capitalize">
            Manager Name: {assignment?.managerId?.name}
          </p>
          <p className="text-xl capitalize">Your Role: {assignment?.role}</p>
          <p className="text-xl capitalize">
            Start Date:{" "}
            {new Date(assignment?.startDate).toISOString().split("T")[0]}
          </p>
          <p className="text-xl capitalize">
            End Date:{" "}
            {new Date(assignment?.startDate).toISOString().split("T")[0]}
          </p>
          <p className="text-xl capitalize">
            Allocation Percentage: {assignment?.allocationPercentage}%
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default AssignmentCard;
