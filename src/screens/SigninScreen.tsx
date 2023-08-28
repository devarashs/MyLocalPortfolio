import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import axios from "../axios";
import styles from "../styles/components/InputProperty.module.css";
import { COLORS } from "../constants/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, selectUserInfo } from "../Store";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getError } from "../utils";
import { motion } from "framer-motion";

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Enter A Correct email address"),
      password: isNotEmpty("You Need to Have an Password!"),
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/users/signin", {
        email: form.values.email,
        password: form.values.password,
      });
      dispatch(signIn(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
    }
  };

  return (
    !userInfo && (
      <Container size={"xl"}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ md: "center", lg: "space-between" }}
          align={"center"}
          w={"100%"}
        >
          <form onSubmit={form.onSubmit(() => submitHandler())}>
            <Title
              py={"xs"}
              style={{
                backgroundColor: COLORS.lightGrey,
                borderRadius: 25,
              }}
              order={3}
              align="center"
              mb={"md"}
            >
              Sign In
            </Title>
            <Flex
              justify={"center"}
              align={"center"}
              gap={"md"}
              direction={"column"}
              p={"xl"}
              style={{ backgroundColor: COLORS.lightGrey, borderRadius: 25 }}
            >
              <Group className={styles.inputContainer}>
                <Text>Email</Text>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  style={{ backgroundColor: "inherit" }}
                >
                  <TextInput
                    type="email"
                    withAsterisk
                    {...form.getInputProps("email")}
                  />
                </motion.div>
              </Group>
              <Group className={styles.inputContainer}>
                <Text>Password</Text>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  style={{ backgroundColor: "inherit" }}
                >
                  <TextInput
                    type="password"
                    withAsterisk
                    {...form.getInputProps("password")}
                  />
                </motion.div>
              </Group>

              <Button type="submit" variant="filled" color="dark">
                Sign In
              </Button>
            </Flex>
          </form>
          <Box
            p={"xl"}
            style={{
              backgroundColor: COLORS.lightGrey,
              borderRadius: 25,
            }}
            w={{ md: "45%", sm: "100%" }}
          >
            The Honey Bee Algorithm is like a bee dance party. Scout bees find
            food and dance directions, waggling and twirling to show the way.
            The dance angle is a compass, longer dance means farther food. More
            bee buddies join the dance for the best treats. It's like a
            pollen-powered GPS and a foodie flash mob rolled into one! 🌼🕺🍯
          </Box>
        </Flex>
      </Container>
    )
  );
};

export default SigninScreen;
