import React from 'react'
import ExtraInfoItem, { ExtraInfoItemProps } from './ExtraInfoItem'

interface ExtraInfoContainerProps {
    extraInfo: ExtraInfoItemProps[];
}

const ExtraInfoContainer = (props: ExtraInfoContainerProps) => {
  return (
    <div>
        {props.extraInfo.map(extraInfo => <ExtraInfoItem key={extraInfo.title} items={extraInfo.items} title={extraInfo.title} useBullets={extraInfo.useBullets} />)}
    </div>
  )
}

export default ExtraInfoContainer