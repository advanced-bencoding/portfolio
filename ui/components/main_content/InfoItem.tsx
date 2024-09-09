import React from 'react'

interface InfoItemProps {
  accordionTitle: string;
  infoItems: InfoItem[];
}

interface InfoItem {
    organisation: string;
    place: string;
    flowChartMode: boolean;
    infoItems: InfoDescription[];
}

interface InfoDescription {
    role: string;
    startDate: string;
    endDate?: string;
    skillTags: string[];
}

const InfoItem = (props: InfoItemProps) => {
  const { accordionTitle, infoItems } = props; 
  return (
    <article className="collapse collapse-arrow bg-slate-100/60 rounded-lg p-4 shadow">
      <input type='checkbox' name={accordionTitle} defaultChecked />
      <h3 className="collapse-title text-xl font-medium">{accordionTitle}</h3>
      <div className='collapse-content'>
        {infoItems.map(infoItem => (
          <div key={infoItem.organisation}>
            <h3>{infoItem.organisation} {infoItem.place}</h3>
            <div>
              {infoItem.infoItems.map(description => <p key={description.role}>{description.role}</p>)}
            </div>
          </div>
      ))}
      </div>
    </article>
  )
}

export default InfoItem