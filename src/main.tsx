import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        focusRing: "auto",
        loader: "bars",
        white: "#f8f9fa",
        black: "#212529",
        activeStyles: { transform: "scale(0.95)" },
        colors: {
          // Add your color
          FirstPallete: [
            "#495057",
            "#a5d8ff",
            "#cc5de8",
            "#96f2d7",
            "#5c7cfa",
            "#66d9e8",
            "#d8f5a2",
            "#d0bfff",
            "#ff8787",
            "#dee2e6",
          ],
          SecondPallete: [
            "#e64980",
            "#e599f7",
            "#b197fc",
            "#74c0fc",
            "#99e9f2",
            "#22b8cf",
            "#12b886",
            "#51cf66",
            "#ffe066",
            "#f59f00",
          ],
        },
        primaryColor: "SecondPallete",
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
