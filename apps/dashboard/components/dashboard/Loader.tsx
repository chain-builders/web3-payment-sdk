import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
    <h1 className="text-2xl font-clash-display font-semibold text-purple-800">
      Paytron
    </h1>
    <p className="text-gray-500 mt-1">
      Stable Coin payment infrastructure for your apps
    </p>
    <div className="mt-4"><Loader2 size="20" color="purple" className="animate-spin" /></div>
  </div>
  )
}

export default Loader