import { ContextProvider } from "./contexts/GlobalContext";
import MainView from "./components/MainVIew/MainView";
import DenseAppBar from "./components/MainVIew/DenseAppBar";

function App() {
  return (
    <ContextProvider>
      <DenseAppBar />
      <MainView />
    </ContextProvider>
  );
}

export default App;
