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
import { useDispatch, useSelector } from "react-redux";
import { postSuccess, selectUserInfo } from "../Store";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../utils";
import { useState } from "react";

const InputProperty = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
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
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_LOCAL_API}/property/create`,
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
      toast.success("product created successfully");
      setLoading(false);
      dispatch(postSuccess());
      // dispatch({ type: "CREATE_SUCCESS" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
      setLoading(false);
    }
  };

  return (
    <Flex direction={"column"}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
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
          <Text>{form.values.propertyType} - Tag</Text>
          <TextInput type="text" withAsterisk {...form.getInputProps("name")} />
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} - Total Share Amount</Text>
          <TextInput
            type="number"
            withAsterisk
            {...form.getInputProps("totalShareAmount")}
          />
        </Group>
        <Group className={styles.inputContainer}>
          <Text>{form.values.propertyType} - Value</Text>
          <TextInput
            type="number"
            withAsterisk
            {...form.getInputProps("value")}
          />
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
