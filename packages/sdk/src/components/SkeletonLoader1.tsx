import React from 'react'

const SkeletonLoader1 = () => {
  return (
    
    <div className="relative pt-10">
    <div className="h-full">
      <div className="animate-pulse">
        {/* Currency Dropdown Skeleton */}
        <div className="h-8  bg-gray-200 rounded-full mb-4 w-1/3 mx-auto"></div>
        
        {/* Amount Display Skeleton */}
        <div className="h-16 w-2/4 bg-gray-200 rounded-lg mx-auto mb-4"></div>
        
        {/* Balance Skeleton */}
        <div className="h-6 w-1/2 bg-gray-200 rounded-lg mx-auto"></div>
      </div>
      
      {/* Button Skeleton */}
      <div className="w-full mt-6 flex justify-center px-10">
        <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div> 
  )
}

export default SkeletonLoader1