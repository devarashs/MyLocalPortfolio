import { useFetch } from "../hooks";

const HomeScreen = () => {
  const response = useFetch();
  console.log(response);
  return <div>HomeScreen</div>;
};

export default HomeScreen;
