import { Holdings, InputProperty } from "../components";
import React from "react";
import { useFetch } from "../hooks";
import { Alert, Divider, LoadingOverlay } from "@mantine/core";

const MyPortfolioScreen = () => {
  const [doRefetch, setDoRefetch] = React.useState(false);
  const data = useFetch(`/property/mine`);
  React.useEffect(() => {
    data.refetch();
  }, [doRefetch]);
  return data.isLoading ? (
    <LoadingOverlay visible={data.isLoading} />
  ) : data.error ? (
    <Alert color="grape">Something Went Wrong! trace code mps-1</Alert>
  ) : (
    <div>
      <Divider my={"xl"} />
      <InputProperty setDoRefetch={setDoRefetch} doRefetch={doRefetch} />
      <Divider my={"xl"} />
      {data.data.length !== 0 && (
        <>
          <Holdings
            setDoRefetch={setDoRefetch}
            doRefetch={doRefetch}
            data={data.data}
          />
          <Divider my={"xl"} />
          {/* <HoldingsList
            setDoRefetch={setDoRefetch}
            doRefetch={doRefetch}
            data={data.data}
          /> */}
        </>
      )}
    </div>
  );
};

export default MyPortfolioScreen;
