import ExtraInfoContainer from "@/components/left_panel/ExtraInfoContainer";
import { ExtraInfoItemProps } from "@/components/left_panel/ExtraInfoItem";
import InfoItem from "@/components/main_content/InfoItem";

const extraInfoItems: ExtraInfoItemProps[] = [
  {
    title: "Hobbies",
    useBullets: true,
    items: ["guitar", "coding", "cooking"]
  },
  {
    title: "Contact Details",
    useBullets: false,
    items: ["Address: Hari Nagar", "Mobile: 7678691337"]
  }
]

export default function Home() {
  return (
    <main className="h-full justify-center flex">
      <div className="flex h-full w-[75%]">
        <section className="h-full min-w-96 gap-2 w-[20%]">
          <ExtraInfoContainer extraInfo={extraInfoItems}/>
        </section>
        <section className="h-full w-[80%] p-5 mt-7">
          <InfoItem flowChartMode organisation="Indus Valley Partners" place="Noida" infoItems={[]} />
        </section>
      </div>
    </main>
  );
}
