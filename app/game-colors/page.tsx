"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, ImageIcon, Palette } from "lucide-react"
import { useGameStore } from "@/lib/store"
import { motion } from "framer-motion"

export default function GameColorsPage() {
  const router = useRouter()
  const { cellColor, cellImage, setCellColor, setCellImage } = useGameStore()
  const [colorInput, setColorInput] = useState(cellColor)
  const [imageInput, setImageInput] = useState(cellImage || "")
  const [activeTab, setActiveTab] = useState(cellImage ? "image" : "color")

  const handleNext = () => {
    if (activeTab === "color") {
      setCellColor(colorInput)
      setCellImage("")
    } else {
      setCellImage(imageInput)
    }
    router.push("/player-symbols")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden"
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
          <Link href="/background">
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">Step 2: Choose Game Colors</h2>
          <div className="w-20"></div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 rounded-xl bg-black/20 p-6 backdrop-blur-sm border border-white/10 shadow-xl"
        >
          <div className="mb-6 flex gap-2">
            <Button
              variant={activeTab === "color" ? "default" : "outline"}
              onClick={() => setActiveTab("color")}
              className={activeTab === "color" ? "bg-violet-600 hover:bg-violet-700" : ""}
            >
              <Palette size={16} className="mr-2" />
              Color
            </Button>
            <Button
              variant={activeTab === "image" ? "default" : "outline"}
              onClick={() => setActiveTab("image")}
              className={activeTab === "image" ? "bg-violet-600 hover:bg-violet-700" : ""}
            >
              <ImageIcon size={16} className="mr-2" />
              Image URL
            </Button>
          </div>

          {activeTab === "color" ? (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cell-color">Cell Color</Label>
                <Input
                  id="cell-color"
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="h-12 w-full cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["#2d2d42", "#4a2d42", "#2d424a", "#424a2d", "#3d2d4a"].map((color) => (
                  <button
                    key={color}
                    className="h-8 w-full rounded-md border border-white/20 transition-all hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => setColorInput(color)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cell-image">Cell Background Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="cell-image"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <p className="text-sm text-gray-400">Sample Images:</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                    "https://images.unsplash.com/photo-1557682250-33bd709cbe85",
                    "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a",
                  ].map((url) => (
                    <button
                      key={url}
                      className="h-16 rounded-md border border-white/20 bg-cover bg-center transition-all hover:scale-105"
                      style={{ backgroundImage: `url(${url})` }}
                      onClick={() => setImageInput(url)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium">Preview</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array(9)
                .fill(null)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex h-20 w-full items-center justify-center rounded-lg border border-white/20 text-2xl font-bold transition-all duration-300"
                    style={{
                      backgroundColor: activeTab === "color" ? colorInput : undefined,
                      backgroundImage: activeTab === "image" && imageInput ? `url(${imageInput})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {i % 2 === 0 ? "X" : "O"}
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

