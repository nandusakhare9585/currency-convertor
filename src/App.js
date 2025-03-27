import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      setConvertedAmount(0);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-no-repeat px-4"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-sm sm:max-w-md mx-auto border border-gray-300 rounded-lg p-6 md:p-8 lg:p-10 backdrop-blur-md bg-white/30 shadow-lg">
        <form 
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From Currency Input */}
          <div className="w-full ">
            <InputBox 
            
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(value) => setAmount(value)}
            />
          </div>

          {/* Swap Button */}
          <div className="relative w-full flex justify-center">
            <button
              type="button"
              className="border border-white rounded-full bg-blue-600 text-white px-4 py-1 transition hover:bg-blue-700 active:scale-95"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          {/* To Currency Input */}
          <div className="w-full">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          {/* Convert Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white text-lg font-medium px-4 py-3 rounded-lg transition hover:bg-blue-700 active:scale-95"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
