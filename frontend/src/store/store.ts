import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  userRole: string;
  userId: string;
  setAuth: (args: { role: string; id: string }) => void;
  logout: () => void;
};

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

type EngineerState = {
  allEngineers: Engineer[];
  setEngineers: (engineers: Engineer[]) => void;
};

type UserProfileState = {
  profile: object;
  setProfile: (profile: object) => void;
};

type ProjectState = {
  allProjects: Project[];
  setProjects: (projects: Project[]) => void;
};

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
        useUserProfileStore.getState().setProfile({});

        // Reset projects to an empty array
        useProjectStore.getState().setProjects([]);
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
      profile: {},
      setProfile: (profile: object) => set({ profile }),
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
