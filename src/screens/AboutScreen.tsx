import { Group, Text } from "@mantine/core";

const AboutScreen = () => {
  return (
    <Group
      mt={50}
      display={"flex"}
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <p>
        This is A Simple Project Which Builds Your Financial Portfolio Based On
        Your Input .{" "}
        <Text color="red">
          This is Purely A Sample Of Work Project and Has No Purpose.
        </Text>
        This Project Is <Text color="green">Free To Use</Text> And You Can Find
        The Source Code in My{" "}
        <a href="https://github.com/devarashs/MyLocalPortfolio">
          <Text color="indigo">Github Repository For Frontend</Text>
        </a>
        <a href="https://github.com/devarashs/MyLocalPortfolio-Backend">
          <Text color="indigo">Github Repository For Backend</Text>
        </a>
      </p>
      <p>
        This Project is Built With React That is Created With{" "}
        <a href="https://vitejs.dev/">
          <Text color="pink">Vite JS</Text>
        </a>{" "}
        For Better Development Experience. UI is Built Using{" "}
        <a href="https://mantine.dev/">
          <Text color="pink">Mantine Dev</Text>
        </a>
      </p>
      <h5>
        Project is Built By{" "}
        <a href="https://github.com/devarashs/">
          <Text color="green">devarashs</Text>
        </a>
      </h5>
    </Group>
  );
};

export default AboutScreen;
