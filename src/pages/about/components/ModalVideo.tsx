import { useState } from "react";
import sideImg from '../../../public/const.jpg';
import { CaretRightOutlined } from "@ant-design/icons";

const ModalVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="object-contain h-full w-[500px]">
        <img src={sideImg} alt="modal-image" />
        </div>
        <div className="flex justify-center items-center text-3xl bg-white hover:text-gray-700 text-orange-700 p-5 lg:-translate-y-80 xl:-translate-y-62 md:-translate-y-64 border-2 border-white rounded-full">
        <button
          onClick={showModal}
        >
          <CaretRightOutlined />
        </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-80">
          <div className="relative w-full max-w-screen-lg">
            <button
              className="absolute -top-11 right-2 text-white text-xl p-2 bg-gray-600 focus:outline-none"
              onClick={handleCancel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <video className="w-full" controls loop muted>
              <source
                src="https://docs.material-tailwind.com/demo.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalVideo;
