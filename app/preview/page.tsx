"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { useGameStore } from "@/lib/store"
import TicTacToe from "@/components/tic-tac-toe"
import { generateGameHTML } from "@/lib/generate-html"
import JSZip from "jszip"

export default function PreviewPage() {
  const gameConfig = useGameStore()
  const [downloading, setDownloading] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  const handleDownload = async () => {
    try {
      setDownloading(true)
      const html = generateGameHTML(gameConfig)

      // Create a zip file
      const zip = new JSZip()

      // Add HTML file
      zip.file("tic-tac-toe-game.html", html)

      // Add sound files
      try {
        // We'll use placeholder URLs for the sound files
        const moveSound = await fetch("https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3")
        const winSound = await fetch("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3")
        const drawSound = await fetch("https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3")

        if (moveSound.ok) zip.file("move.mp3", await moveSound.blob())
        if (winSound.ok) zip.file("win.mp3", await winSound.blob())
        if (drawSound.ok) zip.file("draw.mp3", await drawSound.blob())
      } catch (error) {
        console.error("Error adding sound files:", error)
      }

      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)

      // Create a link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = "tic-tac-toe-game.zip"
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Custom Tic Tac Toe Game",
          text: "Check out this custom Tic Tac Toe game I created with Code DropX Game Builder!",
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        setShareMessage("Copy this link to share: " + window.location.href)
        setTimeout(() => setShareMessage(""), 3000)
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const themeClasses = {
    default: "from-indigo-900 via-purple-900 to-pink-800",
    ocean: "from-blue-900 via-cyan-800 to-teal-700",
    sunset: "from-orange-700 via-red-800 to-pink-900",
    forest: "from-green-900 via-emerald-800 to-teal-800",
    midnight: "from-slate-900 via-indigo-950 to-purple-950",
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-br ${themeClasses[gameConfig.theme as keyof typeof themeClasses] || themeClasses.default} text-white`}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16">
        <div className="flex items-center justify-between">
          <Link href="/player-symbols">
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">Game Preview</h2>
          <div className="w-20"></div>
        </div>

        <div className="mt-4 rounded-xl bg-black/20 p-6 backdrop-blur-sm border border-white/10 shadow-xl">
          <h3 className="mb-6 text-center text-xl font-medium">Your Custom Tic Tac Toe Game</h3>

          <div className="flex justify-center">
            <TicTacToe />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-900/30 hover:shadow-green-800/40"
            >
              <Download size={18} className="mr-2" />
              {downloading ? "Generating ZIP..." : "Download Game (ZIP)"}
            </Button>

            <Button
              onClick={handleShare}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-900/30 hover:shadow-blue-800/40"
            >
              <Share2 size={18} className="mr-2" />
              Share Game
            </Button>
          </div>

          {shareMessage && <div className="mt-4 p-3 bg-black/30 rounded-lg text-center text-sm">{shareMessage}</div>}

          <p className="mt-4 text-center text-sm text-gray-400">
            Your game will be downloaded as a ZIP file containing the HTML file and sound effects that you can open in
            any browser.
          </p>
        </div>
      </div>
    </div>
  )
}

