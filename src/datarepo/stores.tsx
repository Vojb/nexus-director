import { create } from 'zustand'

type UserStore = {
    username: string ,
    setUsername: (name :string) => void,
}

export const useUserStore  = create<UserStore>((set) => ({
    username:"vojb",
    setUsername: (string) => set((state) => ({ username: string })),
}));