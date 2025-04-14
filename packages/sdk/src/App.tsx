import { PaymentModal } from "./components/PaymentModal";
import PaytronButton from "./components/PaytronButton";


function App() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl">MY APP</h1>

      <PaytronButton />
    </div>
  );
}

export default App;
