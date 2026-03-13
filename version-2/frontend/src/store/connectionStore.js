import { create } from 'zustand'

const useSocket = create((set) => ({
    socketConnection: undefined,
    connectionState: "disconnected",
    updateSocketConnection: (socket) => set({ socketConnection: socket }),
    updateConnectionState: (newState) => set({ connectionState: newState })
}))

export default useSocket;