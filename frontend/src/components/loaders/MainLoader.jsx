import React from 'react'

export const MainLoader = () => {
  return (
    <div className="flex justify-center items-center h-full fixed w-full top-0 left-0 bg-dark-color z-90">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
    </div>
  )
}
