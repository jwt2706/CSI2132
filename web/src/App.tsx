import Header from "./components/Header";
import GetTables from "./components/GetTables";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full m-0 p-0">
      <Header />
      <main className="p-4">
        <GetTables />
      </main>
    </div>
  );
}

export default App;