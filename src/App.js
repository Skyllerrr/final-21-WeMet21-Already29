import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {/* <Login /> */}
        <Router />
      </BrowserRouter>
    </>
  );
}
export default App;
