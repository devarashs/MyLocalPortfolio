import { PieChart, Pie } from "recharts";
import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { CircleLetterX, Edit } from "tabler-icons-react";
import React from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { isNotEmpty, useForm } from "@mantine/form";
import styles from "../styles/components/InputProperty.module.css";
import { COLORS } from "../constants/theme";
import { defaultEditorState } from "../constants/statics";
import { motion, AnimatePresence } from "framer-motion";

interface EditProps {
  _id: string;
  tag: string;
  category: string;
  valuePerShare: string;
  totalShareAmount: string;
}
interface EditorState {
  doEdit: boolean;
  item: EditProps;
}

const Holdings: React.FC<DataArray> = ({ data, setDoRefetch, doRefetch }) => {
  const form = useForm({
    initialValues: {
      value: 0,
      totalShareAmount: "",
    },

    validate: {
      value: (value) =>
        value <= 0 ? "Value Can Not Be Zero Or Negative" : null,
      totalShareAmount: isNotEmpty("Enter Total Share Amount Please!"),
    },
  });

  const [opendEditor, setOpenEditor] =
    React.useState<EditorState>(defaultEditorState);
  const [loading, setLoading] = React.useState(false);
  const userInfo = useSelector(selectUserInfo);
  const deleteHandler = async (id: string) => {
    if (!userInfo) return;
    setLoading(true);

    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/property/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("Property deleted successfully");
        setDoRefetch(!doRefetch);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(getError(err));
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const editHandler = async (id: string) => {
    if (!userInfo) return;
    setLoading(true);
    try {
      await axios.put(
        `/property/${id}`,
        {
          _id: id,
          valuePerShare: form.values.value.toString(),
          totalShareAmount: form.values.totalShareAmount,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      toast.success("Product updated successfully");
      setDoRefetch(!doRefetch);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (opendEditor.doEdit) window.scrollTo(0, document.body.scrollHeight);
  }, [opendEditor]);

  return loading ? (
    <LoadingOverlay color={COLORS.lightGrey} visible={loading} />
  ) : (
    <Flex
      justify={"space-between"}
      align={"center"}
      direction={{ base: "column", lg: "column" }}
      wrap={"nowrap"}
      gap={"xl"}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.85 }}
        style={{ backgroundColor: "inherit" }}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="totalValue"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={90}
            fill="#82ca9d"
            label={(property) => property.tag}
          />
        </PieChart>
      </motion.div>
      <Table highlightOnHover withBorder>
        <tbody>
          {(data as Element[]).map((element: Element, index: number) => {
            return (
              <tr key={index}>
                <td>{element.tag}</td> <td>{element.category}</td>
                <td>{element.valuePerShare}</td>
                <td>{element.totalShareAmount}</td>
                <td>{element.totalValue}</td>
                <td>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    style={{ backgroundColor: "inherit" }}
                  >
                    <Edit
                      size={20}
                      strokeWidth={2}
                      color={"green"}
                      onClick={() =>
                        setOpenEditor({
                          doEdit: true,
                          item: {
                            _id: element._id,
                            tag: element.tag,
                            category: element.category,
                            valuePerShare: element.valuePerShare,
                            totalShareAmount: element.totalShareAmount,
                          },
                        })
                      }
                    />
                  </motion.div>
                </td>
                <td>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    style={{ backgroundColor: "inherit" }}
                  >
                    <CircleLetterX
                      size={20}
                      strokeWidth={1}
                      color={"red"}
                      onClick={() => deleteHandler(element._id)}
                    />
                  </motion.div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AnimatePresence>
        {opendEditor.doEdit && (
          <motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              w={"100%"}
              direction={"row"}
              align={"center"}
              justify={"space-between"}
              my={"xl"}
            >
              <Group position="right" my={"xl"}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  style={{ backgroundColor: "inherit" }}
                >
                  <CircleLetterX
                    size={20}
                    strokeWidth={1}
                    color={"red"}
                    onClick={() => {
                      setOpenEditor(defaultEditorState);
                      window.scrollTo(0, document.body.scrollHeight);
                    }}
                  />
                </motion.div>
              </Group>
              <Title order={4} align="center">
                Edit {opendEditor.item.tag} Values
              </Title>
              <form
                onSubmit={form.onSubmit(() =>
                  editHandler(opendEditor.item._id)
                )}
              >
                <Group className={styles.inputContainer}>
                  <Text>{opendEditor.item.tag} - Total Share Amount</Text>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
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
                  <Text>{opendEditor.item.tag} - Value</Text>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
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
                    Edit The Property
                  </Button>
                </Group>
              </form>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Holdings;
