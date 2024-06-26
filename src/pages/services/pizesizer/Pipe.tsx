import { Select } from "antd";
import Navigation from "../../homepage/navigation/navigation";
import NewFooter from "../../homepage/footer/Footer";
import { useState } from "react";
import {
  copperValues,
  pvcValues,
  lightSteelValues,
  mediumSteelValues,
  swsValues,
  materials,
  heavySteelValues,
} from "./pipeData";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const Pipe = () => {
  const [material, setMaterial] = useState<string>("");
  const [diameterOptions, setDiameterOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [isHovered, setIsHovered] = useState(false);
  console.log(material, '');
const handleMouseOver = () => {
  setIsHovered(true);
};

const handleMouseOut = () => {
  setIsHovered(false);
};
  const handleMaterialChange = (value: string) => {
    setMaterial(value);
    switch (value) {
      case "Copper":
        setDiameterOptions(copperValues);
        break;
      case "PVC":
        setDiameterOptions(pvcValues);
        break;
      case "LightSteel":
        setDiameterOptions(lightSteelValues);
        break;
      case "MediumSteel":
        setDiameterOptions(mediumSteelValues);
        break;
      case "HeavySteel":
        setDiameterOptions(heavySteelValues);
        break;
      case "SWS":
        setDiameterOptions(swsValues);
        break;
      default:
        setDiameterOptions([]);
    }
  };

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
                <div className="flex md:flex-row flex-col md:gap-32 gap-4 my-4">
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
                      className="w-48"
                      defaultValue={"Select material"}
                      options={materials}
                      onChange={(value) => handleMaterialChange(value)}
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-black">
                <h1 className="font-bold text-gray-600 my-4">NCC Parameters</h1>
                <div className="grid md:grid-cols-2 gap-4 my-6">
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
                  <div className="text-gray-600 flex items-center md:gap-2">
                    <p className="md:w-30 w-24 font-semibold">Hours of Operation :</p>
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
                <div className="flex md:flex-row flex-col gap-12 my-6">
                  <div className="text-gray-600 flex items-center gap-1">
                    <p className="font-semibold">Water Flow Rate :</p>
                    <input type="number" className="w-16 h-6" />
                    <p className="text-gray-500">l/s</p>
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <p className="w-full font-semibold">Pipe Diameter :</p>

                    <Select
                      defaultValue={"Select diameter"}
                      className="w-36"
                      options={diameterOptions}
                    />
                    <Tooltip
                    title="Additional information"
                    overlay={
                      isHovered
                        ? `Select any material to view the diameters`
                        : ""
                    }
                    visible={isHovered}
                    placement="top"
                  >
                    <span
                      onMouseEnter={handleMouseOver}
                      onMouseLeave={handleMouseOut}
                      style={{ marginLeft: "4px", cursor: "pointer" }}
                    >
                      <InfoCircleOutlined />
                    </span>
                  </Tooltip>
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
