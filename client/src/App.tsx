import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import Header from "./sections/shared/Header/Header";
import Footer from "./sections/shared/Footer/Footer";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StarknetConfig connectors={connectors} autoConnect>
        <Router>
          <Header />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.element;
              return (
                <Route key={index} path={route.path} element={<Page />}></Route>
              );
            })}
          </Routes>
          <Footer />
        </Router>
      </StarknetConfig>
    </QueryClientProvider>
  );
}

export default App;
