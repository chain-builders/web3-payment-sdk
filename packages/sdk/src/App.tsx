import { PaymentModal } from "./components/PaymentModal";
import PaytronButton from "./components/PaytronButton";
import { usePayment } from "./context/PaymentContext";

function App() {
  const { data } = usePayment();

  const handleSuccess = () => {
    console.log("transaction", data);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <div className="w-[400px] flex flex-col gap-1">
        <div className="h-48 bg-purple-200 rounded-lg mb-">
          <img
            src="/tomato.jpg"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h2 className="text-lg text-gray-800 my-1">Basket of Potoes</h2>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          reiciendis quia cum.
        </p>
        <p className="text-gray-500 text-sm mb-3">20 usdt</p>
        <PaytronButton amount="1" currency="USDT" onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default App;
