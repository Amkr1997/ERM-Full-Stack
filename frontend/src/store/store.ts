import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  userRole: string;
  setAuth: (role: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: "",
      setAuth: (role: string) => set({ isAuthenticated: true, userRole: role }),
      logout: () => set({ isAuthenticated: false, userRole: "" }),
    }),
    { name: "auth-storage" }
  )
);

// type CounterStoreState = {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// };

// export const useCounterStore = create<CounterStoreState>()(
//   persist(
//     (set) => ({
//       count: 0,
//       increment: () =>
//         set((state) => {
//           return { count: state.count + 1 };
//         }),
//       decrement: () =>
//         set((state) => {
//           if (state.count !== 0) {
//             return { count: state.count - 1 };
//           } else {
//             return state;
//           }
//         }),
//     }),
//     { name: "counter-storage" }
//   )
// );
