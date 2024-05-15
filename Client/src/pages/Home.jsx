import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser,  } = useSelector((state) => state.user);
  console.log(currentUser)
  return (
    <div className="flex justify-center">
      <h1 className=" text-3xl font-bold mb-4 text-slate-800">Welcome {currentUser ? currentUser.username : ""} </h1>
    </div>
  )
}

export default Home