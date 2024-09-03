import React from 'react'

export interface ExtraInfoItemProps {
    title: string;
    items: string[];
    useBullets: boolean;
}

const ExtraInfoItem = (props: ExtraInfoItemProps) => {
    const { items, title, useBullets } = props;
  return (
    <article className='bg-slate-100/60 rounded-lg p-4 shadow'>
        <h3 className='font-bold'>{title}</h3>
        {useBullets && <ul className='list-disc list-inside'>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>}
        {!useBullets && <div>{items.map(item => <p key={item}>{item}</p>)}</div>}
    </article>
  )
}

export default ExtraInfoItem