import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        <div className="bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="relative flex flex-col p-8">
            <h3 className="text-xl font-semibold mb-4">Confirm Sign Out</h3>
            <p className="mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 mr-2 text-sm font-semibold text-gray-600 bg-transparent border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
