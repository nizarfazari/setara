import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  loGout: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, loGout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="fixed inset-0 z-auto w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h1 tabIndex={0} className="text-heading-5 font-bold text-primary-100 text-center">
                Anda yakin ingin keluar Website?
                </h1>
            </div>
            <div className="px-4 py-3 flex space-x-4 ">
                <button
                    onClick={onClose}
                    type="button"
                    data-autofocus
                    className="inline-flex flex-grow basis-1/2 justify-center rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold ring-inset hover:bg-gray-50 sm:mt-0"
                >
                    <p className="text-heading-6 font-bold text-primary-100 text-center">
                        Tidak
                    </p>
                </button>
                <button
                    onClick={loGout}
                    type="button"
                    className="bg-primary-100 inline-flex flex-grow basis-1/2 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-200 sm:ml-3"
                >
                    <p  className="text-heading-6 font-bold text-white text-center">
                        Iya
                    </p>
                </button>
            </div>

        </div>
        </div>
        </div>
    </div>
  );
};

export default Popup;
