import React from "react";
import { useCoins } from "../hooks";
import { Alert, Card, Loader, Text, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Store";
import { Reload } from "tabler-icons-react";

const CoinBox: React.FC<CoinBoxProps> = ({ coinRequest, timeRange }) => {
  const { data, isLoading, error, refetch } = useCoins(coinRequest);
  const userInfo = useSelector(selectUserInfo);
  let change;
  const cardColor = () => {
    console.log((data as CoinAttributes).market_data?.[timeRange]);
    change = (data as CoinAttributes).market_data?.[timeRange];
    if (typeof change === "number") {
      if (change > 0) return "#087f5b";
      else if (change < 0) return "#a61e4d";
      else if (change === 0) return "#495057";
    } else {
      alert("type error trace code CBF-2");
    }
  };
  const cardSectionColor = () => {
    console.log((data as CoinAttributes).market_data?.[timeRange]);
    change = (data as CoinAttributes).market_data?.[timeRange];
    if (typeof change === "number") {
      if (change > 0) return "#0ca678";
      else if (change < 0) return "#d6336c";
      else if (change === 0) return "#868e96";
    } else {
      alert("type error trace code CBF-2");
    }
  };

  return isLoading ? (
    <Loader color="cyan" />
  ) : error ? (
    <Alert
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Reload
        size={25}
        strokeWidth={2}
        color="white"
        onClick={() => refetch()}
      />
      <Text>Something Went Wrong Trace Code CBF-1</Text>
    </Alert>
  ) : (
    data.length !== 0 && (
      <Card
        p={"xl"}
        withBorder
        style={{
          backgroundColor: cardColor(),
        }}
        radius={5}
      >
        <Card.Section mb={"md"} withBorder py={"md"}>
          <Title mb={"xl"} order={4}>
            {(data as CoinAttributes).name} - {(data as CoinAttributes).symbol}
          </Title>
          <Text>
            Market Cap Rank - {(data as CoinAttributes).market_cap_rank}
          </Text>
        </Card.Section>
        <Card.Section
          py={"sm"}
          style={{
            backgroundColor: cardSectionColor(),
          }}
          mb={"md"}
        >
          <Text color="white" my={"xs"} size={"sm"}>
            Changes : {change}
          </Text>
          <Text color="white" my={"xs"} size={"lg"}>
            Price : {(data as CoinAttributes).market_data?.current_price.usd}{" "}
            {userInfo?.preferredCurrency || "USD"}
          </Text>
        </Card.Section>

        {/* <Card.Section mb={"md"}>
          <Paper
            w={{ base: 350, sm: 450, md: 550, lg: 650, xl: 750 }}
            style={{ textAlign: "left" }}
            radius={10}
            p={"xl"}
            dangerouslySetInnerHTML={{
              __html: (data as CoinAttributes).description?.en || "",
            }}
          />
        </Card.Section> */}
      </Card>
    )
  );
};

export default CoinBox;
