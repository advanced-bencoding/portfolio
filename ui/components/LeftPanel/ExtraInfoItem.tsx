import React from 'react'

export interface ExtraInfoItemProps {
    title: string;
    items: string[];
    useBullets: boolean;
}

const ExtraInfoItem = (props: ExtraInfoItemProps) => {
    const { items, title, useBullets } = props;
  return (
    <div>
        <p className='font-bold'>{title}</p>
        {useBullets && <ul className='list-disc list-inside'>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>}
        {!useBullets && <div>{items.map(item => <p key={item}>{item}</p>)}</div>}
    </div>
  )
}

export default ExtraInfoItem