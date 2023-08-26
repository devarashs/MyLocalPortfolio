import { LoadingOverlay } from "@mantine/core";
import { useFetch } from "../hooks";

const HomeScreen = () => {
  const response = useFetch("/check");
  console.log(response);
  return response.isLoading ? (
    <LoadingOverlay color="black" visible={response.isLoading} />
  ) : response.error ? (
    <div>error</div>
  ) : (
    response.data.length !== 0 && <div>ok</div>
  );
};

export default HomeScreen;
