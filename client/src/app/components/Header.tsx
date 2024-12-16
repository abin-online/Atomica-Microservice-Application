import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Section - Logo */}
        <div className="text-2xl font-semibold">Atomica</div>

        {/* Middle Section - Navigation Buttons */}
        <nav className="hidden md:flex space-x-6">
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">Quick Test</button>
          <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">Problems</button>
        </nav>

        {/* Right Section - Profile */}
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full"
          />
          <span className="hidden md:block">Profile</span>
        </div>
      </div>

      {/* Mobile View - Navigation Buttons */}
      <div className="md:hidden mt-4 space-y-4">
        <button className="w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">Quick Test</button>
        <button className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">Problems</button>
      </div>
    </header>
  );
};

export default Header;
