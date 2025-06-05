import { create } from "zustand";
import { persist } from "zustand/middleware";

type Engineer = {
  createdAt: string;
  email: string;
  maxCapacity: number;
  name: string;
  role: string;
  skills: string[];
  updatedAt: string;
  _id: string;
};

type Profile = {
  createdAt: string;
  email: string;
  maxCapacity: number;
  name: string;
  role: string;
  skills: string[];
  updatedAt: string;
  _id: string;
};

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

type Assignment = {
  allocationPercentage: number;
  createdAt: string;
  endDate: string;
  enigneerId: string;
  managerId: object;
  name: string;
  projectId: string;
  role: string;
  startDate: string;
  updatedAt: string;
  _id: string;
};

type AuthState = {
  isAuthenticated: boolean;
  userRole: string;
  userId: string;
  setAuth: (args: { role: string; id: string }) => void;
  logout: () => void;
};

type EngineerState = {
  allEngineers: Engineer[];
  setEngineers: (engineers: Engineer[]) => void;
};

type UserProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
};

type ProjectState = {
  allProjects: Project[];
  setProjects: (projects: Project[]) => void;
};

type AssignmentState = {
  allAssignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
};

// const emptyProfile: Profile = {
//   createdAt: "",
//   email: "",
//   maxCapacity: 0,
//   name: "",
//   role: "",
//   skills: [],
//   updatedAt: "",
//   _id: "",
// };

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: "",
      userId: "",
      setAuth: ({ role, id }: { role: string; id: string }) =>
        set({ isAuthenticated: true, userRole: role, userId: id }),
      logout: () => {
        set({ isAuthenticated: false, userRole: "" });

        // Set engineers to an empty array
        useEngineerStore.getState().setEngineers([]);

        // Reset profile to an empty object
        useUserProfileStore.getState().setProfile(null);

        // Reset projects to an empty array
        useProjectStore.getState().setProjects([]);

        // Reset assignments to an empty array
        useAssignmentStore.getState().setAssignments([]);
      },
    }),
    { name: "auth-storage" }
  )
);

export const useEngineerStore = create<EngineerState>()(
  persist(
    (set) => ({
      allEngineers: [],
      setEngineers: (engineers: Engineer[]) => set({ allEngineers: engineers }),
    }),
    { name: "engineers-storage" }
  )
);

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile | null) => set({ profile }),
    }),
    { name: "profile-storage" }
  )
);

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      allProjects: [],
      setProjects: (projects: Project[]) => set({ allProjects: projects }),
    }),
    { name: "projects-storage" }
  )
);

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set) => ({
      allAssignments: [],
      setAssignments: (assignments: Assignment[]) =>
        set({ allAssignments: assignments }),
    }),
    { name: "assignments-storage" }
  )
);
