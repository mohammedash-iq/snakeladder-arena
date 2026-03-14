import { create } from 'zustand'

const useSocket = create((set) => ({
    socketConnection: undefined,
    connectionState: "disconnected",
    updateSocketConnection: (socket) => set({ socketConnection: socket }),
    updateConnectionState: (newState) => set({ connectionState: newState })
}))

const usePlayer = create((set) => ({
    player1: 1,
    player2: 1,
    updatePlayer: (newPos) => set({ player1: newPos.player1, player2: newPos.player2 })
}))

const useUpdates = create((set) => ({
    gameUpdates: "Game started",
    updateGameUpdates: (newUpdate) => set({ gameUpdates: newUpdate })
}))

const useDice = create((set) => ({
    diceVal: 0,
    updateDiceVal: (newDiceVal) => set({ diceVal: newDiceVal })
}))
export { useSocket, usePlayer, useUpdates, useDice }