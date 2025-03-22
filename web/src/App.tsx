import Header from "./components/Header";
import GetTables from "./components/GetTables";
import GetAvailableRooms from "./components/GetAvailableRooms";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full m-0 p-0">
      <Header />
      <main className="p-4">
        <GetAvailableRooms />
        <br />
        <GetTables />
      </main>
    </div>
  );
}

export default App;
