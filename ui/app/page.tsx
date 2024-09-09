import ExtraInfoContainer from "@/components/left_panel/ExtraInfoContainer";
import { ExtraInfoItemProps } from "@/components/left_panel/ExtraInfoItem";
import InfoItem from "@/components/main_content/InfoItem";
import { Experience } from "@/types/experience";
import { MyInfo } from "@/types/myInfo";
import { Project } from "@/types/project";
import { Result } from "@/types/result";
import { getExperience } from "@/utilities/apiCalls/experience";
import { getMyInfo } from "@/utilities/apiCalls/myInfo";
import { getProject } from "@/utilities/apiCalls/project";

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

function captureError(myInfoData: Result<MyInfo>, projectData: Result<Project>, experienceData: Result<Experience>) {
  if (!myInfoData.success || !projectData.success || !experienceData.success) {
    const errorMessages: string[] = [];

    if (!myInfoData.success)
      errorMessages.push(myInfoData.message!);
    if (!projectData.success)
      errorMessages.push(projectData.message!);
    if (!experienceData.success)
      errorMessages.push(experienceData.message!);

    if (errorMessages.length > 0)
      throw new Error(errorMessages.join(", "));
  }
}

export default async function Home() {
  const [myInfoData, projectData, experienceData] = await Promise.all([
    getMyInfo(),
    getProject(),
    getExperience()
  ]);

  captureError(myInfoData, projectData, experienceData);
  
  return (
    <main className="h-full justify-center flex">
      <div className="flex h-full w-[75%]">
        <section className="h-full min-w-96 gap-2 w-[20%]">
          <ExtraInfoContainer extraInfo={extraInfoItems}/>
        </section>
        <section className="h-full w-[80%] p-5 mt-7">
          <InfoItem accordionTitle="EXPERIENCE" infoItems={[]} />
        </section>
      </div>
    </main>
  );
}
