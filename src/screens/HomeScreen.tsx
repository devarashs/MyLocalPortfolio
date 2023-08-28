import { Grid, NativeSelect, Title } from "@mantine/core";
import { CoinBox } from "../components";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supportedCoins, timeRanges } from "../constants/statics";
import { Link } from "react-router-dom";
import { COLORS } from "../constants/theme";

// Assuming this is the response structure you receive from the useCoins hook

const HomeScreen = () => {
  const [timeRange, setTimeRange] = React.useState<string>(
    "price_change_percentage_24h"
  );

  return (
    <>
      <Title align="left" mb={"lg"} order={2}>
        Latest Crypto Prices - Taken From{" "}
        <Link style={{ color: COLORS.blue }} to={"https://www.coingecko.com/"}>
          Coingecko
        </Link>{" "}
        Public API
      </Title>
      <NativeSelect
        my={"xl"}
        data={timeRanges}
        onChange={(event) => setTimeRange(event.currentTarget.value)}
      />
      <Grid justify={"center"} align={"center"} gutter={"xl"}>
        <AnimatePresence>
          {supportedCoins.map((coin, index) => {
            return (
              <Grid.Col sm={12} md={6} lg={4} xl={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 1.11 }}
                  initial={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  animate={{
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    opacity: 1,
                  }}
                  exit={{ opacity: 0, scale: 1 }}
                >
                  <CoinBox
                    timeRange={timeRange}
                    coinRequest={`/coins/${coin.id}`}
                  />
                </motion.div>
              </Grid.Col>
            );
          })}
        </AnimatePresence>
      </Grid>
    </>
  );
};

export default HomeScreen;
