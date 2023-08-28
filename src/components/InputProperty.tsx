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
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Store";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../utils";
import { useState } from "react";
import { motion } from "framer-motion";
interface InputProps {
  doRefetch: boolean;
  setDoRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputProperty: React.FC<InputProps> = ({ setDoRefetch, doRefetch }) => {
  const userInfo = useSelector(selectUserInfo);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      propertyType: "Stocks",
      name: "",
      value: 0,
      totalShareAmount: 0,
    },

    validate: {
      name: isNotEmpty("Enter a Tag For Your Property!"),
      value: (value) =>
        value <= 0 ? "Value Can Not Be Zero Or Negative" : null,
    },
  });

  const handleSubmit = async () => {
    if (!userInfo) {
      // Handle the case when userInfo is null
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/property/create",
        {
          tag: form.values.name,
          category: form.values.propertyType,
          valuePerShare: form.values.value,
          totalShareAmount: form.values.totalShareAmount,
          owner: userInfo._id,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      toast.success("Property created successfully");
      setLoading(false);
      setDoRefetch(!doRefetch);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction={"column"}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <Group className={styles.inputContainer}>
          <Text>Select Property Type</Text>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ backgroundColor: "inherit" }}
          >
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
          </motion.div>
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} - Tag</Text>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            style={{ backgroundColor: "inherit" }}
          >
            <TextInput
              type="text"
              withAsterisk
              {...form.getInputProps("name")}
            />
          </motion.div>
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} - Total Share Amount</Text>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            style={{ backgroundColor: "inherit" }}
          >
            <TextInput
              type="number"
              withAsterisk
              {...form.getInputProps("totalShareAmount")}
            />
          </motion.div>
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} - Value</Text>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            style={{ backgroundColor: "inherit" }}
          >
            <TextInput
              type="number"
              withAsterisk
              {...form.getInputProps("value")}
            />
          </motion.div>
        </Group>
        <Group position="center">
          <Button loading={loading} type="submit" color="gray">
            Add To Portfolio
          </Button>
        </Group>
      </form>
    </Flex>
  );
};

export default InputProperty;
