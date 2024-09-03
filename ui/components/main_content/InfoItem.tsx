import React from 'react'

interface InfoItemProps {
    organisation: string;
    place: string;
    flowChartMode: boolean;
    infoItems: InfoItem[];
}

interface InfoItem {
    role: string;
    startDate: string;
    endDate?: string;
    skillTags: string[];
}

const InfoItem = (props: InfoItemProps) => {
  const { organisation, place, flowChartMode, infoItems } = props; 
  return (
    <div>InfoItem</div>
  )
}

export default InfoItem