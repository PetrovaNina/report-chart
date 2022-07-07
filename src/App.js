import { colors, createTheme, ThemeProvider } from "@material-ui/core";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import Reports from "./components/Reports/Reports";

const theme = createTheme({
  palette: {
    darkBlue: "#0B79D0",
    blue: "#64B6F7",
    lightBlue: "#2094f320",
    black: "000000",
    blueText: "#80beff",
    grey600: colors.grey[600],
    greyText: "#00000088",
    semiGreen: "#9aff9d82",
    semiRed: "#ff645082",
  },
});

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Reports />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

export default App;
