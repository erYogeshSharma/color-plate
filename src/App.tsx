import Layout from "./view/Layout";
import "./App.css";
import "@fontsource/inter";
import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
