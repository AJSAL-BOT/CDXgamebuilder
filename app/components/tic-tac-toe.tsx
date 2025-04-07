"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useGameStore } from "@/lib/store"
import confetti from "canvas-confetti"
import { Timer, RotateCcw, Award, Clock, AlertTriangle } from "lucide-react"

export default function TicTacToe() {
  const {
    backgroundColor,
    backgroundImage,
    cellColor,
    cellImage,
    player1Symbol,
    player2Symbol,
    player1Name,
    player2Name,
    boardSize,
    soundEnabled,
    player1Score,
    player2Score,
    setPlayer1Score,
    setPlayer2Score,
    customFontFamily,
    borderStyle,
    winCondition,
    animationsEnabled,
    timerEnabled,
    timerDuration,
    incrementGamesPlayed,
    incrementPlayer1Wins,
    incrementPlayer2Wins,
    incrementDraws,
    addAchievement,
  } = useGameStore()

  const [board, setBoard] = useState<(string | null)[]>([])
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [gameStatus, setGameStatus] = useState("")
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [moveHistory, setMoveHistory] = useState<{ board: (string | null)[]; isXNext: boolean }[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timerDuration)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [consecutiveWins, setConsecutiveWins] = useState({ player1: 0, player2: 0 })
  const [moveCount, setMoveCount] = useState(0)
  const [fastestWin, setFastestWin] = useState<number | null>(null)

  // Sound effects
  const moveAudioRef = useRef<HTMLAudioElement | null>(null)
  const winAudioRef = useRef<HTMLAudioElement | null>(null)
  const drawAudioRef = useRef<HTMLAudioElement | null>(null)
  const timerAudioRef = useRef<HTMLAudioElement | null>(null)
  const achievementAudioRef = useRef<HTMLAudioElement | null>(null)

  // Font families
  const fontFamilies = {
    default: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "'Courier New', monospace",
    rounded: "'Comic Sans MS', cursive",
    elegant: "'Palatino Linotype', serif",
  }

  // Initialize or reset the board based on board size
  useEffect(() => {
    resetGame()
  }, [boardSize, player1Name, player2Name])

  // Initialize audio elements
  useEffect(() => {
    moveAudioRef.current = new Audio("/move.mp3")
    winAudioRef.current = new Audio("/win.mp3")
    drawAudioRef.current = new Audio("/draw.mp3")
    timerAudioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3")
    achievementAudioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3")

    // Use default audio files if not found
    moveAudioRef.current.onerror = () => {
      moveAudioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3")
    }
    winAudioRef.current.onerror = () => {
      winAudioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3")
    }
    drawAudioRef.current.onerror = () => {
      drawAudioRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3")
    }

    return () => {
      if (moveAudioRef.current) moveAudioRef.current.pause()
      if (winAudioRef.current) winAudioRef.current.pause()
      if (drawAudioRef.current) drawAudioRef.current.pause()
      if (timerAudioRef.current) timerAudioRef.current.pause()
      if (achievementAudioRef.current) achievementAudioRef.current.pause()
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null

    if (isTimerActive && timerEnabled && timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isTimerActive && timerEnabled && timeLeft === 0) {
      // Time's up - switch player
      if (soundEnabled && timerAudioRef.current) {
        timerAudioRef.current.play()
      }
      setIsXNext(!isXNext)
      setTimeLeft(timerDuration)
      setGameStatus(`Time's up! Next player: ${!isXNext ? player1Name : player2Name}`)
    }

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isTimerActive, timeLeft, timerEnabled, timerDuration, isXNext, player1Name, player2Name, soundEnabled])

  // Reset timer when player changes
  useEffect(() => {
    if (timerEnabled && gameStarted && !winner) {
      setTimeLeft(timerDuration)
      setIsTimerActive(true)
    }
  }, [isXNext, timerEnabled, timerDuration, gameStarted, winner])

  const playSound = (type: "move" | "win" | "draw" | "achievement") => {
    if (!soundEnabled) return

    try {
      if (type === "move" && moveAudioRef.current) {
        moveAudioRef.current.currentTime = 0
        moveAudioRef.current.play()
      } else if (type === "win" && winAudioRef.current) {
        winAudioRef.current.currentTime = 0
        winAudioRef.current.play()
        // Trigger confetti on win if animations are enabled
        if (animationsEnabled) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      } else if (type === "draw" && drawAudioRef.current) {
        drawAudioRef.current.currentTime = 0
        drawAudioRef.current.play()
      } else if (type === "achievement" && achievementAudioRef.current) {
        achievementAudioRef.current.currentTime = 0
        achievementAudioRef.current.play()
      }
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }

  const getCellStyle = (index: number) => {
    const baseStyle: React.CSSProperties = {
      backgroundColor: cellColor,
      backgroundImage: cellImage ? `url(${cellImage})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderStyle: borderStyle,
      fontFamily: fontFamilies[customFontFamily as keyof typeof fontFamilies] || fontFamilies.default,
    }

    // Highlight winning cells
    if (winningLine && winningLine.includes(index)) {
      return {
        ...baseStyle,
        boxShadow: "0 0 10px 3px rgba(255, 255, 255, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.8)",
        transform: animationsEnabled ? "scale(1.05)" : undefined,
      }
    }

    return baseStyle
  }

  const getContainerStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: fontFamilies[customFontFamily as keyof typeof fontFamilies] || fontFamilies.default,
    }

    if (backgroundImage) {
      return {
        ...baseStyle,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    }
    return { ...baseStyle, backgroundColor }
  }

  const handleClick = (index: number) => {
    if (board[index] || winner || currentStep < moveHistory.length - 1) return

    // Start game on first move
    if (!gameStarted) {
      setGameStarted(true)
      if (timerEnabled) {
        setIsTimerActive(true)
      }
    }

    const newBoard = [...board]
    newBoard[index] = isXNext ? player1Symbol : player2Symbol

    // Play move sound
    playSound("move")

    // Update board and history
    setBoard(newBoard)
    setIsXNext(!isXNext)
    setMoveCount(moveCount + 1)

    // Add to history and update current step
    const newHistory = moveHistory.slice(0, currentStep + 1)
    newHistory.push({ board: newBoard, isXNext: !isXNext })
    setMoveHistory(newHistory)
    setCurrentStep(newHistory.length - 1)

    // Reset timer for next player
    if (timerEnabled) {
      setTimeLeft(timerDuration)
    }

    const result = checkGameResult(newBoard)
    if (result.winner) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setIsTimerActive(false)

      // Update scores and stats
      if (result.winner === player1Symbol) {
        setPlayer1Score(player1Score + 1)
        setGameStatus(`Winner: ${player1Name}`)
        incrementPlayer1Wins()
        setConsecutiveWins({
          player1: consecutiveWins.player1 + 1,
          player2: 0,
        })

        // Check for achievements
        if (consecutiveWins.player1 + 1 === 3) {
          addAchievement(`${player1Name} won 3 games in a row!`)
          playSound("achievement")
        }
      } else {
        setPlayer2Score(player2Score + 1)
        setGameStatus(`Winner: ${player2Name}`)
        incrementPlayer2Wins()
        setConsecutiveWins({
          player1: 0,
          player2: consecutiveWins.player2 + 1,
        })

        // Check for achievements
        if (consecutiveWins.player2 + 1 === 3) {
          addAchievement(`${player2Name} won 3 games in a row!`)
          playSound("achievement")
        }
      }

      // Track fastest win
      if (fastestWin === null || moveCount + 1 < fastestWin) {
        setFastestWin(moveCount + 1)
        if (moveCount + 1 <= boardSize + 1) {
          addAchievement(`Lightning Victory: Won in just ${moveCount + 1} moves!`)
          playSound("achievement")
        }
      }

      // Play win sound
      playSound("win")
      incrementGamesPlayed()
    } else if (result.isDraw) {
      setGameStatus("Game ended in a draw!")
      playSound("draw")
      incrementDraws()
      incrementGamesPlayed()
      setConsecutiveWins({ player1: 0, player2: 0 })
      setIsTimerActive(false)
    } else {
      const nextPlayerName = !isXNext ? player1Name : player2Name
      setGameStatus(`Next player: ${nextPlayerName}`)
    }
  }

  const resetGame = () => {
    const size = boardSize || 3
    const cells = size * size
    const initialBoard = Array(cells).fill(null)
    setBoard(initialBoard)
    setIsXNext(true)
    setWinner(null)
    setWinningLine(null)
    setGameStatus(`Next player: ${player1Name}`)
    setMoveHistory([{ board: initialBoard, isXNext: true }])
    setCurrentStep(0)
    setTimeLeft(timerDuration)
    setIsTimerActive(false)
    setGameStarted(false)
    setMoveCount(0)
  }

  const jumpToStep = (step: number) => {
    setCurrentStep(step)
    setBoard(moveHistory[step].board)
    setIsXNext(moveHistory[step].isXNext)
    setMoveCount(step)

    if (step === 0) {
      setWinner(null)
      setWinningLine(null)
      setGameStatus(`Next player: ${moveHistory[step].isXNext ? player1Name : player2Name}`)
      setGameStarted(false)
      setIsTimerActive(false)
    } else {
      setGameStarted(true)
      const result = checkGameResult(moveHistory[step].board)
      if (result.winner) {
        setWinner(result.winner)
        setWinningLine(result.line)
        setGameStatus(`Winner: ${result.winner === player1Symbol ? player1Name : player2Name}`)
        setIsTimerActive(false)
      } else if (result.isDraw) {
        setGameStatus("Game ended in a draw!")
        setIsTimerActive(false)
      } else {
        setGameStatus(`Next player: ${moveHistory[step].isXNext ? player1Name : player2Name}`)
        if (timerEnabled) {
          setTimeLeft(timerDuration)
          setIsTimerActive(true)
        }
      }
    }
  }

  const checkGameResult = (squares: (string | null)[]) => {
    const size = boardSize || 3
    const condition = Math.min(winCondition, size)

    // Generate winning lines based on board size and win condition
    const lines = []

    // Check rows
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - condition; col++) {
        const line = []
        for (let i = 0; i < condition; i++) {
          line.push(row * size + (col + i))
        }
        lines.push(line)
      }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - condition; row++) {
        const line = []
        for (let i = 0; i < condition; i++) {
          line.push((row + i) * size + col)
        }
        lines.push(line)
      }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row <= size - condition; row++) {
      for (let col = 0; col <= size - condition; col++) {
        const line = []
        for (let i = 0; i < condition; i++) {
          line.push((row + i) * size + (col + i))
        }
        lines.push(line)
      }
    }

    // Check diagonals (top-right to bottom-left)
    for (let row = 0; row <= size - condition; row++) {
      for (let col = size - 1; col >= condition - 1; col--) {
        const line = []
        for (let i = 0; i < condition; i++) {
          line.push((row + i) * size + (col - i))
        }
        lines.push(line)
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const lineIndices = lines[i]
      const firstSymbol = squares[lineIndices[0]]

      if (!firstSymbol) continue

      let isWinningLine = true
      for (let j = 1; j < lineIndices.length; j++) {
        if (squares[lineIndices[j]] !== firstSymbol) {
          isWinningLine = false
          break
        }
      }

      if (isWinningLine) {
        return { winner: firstSymbol, line: lineIndices, isDraw: false }
      }
    }

    // Check for draw
    const isDraw = squares.every((cell) => cell !== null)
    return { winner: null, line: null, isDraw }
  }

  // Get the grid columns style based on board size
  const getGridStyle = () => {
    const size = boardSize || 3
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gap: "8px",
      width: "100%",
    }
  }

  // Format time for display
  const formatTime = (seconds: number) => {
    return `${seconds}s`
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-xl p-4" style={getContainerStyle()}>
      <div className="mb-2 text-center text-lg font-medium">{gameStatus}</div>

      {/* Score and timer display */}
      <div className="mb-4 flex justify-between w-full px-2">
        <div className="text-center">
          <span className="font-bold">{player1Name}</span>
          <div className="text-xl font-bold">{player1Score}</div>
        </div>

        {timerEnabled && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock size={16} />
              <span className="font-medium">Timer</span>
            </div>
            <div className={`text-xl font-bold ${timeLeft <= 3 && isTimerActive ? "text-red-500 animate-pulse" : ""}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        )}

        <div className="text-center">
          <span className="font-bold">{player2Name}</span>
          <div className="text-xl font-bold">{player2Score}</div>
        </div>
      </div>

      {/* Game info */}
      <div className="mb-4 flex justify-center gap-2 text-sm">
        <div className="bg-black/20 px-2 py-1 rounded-md">
          {boardSize}x{boardSize} Board
        </div>
        <div className="bg-black/20 px-2 py-1 rounded-md">{winCondition} in a row</div>
        {moveCount > 0 && <div className="bg-black/20 px-2 py-1 rounded-md">Move: {moveCount}</div>}
      </div>

      {/* Game board */}
      <div style={getGridStyle()}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={`flex h-16 w-full items-center justify-center rounded-lg border border-white/20 text-2xl font-bold transition-all ${
              animationsEnabled ? "hover:opacity-90 hover:scale-105" : "hover:opacity-90"
            } ${timerEnabled && isTimerActive && timeLeft <= 3 && !cell && !winner ? "animate-pulse" : ""}`}
            style={getCellStyle(index)}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner || currentStep < moveHistory.length - 1}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Game controls */}
      <div className="mt-4 flex gap-2">
        <button
          className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-all hover:bg-white/30 flex items-center gap-1"
          onClick={resetGame}
        >
          <RotateCcw size={16} />
          Reset Game
        </button>

        {/* Undo button */}
        <button
          className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-all hover:bg-white/30 disabled:opacity-50 flex items-center gap-1"
          onClick={() => currentStep > 0 && jumpToStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Undo
        </button>
      </div>

      {/* Timer controls */}
      {timerEnabled && gameStarted && !winner && (
        <div className="mt-2 flex gap-2">
          <button
            className={`rounded-lg ${
              isTimerActive ? "bg-red-500/70" : "bg-green-500/70"
            } px-4 py-1 text-sm font-medium transition-all hover:bg-opacity-80 flex items-center gap-1`}
            onClick={() => setIsTimerActive(!isTimerActive)}
          >
            <Timer size={14} />
            {isTimerActive ? "Pause Timer" : "Resume Timer"}
          </button>
        </div>
      )}

      {/* Move history */}
      {moveHistory.length > 1 && (
        <div className="mt-4 w-full">
          <h3 className="text-sm font-medium mb-2">Game History:</h3>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-2 bg-black/20 rounded-lg">
            {moveHistory.map((_, step) => (
              <button
                key={step}
                className={`text-xs px-2 py-1 rounded ${
                  currentStep === step ? "bg-violet-600 text-white" : "bg-white/10 hover:bg-white/20"
                }`}
                onClick={() => jumpToStep(step)}
              >
                {step === 0 ? "Start" : `Move ${step}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Game stats */}
      {fastestWin && (
        <div className="mt-4 w-full">
          <div className="flex items-center gap-1 text-sm text-yellow-300 mb-1">
            <Award size={14} />
            <span>Fastest win: {fastestWin} moves</span>
          </div>
        </div>
      )}

      {/* Timer warning */}
      {timerEnabled && timeLeft <= 3 && isTimerActive && !winner && (
        <div className="mt-4 flex items-center gap-2 bg-red-500/20 p-2 rounded-lg animate-pulse">
          <AlertTriangle size={16} className="text-red-400" />
          <span className="text-sm">Time is running out!</span>
        </div>
      )}
    </div>
  )
}

