import { create } from 'zustand'

const useSocket = create((set) => ({
    socketConnection: undefined,
    connectionState: "disconnected",
    updateSocketConnection: (socket) => set({ socketConnection: socket }),
    updateConnectionState: (newState) => set({ connectionState: newState })
}))

const useGameData = create((set) => ({
    P1POS: 1,
    P2POS: 1,
    DICE: 0,
    player: 1,
    TURN: true,
    gameUpdates: "Game Started!",
    updatePlayer: (data) => set({ P1POS: data.P1POS, P2POS: data.P2POS, player: data.player, TURN: data.TURN }),
    updateGameUpdates: (data) => set({ gameUpdates: data }),
    updateDiceVal: (data) => set({ DICE: data })
}))

export { useSocket, useGameData }