import React from 'react'

export interface NavigationButtonProps {
    text: string;
    onClick: () => void;
}

const NavigationButton = ({ text, onClick }: NavigationButtonProps) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default NavigationButton