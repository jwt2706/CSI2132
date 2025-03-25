import { useState } from "react";
import Header from "./components/Header";
import CustomerRoomBooking from "./components/CustomerRoomBooking";
import TurnBookingToRenting from "./components/TurnBookingToRenting";
import DirectRenting from "./components/DirectRenting";
import InsertPayment from "./components/InsertPayment";
import ManageCustomers from "./components/ManageCustomers";

function App() {
  const [view, setView] = useState("customer"); // customer view is the default

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full m-0 p-0">
      <Header view={view} setView={setView} />
      <main className="p-4">
        {view === "customer" && (
          <>
            <CustomerRoomBooking />
          </>
        )}
        {view === "employee" && (
          <>
            <TurnBookingToRenting />
            <br />
            <DirectRenting />
            <br />
            <InsertPayment />
            <br />
            <ManageCustomers />
          </>
        )}
      </main>
    </div>
  );
}

export default App;