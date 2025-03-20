import React, { useState } from 'react';

const SupportUsPage = () => {
  const [donationAmount, setDonationAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isRecurring, setIsRecurring] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount('custom');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Donation submitted:', {
      amount: donationAmount === 'custom' ? customAmount : donationAmount,
      paymentMethod,
      isRecurring
    });
    setShowThankYou(true);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">

      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="text-yellow-400">Support</span> 
            <span className="text-purple-600"> Our Mission</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us in our fight against corporate greed. Your contribution helps us expose unethical practices and advocate for fair business standards.
          </p>
        </div>
        
        {showThankYou ? (
          <div className="max-w-2xl mx-auto bg-gray-900 border border-purple-600 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4 text-yellow-400">❤</div>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Thank You for Your Support!</h2>
            <p className="text-gray-300 mb-6">
              Your contribution makes a real difference in our mission to expose corporate greed and promote ethical business practices. 
              You'll receive a confirmation email shortly with details of your donation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button 
                onClick={() => setShowThankYou(false)} 
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md font-medium transition duration-300"
              >
                Make Another Donation
              </button>
              <button 
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-md font-medium transition duration-300"
              >
                Share on Social Media
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Donation Form */}
            <div className="md:col-span-2 bg-gray-900 p-8 rounded-lg border border-purple-800 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-yellow-400">Make a Donation</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-400 mb-3">Select Donation Amount</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {['10', '25', '50', '100'].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-3 rounded-md font-bold transition duration-300 ${
                          donationAmount === amount 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                        onClick={() => handleAmountSelect(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      type="radio"
                      id="customAmount"
                      name="donationAmount"
                      checked={donationAmount === 'custom'}
                      onChange={() => setDonationAmount('custom')}
                      className="mr-2"
                    />
                    <label htmlFor="customAmount" className="text-gray-400 mr-3">
                      Custom Amount:
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter amount"
                        className="bg-gray-800 border border-gray-700 rounded-md py-2 pl-8 pr-4 text-white w-32 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRecurring}
                      onChange={() => setIsRecurring(!isRecurring)}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Make this a monthly donation</span>
                  </label>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 mb-3">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className={`py-3 px-4 rounded-md font-medium transition duration-300 flex items-center justify-center ${
                        paymentMethod === 'card' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <span className="mr-2">💳</span> Card
                    </button>
                    <button
                      type="button"
                      className={`py-3 px-4 rounded-md font-medium transition duration-300 flex items-center justify-center ${
                        paymentMethod === 'paypal' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <span className="mr-2">🅿️</span> PayPal
                    </button>
                    <button
                      type="button"
                      className={`py-3 px-4 rounded-md font-medium transition duration-300 flex items-center justify-center ${
                        paymentMethod === 'crypto' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('crypto')}
                    >
                      <span className="mr-2">₿</span> Crypto
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-md transition duration-300 mt-6"
                >
                  Complete Donation
                </button>
              </form>
            </div>
            
            {/* Support Info */}
            <div className="bg-gray-900 p-8 rounded-lg border border-purple-800 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-yellow-400">Why Support Us?</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Exposing Corporate Wrongdoing</h3>
                  <p className="text-gray-400">Your support helps us investigate and expose corporations that harm consumers and communities.</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Advocating for Change</h3>
                  <p className="text-gray-400">We push for stronger regulations and accountability in the business world.</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Educational Initiatives</h3>
                  <p className="text-gray-400">We create resources to help consumers understand their rights and make informed choices.</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-md mt-8">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Our Impact</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Exposed 12 major corporate scandals in 2024</li>
                    <li>Helped secure $42M in consumer restitution</li>
                    <li>Supported legislation leading to 3 new consumer protection laws</li>
                    <li>Published 28 investigative reports</li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Other Ways to Help</h3>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center text-gray-300 hover:text-yellow-400">
                      <span className="bg-gray-800 p-2 rounded-full mr-3">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>
                        </svg>
                      </span>
                      Volunteer Your Time
                    </a>
                    <a href="#" className="flex items-center text-gray-300 hover:text-yellow-400">
                      <span className="bg-gray-800 p-2 rounded-full mr-3">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>
                        </svg>
                      </span>
                      Spread Awareness
                    </a>
                    <a href="#" className="flex items-center text-gray-300 hover:text-yellow-400">
                      <span className="bg-gray-800 p-2 rounded-full mr-3">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>
                        </svg>
                      </span>
                      Corporate Partnerships
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Donor Recognition */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-purple-600">Our</span> 
            <span className="text-yellow-400"> Supporters</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-purple-800 rounded-lg p-6 text-center">
              <div className="text-yellow-400 text-xl font-bold mb-1">Platinum</div>
              <div className="text-white text-3xl font-bold mb-2">$10,000+</div>
              <div className="text-gray-400 text-sm">
                <div className="font-medium">Benefits include:</div>
                <div>Special recognition</div>
                <div>VIP event access</div>
                <div>Annual report feature</div>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-purple-800 rounded-lg p-6 text-center">
              <div className="text-yellow-400 text-xl font-bold mb-1">Gold</div>
              <div className="text-white text-3xl font-bold mb-2">$5,000+</div>
              <div className="text-gray-400 text-sm">
                <div className="font-medium">Benefits include:</div>
                <div>Website recognition</div>
                <div>Quarterly newsletters</div>
                <div>Event invitations</div>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-purple-800 rounded-lg p-6 text-center">
              <div className="text-yellow-400 text-xl font-bold mb-1">Silver</div>
              <div className="text-white text-3xl font-bold mb-2">$1,000+</div>
              <div className="text-gray-400 text-sm">
                <div className="font-medium">Benefits include:</div>
                <div>Donor wall listing</div>
                <div>Digital certificate</div>
                <div>Monthly updates</div>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-purple-800 rounded-lg p-6 text-center">
              <div className="text-yellow-400 text-xl font-bold mb-1">Bronze</div>
              <div className="text-white text-3xl font-bold mb-2">$100+</div>
              <div className="text-gray-400 text-sm">
                <div className="font-medium">Benefits include:</div>
                <div>Thank you email</div>
                <div>Digital badge</div>
                <div>Newsletter mention</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      

    </div>
  );
};

export default SupportUsPage;