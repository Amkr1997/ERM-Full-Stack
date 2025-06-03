import { create } from "zustand";
import { persist } from "zustand/middleware";

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
