import React from "react";
import { PieChart, Pie } from "recharts";
import { Flex, LoadingOverlay, Title } from "@mantine/core";
import { useFetch } from "../hooks";

interface HoldingsProps {
  query: string;
}

const Holdings: React.FC<HoldingsProps> = ({ query }) => {
  const data = useFetch(`/property/${query}`);
  // React.useEffect(() => {
  //   data.refetch();
  // }, [inputLoading]);
  console.log(data.data);
  return data.isLoading ? (
    <LoadingOverlay color="black" visible={data.isLoading} />
  ) : data.error ? (
    <></>
  ) : (
    data.data.length !== 0 && (
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={{ sm: "column", md: "row" }}
        gap={"xl"}
      >
        <Title order={4}>All My Holdings</Title>
        <PieChart width={400} height={400}>
          <Pie
            data={data.data}
            dataKey="totalValue"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={90}
            fill="#82ca9d"
            label={(property) => property.tag}
          />
        </PieChart>
      </Flex>
    )
  );
};

export default Holdings;
