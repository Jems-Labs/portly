import { useAppType } from '@/lib/types'
import {create} from 'zustand'
export const useApp = create<useAppType>((set) => ({
    claimedUsername: "",
    setClaimedUsername: (username: string) => set({ claimedUsername: username })
}))