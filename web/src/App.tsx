import { useState } from "react";
import Header from "./components/Header";
import CustomerRoomBooking from "./components/CustomerRoomBooking";
import BookingRenting from "./components/BookingRenting";
import ManageCustomers from "./components/ManageCustomers";
import ViewTables from "./components/ViewTables";

function App() {
  const [view, setView] = useState("customer"); // customer view is the default

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full m-0 p-0">
      <Header view={view} setView={setView} />
      <main className="p-4">
        {view === "customer" && (
          <>
            <CustomerRoomBooking />
            <br />
            <ViewTables />
          </>
        )}
        {view === "employee" && (
          <>
            <BookingRenting />
            <br />
            <ManageCustomers />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
