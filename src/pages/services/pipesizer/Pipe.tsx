import { Select } from "antd";
import Navigation from "../../homepage/navigation/navigation";
import NewFooter from "../../homepage/footer/Footer";

const Pipe = () => {
  return (
    <div className="w-screen">
      <Navigation />
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center font-bold font-serif text-3xl text-gray-600 pt-10">
            Pipe Sizer
          </div>
          <div className="flex justify-center items-center my-4">
            <div className="bg-gray-200 p-8 rounded shadow-2xl">
              <div className="border-b border-black">
                <div className="flex gap-32 my-4">
                  <div className="text-gray-600 w-1/5 p-1">
                    <b>Unit</b>
                    <Select
                      className="w-32"
                      defaultValue={"Select Unit"}
                      options={[
                        { value: "SI", label: "SI" },
                        { value: "Metric", label: "Metric" },
                      ]}
                    />
                  </div>
                  <div className="text-gray-600 w-1/5">
                    <b>Material</b>
                    <Select
                    className="w-36"
                      defaultValue={"Select material"}
                      options={[
                        { value: "Copper", label: "Copper" },
                        { value: "Steel", label: "Steel" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-black">
                <h1 className="font-bold text-gray-600 my-4">NCC Parameters</h1>
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="text-gray-600 flex items-center gap-2">
                    <p className="font-semibold">System Type :</p>
                    <Select
                    className="w-32"
                      defaultValue={"Select type"}
                      options={[
                        { value: "CHW", label: "CHW" },
                        { value: "HHW", label: "HHW" },
                        { value: "CW", label: "CW" },
                        { value: "Others", label: "Others" },
                      ]}
                    />
                  </div>
                  <div className="text-gray-600 flex items-center gap-3">
                    <p className="font-semibold">D/ND :</p>
                    <Select
                      className="w-36"
                      defaultValue={"Select D/ND"}
                      options={[
                        { value: "Distributive", label: "Distributive" },
                        {
                          value: "Non-Distributive",
                          label: "Non Distributive",
                        },
                      ]}
                    />
                  </div>
                  <div className="text-gray-600 flex items-center gap-2">
                    <p className="w-30 font-semibold">Hours of Operation :</p>
                    <Select
                      defaultValue={"Select hours"}
                      className="w-36"
                      options={[
                        { value: "<=2000", label: "<=2000 hrs" },
                        { value: "2000-5000", label: "2000 - 5000 hrs" },
                        { value: ">5000", label: ">5000 hrs" },
                      ]}
                    />
                  </div>
                  <div className="text-gray-600 flex items-center gap-4">
                    <p className="font-semibold">Flow Type :</p>
                    <Select
                      defaultValue={"Select Flow Type"}
                      options={[
                        { value: "Variable", label: "Variable" },
                        { value: "Constant", label: "Constant" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-black">
                <div className="my-4">
                  <b className="text-gray-600">Input Parameters</b>
                </div>
                <div className="flex gap-12 my-6">
                  <div className="text-gray-600 flex items-center gap-1">
                    <p className="font-semibold">Water Flow Rate :</p>
                    <input type="number" className="w-16 h-6" />{" "}
                    <p className="text-gray-500">l/s</p>
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <p className="w-full font-semibold">Pipe Diameter :</p>
                    <Select
                      defaultValue={"Select diameter"}
                      className="36"
                      options={[
                        { value: 15, label: "15" },
                        { value: 20, label: "20" },
                        { value: 25, label: "25" },
                        { value: 32, label: "32" },
                        { value: 40, label: "40" },
                        { value: 50, label: "50" },
                        { value: 65, label: "65" },
                        { value: 80, label: "80" },
                        { value: 100, label: "100" },
                        { value: 125, label: "125" },
                        { value: 150, label: "150" },
                        { value: 200, label: "200" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className="font-bold my-4 text-gray-600">Results</h1>
                <div className="flex flex-col gap-6">
                  <div className="text-gray-600 flex gap-4">
                    <p className="font-semibold">Pa/m :</p>
                    <input type="text" className="w-24 rounded-sm" />
                  </div>
                  <div className="text-gray-600 flex gap-2">
                    <p className="font-semibold">Velocity :</p>
                    <input type="text" className="w-24 rounded-sm" />
                    m/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default Pipe;
