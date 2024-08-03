import { getMyInfo } from "../utilities/apiCalls/myInfo"

const About = async () => {
  const data = await getMyInfo();
  console.log(data);
  return (
    <div>about
      <ul>
        <li>Name: {data.data?.firstName} {data.data?.lastName}</li>
        <li>DOB: {new Date(data.data?.dateOfBirth ?? "").toLocaleDateString()}</li>
        <li>Mobile: {data.data?.mobileNumber}</li>
        <li>Address: {data.data?.address}</li>
      </ul>
    </div>
  )
}

export default About