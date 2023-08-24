import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, isNotEmpty, matchesField, useForm } from "@mantine/form";
import axios from "axios";
import styles from "../styles/components/InputProperty.module.css";
import { COLORS } from "../constants/theme";

const SignupScreen = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },

    validate: {
      name: isNotEmpty("Please Enter a Name"),
      email: isEmail("Enter A Correct email address"),
      password: isNotEmpty("You Need to Have an Password!"),
      confirmPassword: matchesField("password", "Passwords are not the same"),
      terms: (value) =>
        value === false ? "You Must Agree To Be A Good Person!" : null,
    },
  });

  const submitHandler = async () => {
    if (form.values.password !== form.values.confirmPassword) {
      //toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_LOCAL_API}/users/signup`,
        {
          name: form.values.name,
          email: form.values.email,
          password: form.values.password,
        }
      );
      //   ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      //   navigate(redirect || "/");
    } catch (err) {
      //   toast.error(getError(err));
    }
  };

  return (
    <Container size={"xl"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ md: "center", lg: "space-between" }}
        align={"center"}
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
            Signup
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
              <Text>Name</Text>
              <TextInput
                withAsterisk
                type="text"
                {...form.getInputProps("name")}
              />
            </Group>
            <Group className={styles.inputContainer}>
              <Text>Email</Text>
              <TextInput
                type="email"
                withAsterisk
                {...form.getInputProps("email")}
              />
            </Group>
            <Group className={styles.inputContainer}>
              <Text>Password</Text>
              <TextInput
                type="password"
                withAsterisk
                {...form.getInputProps("password")}
              />
            </Group>
            <Group className={styles.inputContainer}>
              <Text>Confirm Password</Text>
              <TextInput
                type="password"
                withAsterisk
                {...form.getInputProps("confirmPassword")}
              />
            </Group>
            <Group display={"flex"}>
              <Checkbox
                {...form.getInputProps("terms")}
                color="blue"
                label="I Agree To Be A Good Person!"
              />
              <Text color="cyan" size={"xs"}>
                We Do Not Use Any Of Your Data!
              </Text>
            </Group>
            <Button type="submit" variant="filled" color="dark">
              Sign Up
            </Button>
          </Flex>
        </form>
        <Box
          p={"xl"}
          style={{
            backgroundColor: COLORS.lightGrey,
            borderRadius: 25,
          }}
          w={"45%"}
        >
          The Emperor Penguin Algorithm is like a fancy winter dance-off! 🐧🕺
          These regal birds take turns waddling into the center to escape the
          cold while others huddle outside. It's like musical chairs, but with
          penguins and blizzards. This keeps everyone toasty warm and helps them
          survive Antarctica's icy chill. Talk about a penguin party strategy!
          ❄️🎉
        </Box>
      </Flex>
    </Container>
  );
};

export default SignupScreen;
