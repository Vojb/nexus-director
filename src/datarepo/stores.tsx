import { create } from "zustand";

type UserStore = {
  username: string;
  id: string;
  setId: (id: string) => void;
  setUsername: (username: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  id: "",
  setId: (string) => set((state) => ({ id: string })),
  setUsername: (string) => set((state) => ({ username: string })),
}));
