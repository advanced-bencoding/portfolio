'use client';

import React from 'react'
import NavigationButton, { NavigationButtonProps } from '../components/NavigationButton';
import { NavButtons } from './constants';

const projectsClickHandler = (path: keyof typeof NavButtons) => {
    console.log(path);
}

const navigationOptions: NavigationButtonProps[] = [
    {
        text: NavButtons.PROJECTS,
        onClick: () => { projectsClickHandler("PROJECTS") }
    },
    {
        text: NavButtons.CAREER,
        onClick: () => { projectsClickHandler("CAREER") }
    },
    {
        text: NavButtons.EDUCATION,
        onClick: () => { projectsClickHandler("EDUCATION") }
    },
    {
        text: NavButtons.ABOUT,
        onClick: () => { projectsClickHandler("ABOUT") }
    }
];

const NavigationButtonWrapper = ({ text, onClick }: NavigationButtonProps) => {
  return (
    <div className='mr-20 text-2xl'>
        <NavigationButton text={text} onClick={onClick} />
    </div>
  )
}


const NavigationPanel = () => {
  return (
    <div className='flex'>
        {navigationOptions.map((option) => <NavigationButtonWrapper key={option.text} text={option.text} onClick={option.onClick} />)}
    </div>
  )
}

export default NavigationPanel