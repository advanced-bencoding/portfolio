import React from 'react'

const ContentDisplayPanel = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="flex-grow bg-gray-700">{children}</div>
  )
}

export default ContentDisplayPanel