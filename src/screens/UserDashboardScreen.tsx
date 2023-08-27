import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, signIn, signOut } from "../Store";
import { Button, Container, Flex, Group, Text, TextInput } from "@mantine/core";
import { COLORS } from "../constants/theme";
import { capitalizeFirstLetter, getError } from "../utils";
import axios from "../axios";
import { toast } from "react-toastify";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "tabler-icons-react";

interface EditingValue {
  type: string;
  value: string;
}

const UserDashboardScreen = () => {
  const userInfo = useSelector(selectUserInfo);
  const [selectedInfoForChange, setSelectedInfoForChange] =
    React.useState<string>("none");

  const [ValueToBeEdited, setValueToBeEdited] = React.useState<EditingValue>({
    type: "",
    value: "",
  });
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    if (!userInfo) return;
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/users/${userInfo._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("user deleted successfully");
        SignOutHandler();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(getError(err));
        }
      }
    }
  };
  const editHandler = async () => {
    if (!userInfo) return;
    try {
      const { data } = await axios.put(
        `/users/profile/${userInfo._id}`,
        { _id: userInfo._id, ...ValueToBeEdited },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch(signIn(data));
      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
    }
  };
  const SignOutHandler = () => {
    dispatch(signOut());
  };
  return (
    userInfo && (
      <Container size={"lg"}>
        <Flex
          py={"xl"}
          justify={"center"}
          align={"center"}
          direction={"column"}
          gap={"xl"}
        >
          <Flex
            p={"sm"}
            justify={{ base: "space-between" }}
            align={"center"}
            style={{ backgroundColor: COLORS.secondary, borderRadius: 10 }}
            direction={"row"}
            w={{ base: 350, md: 450, lg: 550 }}
          >
            <Text
              py={5}
              px={"xs"}
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
            >
              Name
            </Text>
            <Text
              py={5}
              px={"xs"}
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
            >
              {userInfo.name}
            </Text>
            <Button
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
              onClick={() => setSelectedInfoForChange("name")}
            >
              Edit
            </Button>
          </Flex>
          <Flex
            p={"sm"}
            justify={{ base: "space-between" }}
            align={"center"}
            style={{ backgroundColor: COLORS.secondary, borderRadius: 10 }}
            direction={"row"}
            w={{ base: 350, md: 4550, lg: 550 }}
          >
            <Text
              py={5}
              px={"xs"}
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
            >
              Email
            </Text>
            <Text
              py={5}
              px={"xs"}
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
            >
              {userInfo.email}
            </Text>
            <Button
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
              onClick={() => setSelectedInfoForChange("email")}
            >
              Edit
            </Button>
          </Flex>
          <Flex
            p={"sm"}
            justify={{ base: "space-between" }}
            align={"center"}
            style={{ backgroundColor: COLORS.secondary, borderRadius: 10 }}
            direction={"row"}
            w={{ base: 350, md: 4550, lg: 550 }}
          >
            <Text
              py={5}
              px={"xs"}
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
            >
              Password
            </Text>

            <Button
              style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
              onClick={() => setSelectedInfoForChange("password")}
            >
              Edit
            </Button>
          </Flex>
          <Flex
            p={"sm"}
            justify={{ base: "center" }}
            align={"center"}
            direction={"row"}
            w={{ base: 350, md: 4550, lg: 550 }}
          >
            <Button onClick={() => deleteHandler()} color="red">
              Delete My Account
            </Button>
          </Flex>
        </Flex>
        <AnimatePresence>
          {(selectedInfoForChange === "name" ||
            selectedInfoForChange === "email" ||
            selectedInfoForChange === "password" ||
            selectedInfoForChange === "showPassword" ||
            selectedInfoForChange === "preferredCurrency") && (
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Group
                p={"sm"}
                style={{ backgroundColor: COLORS.secondary, borderRadius: 10 }}
                position="apart"
              >
                <Text
                  p={"sm"}
                  style={{ backgroundColor: COLORS.primary, borderRadius: 5 }}
                >
                  {selectedInfoForChange === "password" ||
                  selectedInfoForChange === "email" ||
                  selectedInfoForChange === "name" ||
                  selectedInfoForChange === "preferredCurrency"
                    ? capitalizeFirstLetter(selectedInfoForChange)
                    : selectedInfoForChange === "showPassword" && "Password"}
                </Text>
                <Group>
                  <TextInput
                    defaultValue={
                      ValueToBeEdited.value === "none"
                        ? ""
                        : ValueToBeEdited.value
                    }
                    onChange={(event) =>
                      setValueToBeEdited({
                        type: selectedInfoForChange,
                        value: event.target.value,
                      })
                    }
                    type={
                      selectedInfoForChange === "showPassword"
                        ? "text"
                        : selectedInfoForChange === "password"
                        ? "password"
                        : selectedInfoForChange === "email"
                        ? "email"
                        : "text"
                    }
                  />
                  {selectedInfoForChange === "showPassword" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.85 }}
                      style={{ backgroundColor: "inherit" }}
                      onClick={() => setSelectedInfoForChange("password")}
                    >
                      <Eye size={20} strokeWidth={1} color={"white"} />
                    </motion.button>
                  ) : (
                    selectedInfoForChange === "password" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.85 }}
                        style={{ backgroundColor: "inherit" }}
                        onClick={() => setSelectedInfoForChange("showPassword")}
                      >
                        <EyeOff size={20} strokeWidth={1} color={"white"} />
                      </motion.button>
                    )
                  )}
                </Group>
              </Group>
              <Group position="left" my={"xl"}>
                <Button radius={5} color="gray" onClick={() => editHandler()}>
                  Submit Edit
                </Button>
              </Group>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    )
  );
};

export default UserDashboardScreen;
