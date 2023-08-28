import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Container,
} from "@mantine/core";
import {
  User,
  ArrowGuide,
  ChartPie4,
  BrandGithub,
  AlertOctagon,
  LayoutBoard,
} from "tabler-icons-react";
import { COLORS } from "./constants/theme";
import {
  AboutScreen,
  HomeScreen,
  MyPortfolioScreen,
  SigninScreen,
  SignupScreen,
  UserDashboardScreen,
} from "./screens";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, signOut } from "./Store";
import { ProtectedRoute } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function App() {
  const theme = useMantineTheme();
  const userInfo = useSelector(selectUserInfo);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const SignOutHandler = () => {
    dispatch(signOut());
  };
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" position="bottom-center" limit={1} />
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
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ sm: 250, lg: 300 }}
          >
            {!userInfo ? (
              <>
                <Link to={"/signin"} onClick={() => setOpened(!opened)}>
                  <Group
                    my={"xl"}
                    position="apart"
                    py={"lg"}
                    px={"sm"}
                    style={{
                      background: COLORS.secondary,
                      borderRadius: "5px",
                    }}
                  >
                    <Text>Sign in</Text>
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
                </Link>
              </>
            ) : (
              <>
                <Link to={"/userdashboard"} onClick={() => setOpened(!opened)}>
                  <motion.div
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.85 }}
                    style={{ backgroundColor: "inherit" }}
                  >
                    <Group
                      my={"xl"}
                      position="apart"
                      py={"lg"}
                      px={"sm"}
                      style={{
                        background: COLORS.secondary,
                        borderRadius: "5px",
                      }}
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
                  </motion.div>
                </Link>
                <Link to="/myportfolio" onClick={() => setOpened(!opened)}>
                  <motion.div
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.85 }}
                    style={{ backgroundColor: "inherit" }}
                  >
                    <Navbar.Section
                      my={"xs"}
                      style={{
                        background: COLORS.lightGrey,
                        borderRadius: "5px",
                      }}
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
                  </motion.div>
                </Link>
              </>
            )}
            <Link to="/about" onClick={() => setOpened(!opened)}>
              <motion.div
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.85 }}
                style={{ backgroundColor: "inherit" }}
              >
                <Navbar.Section
                  my={"xs"}
                  style={{ background: COLORS.lightGrey, borderRadius: "5px" }}
                  py={"lg"}
                  px={"sm"}
                >
                  <Group position="apart">
                    <Text className="ltr-text-line">About</Text>
                    <ArrowGuide
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
              </motion.div>
            </Link>
            <Link to="/" onClick={() => setOpened(!opened)}>
              <motion.div
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.85 }}
                style={{ backgroundColor: "inherit" }}
              >
                <Navbar.Section
                  my={"xs"}
                  style={{ background: COLORS.lightGrey, borderRadius: "5px" }}
                  py={"lg"}
                  px={"sm"}
                >
                  <Group position="apart">
                    <Text className="ltr-text-line">Home</Text>
                    <LayoutBoard
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
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.85 }}
              style={{ backgroundColor: "inherit" }}
            >
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
            </motion.div>
            {userInfo ? (
              <Link
                to={"/signin"}
                onClick={() => {
                  SignOutHandler();
                  setOpened(!opened);
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.85 }}
                  style={{ backgroundColor: "inherit" }}
                >
                  <Navbar.Section
                    my={"xs"}
                    style={{
                      background: COLORS.lightGrey,
                      borderRadius: "5px",
                    }}
                    py={"lg"}
                    px={"sm"}
                  >
                    <Group position="apart">
                      <Text className="ltr-text-line">Sign Out</Text>
                      <AlertOctagon
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
                </motion.div>
              </Link>
            ) : (
              <Link to={"/signup"} onClick={() => setOpened(!opened)}>
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.85 }}
                  style={{ backgroundColor: "inherit" }}
                >
                  <Group
                    my={"xl"}
                    position="apart"
                    py={"lg"}
                    px={"sm"}
                    style={{
                      background: COLORS.secondary,
                      borderRadius: "5px",
                    }}
                  >
                    <Text>Sign up</Text>
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
                </motion.div>
              </Link>
            )}
          </Navbar>
        }
        // aside={
        //   <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       <Text>User Assets</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
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
              <MediaQuery largerThan="md" styles={{ display: "none" }}>
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
              <Link to={"/"}>
                <Text>My Local Finance Portfolio</Text>
              </Link>
            </div>
          </Header>
        }
      >
        <main>
          <Container mb={100} size={"lg"}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              {/* Protected Routes */}
              <Route
                path="/myportfolio"
                element={
                  <ProtectedRoute>
                    <MyPortfolioScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<AboutScreen />} />
              <Route
                path="/userdashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboardScreen />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </main>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
