import { useState } from "react";
import Header from "./components/Header";
import GetTables from "./components/GetTables";
import GetAvailableRooms from "./components/GetAvailableRooms";

function App() {
  const [view, setView] = useState("customer"); // customer view is the default

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full m-0 p-0">
      <Header view={view} setView={setView} />
      <main className="p-4">
        {view === "customer" && (
          <>
            <GetAvailableRooms />
          </>
        )}
        {view === "employee" && (
          <>
            <GetTables />
          </>
        )}
      </main>
    </div>
  );
}

export default App;