import { PieChart, Pie } from "recharts";
import { Flex, LoadingOverlay, Table } from "@mantine/core";
import { useFetch } from "../hooks";
import { useEffect } from "react";

interface HoldingsProps {
  query: string;
  doRefetch: boolean;
}

interface Element {
  __v: number;
  _id: string;
  tag: string;
  category: string;
  valuePerShare: string;
  totalShareAmount: string;
  totalValue: number;
  createdA: string;
  updatedAt: string;
}

const Holdings: React.FC<HoldingsProps> = ({ query, doRefetch }) => {
  const data = useFetch(`/property/${query}`);
  useEffect(() => {
    data.refetch();
  }, [doRefetch]);

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
        direction={{ sm: "column", lg: "row" }}
        gap={"xl"}
      >
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
        <Table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Category</th>
              <th>Value Per Share</th>
              <th>Total Share Amount</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {(data.data as Element[]).map((element: Element, index: number) => {
              return (
                <tr key={index}>
                  <td>{element.tag}</td>
                  <td>{element.category}</td>
                  <td>{element.valuePerShare}</td>
                  <td>{element.totalShareAmount}</td>
                  <td>{element.totalValue}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Flex>
    )
  );
};

export default Holdings;
