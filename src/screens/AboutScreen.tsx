import { Group } from "@mantine/core";

const AboutScreen = () => {
  return (
    <Group
      mt={50}
      display={"flex"}
      align="center"
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <p>
        This is A Simple Project Which Builds Your Financial Portfolio Based On
        Your Input . This is Purely A Sample Of Work Project and Has No Purpose.
        This Project Is Free To Use And You Can Find The Source Code in My{" "}
        <a href="https://github.com/devarashs/MyLocalPortfolio">Github</a>
      </p>
      <p>
        This Project is Built With React That is Created With{" "}
        <a href="https://vitejs.dev/">Vite JS</a> For Better Development
        Experience. UI is Built Using{" "}
        <a href="https://mantine.dev/">Mantine Dev</a>.
      </p>
      <h5>
        Project is Built By{" "}
        <a href="https://github.com/devarashs/">devarashs</a>
      </h5>
    </Group>
  );
};

export default AboutScreen;
