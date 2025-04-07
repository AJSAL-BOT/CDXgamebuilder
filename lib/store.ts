"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GameState {
  backgroundColor: string
  backgroundImage: string
  cellColor: string
  cellImage: string
  player1Symbol: string
  player2Symbol: string
  player1Name: string
  player2Name: string
  boardSize: number
  soundEnabled: boolean
  player1Score: number
  player2Score: number
  theme: string
  gameMode: string
  timerEnabled: boolean
  timerDuration: number
  customFontFamily: string
  borderStyle: string
  winCondition: number
  animationsEnabled: boolean
  gamesPlayed: number
  player1Wins: number
  player2Wins: number
  draws: number
  achievements: string[]
  gameTitle: string
  setBackgroundColor: (color: string) => void
  setBackgroundImage: (url: string) => void
  setCellColor: (color: string) => void
  setCellImage: (url: string) => void
  setPlayer1Symbol: (symbol: string) => void
  setPlayer2Symbol: (symbol: string) => void
  setPlayer1Name: (name: string) => void
  setPlayer2Name: (name: string) => void
  setBoardSize: (size: number) => void
  setSoundEnabled: (enabled: boolean) => void
  setPlayer1Score: (score: number) => void
  setPlayer2Score: (score: number) => void
  resetScores: () => void
  setTheme: (theme: string) => void
  setGameMode: (mode: string) => void
  setTimerEnabled: (enabled: boolean) => void
  setTimerDuration: (duration: number) => void
  setCustomFontFamily: (font: string) => void
  setBorderStyle: (style: string) => void
  setWinCondition: (condition: number) => void
  setAnimationsEnabled: (enabled: boolean) => void
  incrementGamesPlayed: () => void
  incrementPlayer1Wins: () => void
  incrementPlayer2Wins: () => void
  incrementDraws: () => void
  addAchievement: (achievement: string) => void
  resetGameStats: () => void
  setGameTitle: (title: string) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      backgroundColor: "#1e1e2f",
      backgroundImage: "",
      cellColor: "#2d2d42",
      cellImage: "",
      player1Symbol: "X",
      player2Symbol: "O",
      player1Name: "Player 1",
      player2Name: "Player 2",
      boardSize: 3,
      soundEnabled: true,
      player1Score: 0,
      player2Score: 0,
      theme: "default",
      gameMode: "classic",
      timerEnabled: false,
      timerDuration: 10,
      customFontFamily: "default",
      borderStyle: "solid",
      winCondition: 3,
      animationsEnabled: true,
      gamesPlayed: 0,
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      achievements: [],
      gameTitle: "Tic Tac Toe",
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      setBackgroundImage: (url) => set({ backgroundImage: url }),
      setCellColor: (color) => set({ cellColor: color }),
      setCellImage: (url) => set({ cellImage: url }),
      setPlayer1Symbol: (symbol) => set({ player1Symbol: symbol }),
      setPlayer2Symbol: (symbol) => set({ player2Symbol: symbol }),
      setPlayer1Name: (name) => set({ player1Name: name }),
      setPlayer2Name: (name) => set({ player2Name: name }),
      setBoardSize: (size) => set({ boardSize: size }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setPlayer1Score: (score) => set({ player1Score: score }),
      setPlayer2Score: (score) => set({ player2Score: score }),
      resetScores: () => set({ player1Score: 0, player2Score: 0 }),
      setTheme: (theme) => set({ theme: theme }),
      setGameMode: (mode) => set({ gameMode: mode }),
      setTimerEnabled: (enabled) => set({ timerEnabled: enabled }),
      setTimerDuration: (duration) => set({ timerDuration: duration }),
      setCustomFontFamily: (font) => set({ customFontFamily: font }),
      setBorderStyle: (style) => set({ borderStyle: style }),
      setWinCondition: (condition) => set({ winCondition: condition }),
      setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
      incrementGamesPlayed: () => set((state) => ({ gamesPlayed: state.gamesPlayed + 1 })),
      incrementPlayer1Wins: () => set((state) => ({ player1Wins: state.player1Wins + 1 })),
      incrementPlayer2Wins: () => set((state) => ({ player2Wins: state.player2Wins + 1 })),
      incrementDraws: () => set((state) => ({ draws: state.draws + 1 })),
      addAchievement: (achievement) =>
        set((state) => ({
          achievements: state.achievements.includes(achievement)
            ? state.achievements
            : [...state.achievements, achievement],
        })),
      resetGameStats: () =>
        set({
          gamesPlayed: 0,
          player1Wins: 0,
          player2Wins: 0,
          draws: 0,
          achievements: [],
        }),
      setGameTitle: (title) => set({ gameTitle: title }),
    }),
    {
      name: "tictactoe-game-storage",
    },
  ),
)

