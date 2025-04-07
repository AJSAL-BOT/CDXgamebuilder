import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Youtube, Star, Volume2, Grid3X3 } from "lucide-react"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="animate-fade-in-up container relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <div className="relative">
          <div className="flex items-center justify-center mb-2">
            <Image src="https://media-hosting.imagekit.io//e1d3a872162f40dd/Untitled%20design%20(3)%20(1).png?Expires=1835753664&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wNdDbzf8O-jaaK12XEopSSTgjbnoPJt9x~6sflhv8EF5f5umNgZXwJhH2t1DcqGKk-w~7XsVJuHU2y4gCbrUbtr64zxMkrmP~2fXvqbIQiU5Ru3FPk-r-efSF19xYuqJorq0EaHsP4qTs~VfqADZzAk~hgSReo9o1U1MbgVPzWfqQ6lw3vODPbuCS4Hh7kV14pox9f-mhJPTPNYMYY8ES2czMB9elEhqlc3zzlqBN9o1L1ic17E~HsqumQuAJAtV5Ld11-Y7WcjOzHYipL2bQksUtTwWmPevlFIymGwv3kc-tC4X8Jp~N0~us8jGfG1IjHtrb0-gzZozhYZw9cxjRg__" width={80} height={80} alt="Code DropX Logo" className="animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Code DropX
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              {" "}
              Game Builder
            </span>
          </h1>
          <div className="absolute -right-12 -top-6 animate-pulse text-yellow-300">
            <Sparkles size={40} />
          </div>
        </div>

        <p className="max-w-xl text-xl text-gray-300">
          Create your own custom Tic Tac Toe game with personalized colors, backgrounds, sounds, and player symbols.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Grid3X3 size={18} className="text-pink-400" />
            <span>Custom Board Sizes</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Volume2 size={18} className="text-green-400" />
            <span>Sound Effects</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Star size={18} className="text-yellow-400" />
            <span>AI Opponent</span>
          </div>
        </div>

        <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-4 perspective">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`flex h-20 w-20 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 text-3xl font-bold backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 hover:rotate-y-12 ${
                  i % 2 === 0 ? "text-pink-400" : "text-violet-400"
                }`}
              >
                {i === 0 || i === 4 || i === 8 ? "X" : i === 2 || i === 6 ? "O" : ""}
              </div>
            ))}
        </div>

        <div className="mt-8 animate-bounce">
          <Link href="/background">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-violet-600 text-lg hover:from-pink-700 hover:to-violet-700 shadow-lg shadow-purple-900/50 hover:shadow-purple-800/50 transition-all duration-300"
            >
              Start Building
            </Button>
          </Link>
        </div>

        <a
          href="http://www.youtube.com/@Code-DropX"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-full px-6 py-3 font-medium animate-pulse-slow"
        >
          <Youtube size={24} />
          Subscribe to Code DropX on YouTube
        </a>
      </div>
    </div>
  )
}

