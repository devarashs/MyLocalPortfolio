import { Flex, TextInput, Group, NativeSelect, Button } from "@mantine/core";
import React from "react";
import styles from "../styles/components/InputProperty.module.css";

type PropertyType = string;

const InputProperty = () => {
  const [propertyType, setPropertyType] = React.useState<PropertyType>("Stock");

  return (
    <Flex
      justify={"space-evenly"}
      align={"center"}
      direction={"column"}
      gap={"xl"}
    >
      <Group>
        <NativeSelect
          className={styles.inputContainer}
          data={[
            "Stock",
            "Cryptocurrency",
            "Real Estate",
            "Commodity",
            "Cash",
            "Foreign Currency",
          ]}
          label="Select The Type Of Property You Want To Add"
          value={propertyType}
          onChange={(event) => setPropertyType(event.currentTarget.value)}
          withAsterisk
        />
      </Group>
      {propertyType !== "" && (
        <Group>
          <TextInput
            className={styles.inputContainer}
            type="text"
            label={`${propertyType} Name`}
            withAsterisk
          />
          <TextInput
            className={styles.inputContainer}
            type="number"
            label={`${propertyType} Amount`}
            withAsterisk
          />
          <Button color="gray">Add To Portfolio</Button>
        </Group>
      )}
    </Flex>
  );
};

export default InputProperty;
