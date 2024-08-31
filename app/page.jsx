import Nav from "./_components/guestNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-cover bg-white">
      <Nav />
      <div className="mx-auto">
        <div className="pt-40">
          <h1 className="text-5xl font-bold text-black text-center uppercase">
            You Call The Crypto
          </h1>
          <p className="text-gray-600 text-center my-6">
          From Bitcoin to Ethereum, explore over 2,000+ digital assets and claim your share of <br /> 
          the most sought-after crypto projects on the blockchain. 🚀 <br />
          Capital at risk. T&Cs apply.
          </p>
          <div className="flex justify-center mt-4">
            <button className="bg-black text-white rounded-full p-4">Explore Crypto</button>
          </div>
        </div>

      {/* animated images */}
        <div className="banner">
          <div
            className="slider"
            style={{ "--quantity": 10 }}
          >
            <div className="item" style={{ "--position": 1 }}>
              <img src="assets/images/binance.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 2 }}>
              <img src="assets/images/ethereum.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 3 }}>
              <img src="assets/images/eos.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 4 }}>
              <img src="assets/images/tron.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 5 }}>
              <img src="assets/images/metamask.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 6 }}>
              <img src="assets/images/btc.png" alt="" />
            </div>
            <div className="item" style={{ "--position": 7 }}>
              <img src="assets/images/opensea.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 8 }}>
              <img src="assets/images/telegram.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 9 }}>
              <img src="assets/images/solana.svg" alt="" />
            </div>
            <div className="item" style={{ "--position": 10 }}>
              <img src="assets/images/tether.svg" alt="" />
            </div>
          </div>
        </div>

        <div>
          <button></button>
          <button></button>
        </div>
      </div>
    </main>
  );
}

