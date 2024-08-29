import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaRegCopy } from 'react-icons/fa';

export default function Deposit({ isOpenModel, onClose ,refresh}) {
  const [wallets, setWallets] = useState([]);
  const [amount, setAmount] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [proofImagePath, setProofImagePath] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallets`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWallets(data);
        } else {
          console.log(await response.json());
        }
      } catch (error) {
        console.error('Fetching data failed:', error);
      }
    };

    fetchData();
  }, []);

  if (!isOpenModel) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL for the file
      const fileUrl = URL.createObjectURL(file);
      setProofImage(file);
      setProofImagePath(fileUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!proofImage) {
      alert('Please upload a proof image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('proofImage', proofImage);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/deposit`, {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
  
      if (response.ok) {
        refresh()
        alert('Deposit successful');
        onClose();
      } else {
        alert('Deposit failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full bg-gray-900 bg-opacity-70">
      <div className="p-4 w-full max-w-2xl rounded-2xl shadow-lg shadow-gray-600" style={{ backgroundColor:"#212325" }}>
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-semibold text-blue-500">
            Deposit Funds
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
            onClick={onClose}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Wallet Addresses
            </h4>
            <div>
              {wallets.length > 0 ? (
                wallets.map((wallet, index) => (
                  <div key={index} className='flex items-center justify-between rounded-full p-4 border-2 border-zinc-700 bg-transparent text-white'>
                    <div>{wallet.address}</div>
                    <button onClick={() => copyAddress(wallet.address)}>
                      <FaRegCopy className='h-5 w-5'/>
                    </button>
                  </div>
                ))
              ) : (
                <p>No wallets available.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="proofImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Proof of Deposit Image
              </label>
              <input
                type="file"
                id="proofImage"
                onChange={handleFileChange}
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                accept="image/*"
                required
              />
              {proofImagePath && (
                <div className="mt-4">
                  <img src={proofImagePath} alt="Proof of Deposit" className="w-full h-auto rounded-lg" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-8 p-4 bg-blue-500 text-white rounded-full w-full hover:bg-blue-400 flex justify-center items-center"
            >
              Confirm Deposit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
