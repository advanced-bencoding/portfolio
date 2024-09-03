import React from 'react'
import ExtraInfoItem, { ExtraInfoItemProps } from './ExtraInfoItem'

interface ExtraInfoContainerProps {
    extraInfo: ExtraInfoItemProps[];
}

const ExtraInfoContainer = (props: ExtraInfoContainerProps) => {
  return (
    <div className='p-5 border h-full'>
        {props.extraInfo.map(extraInfo =>
        <section key={extraInfo.title} className='mt-7'>
          <ExtraInfoItem items={extraInfo.items} title={extraInfo.title} useBullets={extraInfo.useBullets} />
        </section>
        )}
    </div>
  )
}

export default ExtraInfoContainer