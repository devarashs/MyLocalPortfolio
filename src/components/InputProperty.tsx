import {
  Flex,
  TextInput,
  Group,
  NativeSelect,
  Button,
  Text,
} from "@mantine/core";
import styles from "../styles/components/InputProperty.module.css";
import { useForm, isNotEmpty } from "@mantine/form";

const InputProperty = () => {
  //states declarations
  //const [properties, setProperties] = React.useState<Properties>([]);

  //functions declarations
  const handleSubmit = (values: Property) => {
    console.log(values);
  };

  //mantine form declaration
  const form = useForm({
    initialValues: {
      propertyType: "Stocks",
      name: "",
      value: 0,
    },

    validate: {
      name: isNotEmpty("Enter a Tag For Your Property!"),
      value: (value) =>
        value <= 0 ? "Value Can Not Be Zero Or Negative" : null,
    },
  });

  return (
    <Flex direction={"column"}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Group className={styles.inputContainer}>
          <Text>Select Property Type</Text>
          <NativeSelect
            data={[
              "Stock",
              "Cryptocurrency",
              "Commodity",
              "Cash",
              "Foreign Currency",
            ]}
            {...form.getInputProps("propertyType")}
            withAsterisk
          />
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} Tag</Text>
          <TextInput type="text" withAsterisk {...form.getInputProps("name")} />
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} Value</Text>
          <TextInput
            type="number"
            withAsterisk
            {...form.getInputProps("value")}
          />
        </Group>
        <Group position="center">
          <Button type="submit" color="gray">
            Add To Portfolio
          </Button>
        </Group>
      </form>
    </Flex>
  );
};

export default InputProperty;
