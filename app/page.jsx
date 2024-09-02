import Link from "next/link";
import Nav from "./_components/guestNav";
import FaqSection from "./_components/faqSection"
import { FaTelegram } from "react-icons/fa";
import { FaLock, FaBolt, FaDollarSign, FaChartLine, FaBrain, FaExchangeAlt } from "react-icons/fa";


export default function Home() {
  return (
    <main className="min-h-screen bg-cover bg-white">
      <Nav />
      <div className="mx-auto">

        {/* Hero Section */}
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

        {/* Telegram CTA */}
        <section className="text-center mb-20">
          <Link href="https://t.me/WebTradeGlobal">
            <div className="inline-flex items-center bg-black text-white rounded-full px-6 py-4 text-lg md:text-xl cursor-pointer">
              <FaTelegram className="h-5 w-5 mr-2" />
              Join us on Telegram
            </div>
          </Link>
        </section>

        {/* CTA Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 items-center pb-20">
          <div className="flex justify-center items-center">
            <img 
              src="/assets/images/mock.png" 
              alt="Crypto Mockup" 
              className="max-w-xs h-auto"
            />
          </div>
          <div className="flex flex-col justify-center text-center xl:text-left px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6">
              The future of <br className="hidden md:block" /> money is here
            </h2>
            <p className="text-gray-600 mb-8 text-base md:text-lg lg:text-xl">
              We're the most trusted place for people <br className="hidden md:block" /> 
              and businesses to buy, sell, and manage <br className="hidden md:block" /> crypto.
            </p>
            <Link href="/auth/signup">
              <div className="bg-black text-white rounded-full px-6 py-4 text-lg md:text-xl inline-block cursor-pointer">
                Get Started
              </div>
            </Link>
          </div>
        </section>

        {/* Why Using Webtrade Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Use Webtrade?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                  <FaExchangeAlt className="text-4xl text-indigo-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">Decentralized</h4>
                  <p className="text-gray-600">
                    Webtrade is a decentralized exchange built on the Ethereum blockchain, using smart contracts to facilitate trading without a centralized authority.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                  <FaLock className="text-4xl text-indigo-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">Secure</h4>
                  <p className="text-gray-600">
                    Webtrade uses the latest security technology to protect your funds and personal information, ensuring your assets are safe.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                  <FaBolt className="text-4xl text-indigo-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">Fast</h4>
                  <p className="text-gray-600">
                    Designed for efficiency, Webtrade executes trades quickly using the latest technology for a seamless trading experience.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                  <FaDollarSign className="text-4xl text-indigo-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">Low Fees</h4>
                  <p className="text-gray-600">
                    Webtrade charges transparent, low fees per trade, ensuring no hidden costs, just straightforward pricing.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                  <FaChartLine className="text-4xl text-indigo-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">Wide Range of Assets</h4>
                  <p className="text-gray-600">
                    Trade a diverse portfolio of cryptocurrencies, tokens, and digital assets all on a single, easy-to-use platform.
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                  <FaBrain className="text-4xl text-indigo-600 mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-indigo-600">AI & Machine Learning</h4>
                  <p className="text-gray-600">
                    Webtrade leverages AI and machine learning to analyze market data in real-time, offering insights for informed trading decisions.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
          </section>


        {/* FAQ Section */}
        <FaqSection />

        <section className="bg-white text-black py-16">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4">
              What are you waiting for? Start trading now!
            </h2>
            <h3 className="text-4xl font-extrabold mb-12">
              Ready to get started?
            </h3>
            <Link href="/auth/signup">
              <div className="bg-white text-black border-2 border-black rounded-full px-8 py-4 text-lg md:text-xl inline-block cursor-pointer hover:bg-black hover:text-white transition">
                Start Trading
              </div>
            </Link>
            <div className="mt-12">
              <img 
                src="/assets/images/mockup.png" 
                alt="Trading Platform Mockup" 
                className="w-full max-w-7xl mx-auto shadow-lg rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-white text-black font-bold text-center py-8">
          <p>&copy; 2024 Webtrade. All rights reserved.</p>
        </div>


      </div>
    </main>
  );
}

