import { useState } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Select } from "antd";
import book from "../../public/Group.png";
import "tailwindcss/tailwind.css";

const AddClient = () => {
  const [isNewClient, setIsNewClient] = useState<boolean>(false);

  const addClient = () => {
    setIsNewClient(true);
  };

  const handleCancel = () => {
    setIsNewClient(false);
  };

  return (
    <div>
      <div
        className="flex justify-center items-center w-44 h-11 text-lg gap-1 border-b p-2 bg-blue-800 text-white rounded-lg cursor-pointer"
        onClick={addClient}
      >
        <button className="flex items-center gap-2">
          <PlusOutlined />
          <p>Add Client</p>
        </button>
      </div>
      {isNewClient && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
          <div className="relative w-[598px] h-[579px] rounded bg-[#D9D9D9]">
            <form className="p-2 rounded">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={book} alt="Book" className="w-6 h-6 mr-2" />
                  <h2 className="text-xl font-semibold">Name and Contact</h2>
                </div>
                <button
                  className="text-black text-2xl p-2 focus:outline-none"
                  onClick={handleCancel}
                >
                  <CloseOutlined />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-6">
                <div>
                  <label htmlFor="customer-name" className="font-semibold">
                    Customer Display Name{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="company-name" className="font-semibold">
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="font-semibold">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="font-semibold">
                    Website
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="other" className="font-semibold">
                    Other
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="font-semibold">
                    Title
                  </label>
                  <Select
                    defaultValue="Title"
                    className="w-full h-9 rounded mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="project-manager" className="font-semibold">
                    Project Manager <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="mobile-number" className="font-semibold">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="font-semibold">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-white h-9 w-full rounded mt-1 p-2"
                  />
                </div>
              </div>
              <div className="flex justify-center my-4">
                <button className="w-44 h-11 text-lg border-b p-2 bg-blue-800 text-white rounded-lg">
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClient;
