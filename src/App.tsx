import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Container,
} from "@mantine/core";
import {
  User,
  ArrowBarToLeft,
  ChartPie4,
  BrandGithub,
} from "tabler-icons-react";
import { COLORS } from "./constants/theme";
import { AboutScreen, MyPortfolioScreen } from "./screens";

function App() {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  return (
    <BrowserRouter>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Group
              my={"xl"}
              position="apart"
              py={"lg"}
              px={"sm"}
              style={{ background: COLORS.secondary, borderRadius: "5px" }}
            >
              <Text>User Dashboard </Text>
              <User
                size={25}
                strokeWidth={2}
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.colors.gray[8]
                }
              />
            </Group>
            <Link to="/myportfolio" onClick={() => setOpened(!opened)}>
              <Navbar.Section
                my={"xs"}
                style={{ background: COLORS.lightGrey, borderRadius: "5px" }}
                py={"lg"}
                px={"sm"}
              >
                <Group position="apart">
                  <Text className="ltr-text-line">My Portfolio</Text>
                  <ChartPie4
                    size={25}
                    strokeWidth={2}
                    color={
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.colors.gray[8]
                    }
                  />
                </Group>
              </Navbar.Section>
            </Link>
            <Link to="/about" onClick={() => setOpened(!opened)}>
              <Navbar.Section
                my={"xs"}
                style={{ background: COLORS.lightGrey, borderRadius: "5px" }}
                py={"lg"}
                px={"sm"}
              >
                <Group position="apart">
                  <Text className="ltr-text-line">About</Text>
                  <ArrowBarToLeft
                    size={25}
                    strokeWidth={2}
                    color={
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.colors.gray[8]
                    }
                  />
                </Group>
              </Navbar.Section>
            </Link>
            <a
              href="https://github.com/devarashs/MyLocalPortfolio"
              onClick={() => setOpened(!opened)}
            >
              <Navbar.Section
                my={"xs"}
                style={{ background: COLORS.lightGrey, borderRadius: "5px" }}
                py={"lg"}
                px={"sm"}
              >
                <Group position="apart">
                  <Text className="ltr-text-line">Source Code</Text>
                  <BrandGithub
                    size={25}
                    strokeWidth={2}
                    color={
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.colors.gray[8]
                    }
                  />
                </Group>
              </Navbar.Section>
            </a>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>User Assets</Text>
            </Aside>
          </MediaQuery>
        }
        footer={
          <Footer height={"auto"} p="md">
            <Text>
              My Local Finance Portfolio - Find The Source Code in{" "}
              <a href="https://github.com/devarashs/MyLocalPortfolio">Here</a>
            </Text>
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.colors.gray[8]
                  }
                  mr="xl"
                />
              </MediaQuery>

              <Text>My Local Finance Portfolio</Text>
            </div>
          </Header>
        }
      >
        <main>
          <Container
            size={"xl"}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/myportfolio" element={<MyPortfolioScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              {/* Protected Routes */}
            </Routes>
          </Container>
        </main>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
