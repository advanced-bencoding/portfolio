import ExtraInfoContainer from "@/components/LeftPanel/ExtraInfoContainer";
import { ExtraInfoItemProps } from "@/components/LeftPanel/ExtraInfoItem";

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
    <main className="h-full">
      <div className="flex h-full">
        <section className="h-full min-w-96 gap-2 w-[25%]">
          <ExtraInfoContainer extraInfo={extraInfoItems}/>
        </section>
        <section className="h-full w-[75%]">hello</section>
      </div>
    </main>
  );
}
