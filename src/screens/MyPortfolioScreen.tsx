import { Holdings, InputProperty } from "../components";
import React from "react";
import { useFetch } from "../hooks";
import { LoadingOverlay, Text } from "@mantine/core";

const MyPortfolioScreen = () => {
  const [doRefetch, setDoRefetch] = React.useState(false);
  const data = useFetch(`/property/mine`);
  React.useEffect(() => {
    data.refetch();
  }, [doRefetch]);
  return data.isLoading ? (
    <LoadingOverlay visible={data.isLoading} />
  ) : data.error ? (
    <Text>Something Went Wrong! trace code mps-1</Text>
  ) : (
    <div>
      <InputProperty setDoRefetch={setDoRefetch} doRefetch={doRefetch} />
      {data.data.length !== 0 && (
        <>
          <Holdings
            setDoRefetch={setDoRefetch}
            doRefetch={doRefetch}
            data={data.data}
          />
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
