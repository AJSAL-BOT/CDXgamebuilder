"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  User,
  Settings,
  Palette,
  Volume2,
  VolumeX,
  RotateCcw,
  Timer,
  Type,
  Award,
  BarChart2,
} from "lucide-react"
import { useGameStore } from "@/lib/store"
import { motion } from "framer-motion"

export default function PlayerSymbolsPage() {
  const router = useRouter()
  const {
    player1Symbol,
    player2Symbol,
    player1Name,
    player2Name,
    boardSize,
    soundEnabled,
    player1Score,
    player2Score,
    theme,
    timerEnabled,
    timerDuration,
    customFontFamily,
    borderStyle,
    winCondition,
    animationsEnabled,
    gamesPlayed,
    player1Wins,
    player2Wins,
    draws,
    achievements,
    gameTitle,
    setPlayer1Symbol,
    setPlayer2Symbol,
    setPlayer1Name,
    setPlayer2Name,
    setBoardSize,
    setSoundEnabled,
    resetScores,
    setTheme,
    setTimerEnabled,
    setTimerDuration,
    setCustomFontFamily,
    setBorderStyle,
    setWinCondition,
    setAnimationsEnabled,
    resetGameStats,
    setGameTitle,
  } = useGameStore()

  const [symbol1, setSymbol1] = useState(player1Symbol)
  const [symbol2, setSymbol2] = useState(player2Symbol)
  const [name1, setName1] = useState(player1Name)
  const [name2, setName2] = useState(player2Name)
  const [selectedBoardSize, setSelectedBoardSize] = useState(boardSize)
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundEnabled)
  const [selectedTheme, setSelectedTheme] = useState(theme)
  const [isTimerEnabled, setIsTimerEnabled] = useState(timerEnabled)
  const [selectedTimerDuration, setSelectedTimerDuration] = useState(timerDuration)
  const [selectedFont, setSelectedFont] = useState(customFontFamily)
  const [selectedBorderStyle, setSelectedBorderStyle] = useState(borderStyle)
  const [selectedWinCondition, setSelectedWinCondition] = useState(winCondition)
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(animationsEnabled)
  const [title, setTitle] = useState(gameTitle)
  const [activeTab, setActiveTab] = useState("players")

  const handleNext = () => {
    setPlayer1Symbol(symbol1 || "X")
    setPlayer2Symbol(symbol2 || "O")
    setPlayer1Name(name1 || "Player 1")
    setPlayer2Name(name2 || "Player 2")
    setBoardSize(selectedBoardSize)
    setSoundEnabled(isSoundEnabled)
    setTheme(selectedTheme)
    setTimerEnabled(isTimerEnabled)
    setTimerDuration(selectedTimerDuration)
    setCustomFontFamily(selectedFont)
    setBorderStyle(selectedBorderStyle)
    setWinCondition(selectedWinCondition)
    setAnimationsEnabled(isAnimationsEnabled)
    setGameTitle(title || "Tic Tac Toe")
    router.push("/preview")
  }

  const popularEmojis = ["😀", "😎", "🔥", "⭐", "❤️", "🚀", "🎮", "🎯", "🎲", "🎪"]

  const themes = [
    { id: "default", name: "Default", bg: "from-indigo-900 via-purple-900 to-pink-800" },
    { id: "ocean", name: "Ocean", bg: "from-blue-900 via-cyan-800 to-teal-700" },
    { id: "sunset", name: "Sunset", bg: "from-orange-700 via-red-800 to-pink-900" },
    { id: "forest", name: "Forest", bg: "from-green-900 via-emerald-800 to-teal-800" },
    { id: "midnight", name: "Midnight", bg: "from-slate-900 via-indigo-950 to-purple-950" },
  ]

  const fonts = [
    { id: "default", name: "Default", family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    { id: "serif", name: "Serif", family: "Georgia, 'Times New Roman', serif" },
    { id: "mono", name: "Monospace", family: "'Courier New', monospace" },
    { id: "rounded", name: "Rounded", family: "'Comic Sans MS', cursive" },
    { id: "elegant", name: "Elegant", family: "'Palatino Linotype', serif" },
  ]

  const borderStyles = [
    { id: "solid", name: "Solid" },
    { id: "dashed", name: "Dashed" },
    { id: "dotted", name: "Dotted" },
    { id: "double", name: "Double" },
    { id: "ridge", name: "Ridge" },
  ]

  const getThemeClasses = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    return theme ? theme.bg : themes[0].bg
  }

  // Play a test sound when toggling sound
  const playTestSound = () => {
    try {
      const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3")
      audio.volume = 0.5
      audio.play()
    } catch (error) {
      console.error("Error playing test sound:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex min-h-screen flex-col bg-gradient-to-br ${getThemeClasses(selectedTheme)} text-white overflow-hidden`}
      style={{ fontFamily: fonts.find((f) => f.id === selectedFont)?.family }}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <Link href="/game-colors">
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">Step 3: Game Settings</h2>
          <div className="w-20"></div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 rounded-xl bg-black/20 p-6 backdrop-blur-sm border border-white/10 shadow-xl"
        >
          <div className="w-full">
            <div className="grid w-full grid-cols-4 mb-6 inline-flex h-10 items-center justify-center rounded-md bg-black/30 p-1">
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === "players" ? "bg-violet-600 text-white shadow-sm" : "text-gray-300 hover:bg-black/20"
                }`}
                onClick={() => setActiveTab("players")}
              >
                <User size={16} className="mr-2" />
                Players
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === "settings" ? "bg-violet-600 text-white shadow-sm" : "text-gray-300 hover:bg-black/20"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings size={16} className="mr-2" />
                Game Settings
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === "themes" ? "bg-violet-600 text-white shadow-sm" : "text-gray-300 hover:bg-black/20"
                }`}
                onClick={() => setActiveTab("themes")}
              >
                <Palette size={16} className="mr-2" />
                Themes
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === "stats" ? "bg-violet-600 text-white shadow-sm" : "text-gray-300 hover:bg-black/20"
                }`}
                onClick={() => setActiveTab("stats")}
              >
                <BarChart2 size={16} className="mr-2" />
                Stats
              </button>
            </div>

            <div className={`space-y-6 ${activeTab === "players" ? "block" : "hidden"}`}>
              <div className="grid gap-4">
                <Label htmlFor="game-title">Game Title</Label>
                <div className="flex gap-2">
                  <Input
                    id="game-title"
                    type="text"
                    placeholder="Tic Tac Toe"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-base"
                  />
                  <Button variant="outline" className="flex items-center gap-1" onClick={() => setTitle("Tic Tac Toe")}>
                    <RotateCcw size={14} />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="player1-name">Player 1 Name</Label>
                    <Input
                      id="player1-name"
                      type="text"
                      placeholder="Player 1"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="player1-symbol">Player 1 Symbol</Label>
                    <Input
                      id="player1-symbol"
                      type="text"
                      placeholder="X"
                      value={symbol1}
                      onChange={(e) => setSymbol1(e.target.value)}
                      maxLength={2}
                      className="text-center text-xl"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularEmojis.slice(0, 5).map((emoji) => (
                        <button
                          key={emoji}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-lg transition-all hover:bg-white/10 hover:scale-110"
                          onClick={() => setSymbol1(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/20 bg-violet-500/20 text-3xl font-bold shadow-lg"
                    >
                      {symbol1 || "X"}
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="player2-name">Player 2 Name</Label>
                    <Input
                      id="player2-name"
                      type="text"
                      placeholder="Player 2"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      className="text-base"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="player2-symbol">Player 2 Symbol</Label>
                    <Input
                      id="player2-symbol"
                      type="text"
                      placeholder="O"
                      value={symbol2}
                      onChange={(e) => setSymbol2(e.target.value)}
                      maxLength={2}
                      className="text-center text-xl"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularEmojis.slice(5, 10).map((emoji) => (
                        <button
                          key={emoji}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-lg transition-all hover:bg-white/10 hover:scale-110"
                          onClick={() => setSymbol2(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -5 }}
                      className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/20 bg-pink-500/20 text-3xl font-bold shadow-lg"
                    >
                      {symbol2 || "O"}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Score display and reset */}
              <div className="mt-4 p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Current Scores:</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs" onClick={resetScores}>
                    <RotateCcw size={12} />
                    Reset
                  </Button>
                </div>
                <div className="flex justify-around">
                  <div className="text-center">
                    <div className="text-xs">{player1Name}</div>
                    <div className="text-xl font-bold">{player1Score}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs">{player2Name}</div>
                    <div className="text-xl font-bold">{player2Score}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${activeTab === "settings" ? "block" : "hidden"}`}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Board Size</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[3, 4, 5].map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant={selectedBoardSize === size ? "default" : "outline"}
                          className={selectedBoardSize === size ? "bg-violet-600 hover:bg-violet-700" : ""}
                          onClick={() => setSelectedBoardSize(size)}
                        >
                          {size}x{size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Sound Effects</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={isSoundEnabled ? "default" : "outline"}
                        className={isSoundEnabled ? "bg-violet-600 hover:bg-violet-700" : ""}
                        onClick={() => {
                          setIsSoundEnabled(true)
                          playTestSound()
                        }}
                      >
                        <Volume2 size={16} className="mr-2" />
                        Enabled
                      </Button>
                      <Button
                        type="button"
                        variant={!isSoundEnabled ? "default" : "outline"}
                        className={!isSoundEnabled ? "bg-violet-600 hover:bg-violet-700" : ""}
                        onClick={() => setIsSoundEnabled(false)}
                      >
                        <VolumeX size={16} className="mr-2" />
                        Disabled
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Win Condition</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[3, 4, 5].map((condition) => (
                        <Button
                          key={condition}
                          type="button"
                          variant={selectedWinCondition === condition ? "default" : "outline"}
                          className={selectedWinCondition === condition ? "bg-violet-600 hover:bg-violet-700" : ""}
                          onClick={() => setSelectedWinCondition(condition)}
                          disabled={condition > selectedBoardSize}
                        >
                          {condition} in a row
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">Win condition cannot exceed board size</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Move Timer</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={isTimerEnabled ? "default" : "outline"}
                        className={isTimerEnabled ? "bg-violet-600 hover:bg-violet-700" : ""}
                        onClick={() => setIsTimerEnabled(true)}
                      >
                        <Timer size={16} className="mr-2" />
                        Enabled
                      </Button>
                      <Button
                        type="button"
                        variant={!isTimerEnabled ? "default" : "outline"}
                        className={!isTimerEnabled ? "bg-violet-600 hover:bg-violet-700" : ""}
                        onClick={() => setIsTimerEnabled(false)}
                      >
                        <Timer size={16} className="mr-2" />
                        Disabled
                      </Button>
                    </div>
                  </div>

                  {isTimerEnabled && (
                    <div className="grid gap-2">
                      <Label>Timer Duration (seconds)</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[5, 10, 15].map((duration) => (
                          <Button
                            key={duration}
                            type="button"
                            variant={selectedTimerDuration === duration ? "default" : "outline"}
                            className={selectedTimerDuration === duration ? "bg-violet-600 hover:bg-violet-700" : ""}
                            onClick={() => setSelectedTimerDuration(duration)}
                          >
                            {duration}s
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label>Animations</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={isAnimationsEnabled ? "default" : "outline"}
                        className={isAnimationsEnabled ? "bg-violet-600 hover:bg-violet-700" : ""}
                        onClick={() => setIsAnimationsEnabled(true)}
                      >
                        Enabled
                      </Button>
                      <Button
                        type="button"
                        variant={!isAnimationsEnabled ? "default" : "outline"}
                        className={!isAnimationsEnabled ? "bg-violet-600 hover:bg-violet-700" : ""}
                        onClick={() => setIsAnimationsEnabled(false)}
                      >
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${activeTab === "themes" ? "block" : "hidden"}`}>
              <div className="grid gap-4">
                <Label>Select Theme</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      className={`h-20 rounded-lg bg-gradient-to-br ${theme.bg} p-1 transition-all hover:scale-105 ${
                        selectedTheme === theme.id ? "ring-2 ring-white" : "opacity-80"
                      }`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-md bg-black/20 font-medium">
                        {theme.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <Label>Font Style</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      className={`h-16 rounded-lg bg-black/20 p-1 transition-all hover:scale-105 ${
                        selectedFont === font.id ? "ring-2 ring-white" : "opacity-80"
                      }`}
                      onClick={() => setSelectedFont(font.id)}
                      style={{ fontFamily: font.family }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-md font-medium">
                        <Type size={16} className="mr-2" />
                        {font.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <Label>Border Style</Label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {borderStyles.map((style) => (
                    <button
                      key={style.id}
                      className={`h-16 rounded-lg bg-black/20 p-1 transition-all hover:scale-105 ${
                        selectedBorderStyle === style.id ? "ring-2 ring-white" : "opacity-80"
                      }`}
                      onClick={() => setSelectedBorderStyle(style.id)}
                    >
                      <div
                        className="flex h-full w-full items-center justify-center rounded-md font-medium"
                        style={{
                          border: `2px ${style.id} rgba(255,255,255,0.5)`,
                          borderRadius: "0.375rem",
                        }}
                      >
                        {style.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${activeTab === "stats" ? "block" : "hidden"}`}>
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Game Statistics</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={resetGameStats}>
                    <RotateCcw size={14} />
                    Reset Stats
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">Games Played</div>
                    <div className="text-2xl font-bold">{gamesPlayed}</div>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">{player1Name} Wins</div>
                    <div className="text-2xl font-bold">{player1Wins}</div>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">{player2Name} Wins</div>
                    <div className="text-2xl font-bold">{player2Wins}</div>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">Draws</div>
                    <div className="text-2xl font-bold">{draws}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-3">Achievements</h3>
                  {achievements.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 bg-black/20 p-2 rounded-lg">
                          <Award className="text-yellow-400" size={18} />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-black/20 p-4 rounded-lg text-center text-gray-400">
                      No achievements yet. Keep playing to earn them!
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-3">Win Rate</h3>
                  <div className="bg-black/20 p-4 rounded-lg">
                    {gamesPlayed > 0 ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>{player1Name}</span>
                          <span>{gamesPlayed > 0 ? Math.round((player1Wins / gamesPlayed) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2.5">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{ width: `${gamesPlayed > 0 ? (player1Wins / gamesPlayed) * 100 : 0}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>{player2Name}</span>
                          <span>{gamesPlayed > 0 ? Math.round((player2Wins / gamesPlayed) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2.5">
                          <div
                            className="bg-pink-600 h-2.5 rounded-full"
                            style={{ width: `${gamesPlayed > 0 ? (player2Wins / gamesPlayed) * 100 : 0}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Draws</span>
                          <span>{gamesPlayed > 0 ? Math.round((draws / gamesPlayed) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2.5">
                          <div
                            className="bg-yellow-600 h-2.5 rounded-full"
                            style={{ width: `${gamesPlayed > 0 ? (draws / gamesPlayed) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">Play some games to see your win rate statistics!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium">Preview</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array(9)
                .fill(null)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex h-16 w-full items-center justify-center rounded-lg border border-white/20 bg-violet-500/20 text-2xl font-bold shadow-md"
                    style={{
                      borderStyle: selectedBorderStyle,
                      fontFamily: fonts.find((f) => f.id === selectedFont)?.family,
                    }}
                  >
                    {i % 2 === 0 ? symbol1 || "X" : i % 3 === 0 ? symbol2 || "O" : ""}
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex justify-end"
        >
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 shadow-lg shadow-purple-900/50 hover:shadow-purple-800/50 transition-all duration-300"
          >
            Next
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

