import Select from "react-select";
import { Dispatch, SetStateAction, useState } from "react";
import { RadioInput, SelectInput, TextInput } from "./extraInputs";
import Layout from "../../../homepage/navigation/layout";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface DuctFormProps {
  selectedUnit: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  selectedOption: any;
  handleOptionChange: (option: any) => void;
  selectedShape: string;
  handleShapeChange: (shape: string) => void;
  ductOptions: any[];
  materialOptions: any[];
  handleUnitChange: (selectedOption: any) => void;
  equivalentDiameter: number | null;
  handleAirFlowChange: (value: string) => void;
  handleVelocityChange: (value: string) => void;
  isHovered: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  calculatedHeight: number | null;
  eqdiamter2: number | null;
  handleWidthChange: (value: string) => void;
  handleHeightChange: (value: string) => void;
  hydraulicDiameter: () => number | null;
  raynouldNumber: () => number;
  calculateF: number | null;
}
const DuctForm: React.FC<DuctFormProps> = ({
  selectedUnit,
  inputValue,
  setInputValue,
  handleOptionChange,
  selectedOption,
  selectedShape,
  handleShapeChange,
  ductOptions,
  materialOptions,
  handleUnitChange,
  equivalentDiameter,
  handleAirFlowChange,
  handleVelocityChange,
  calculatedHeight,
  eqdiamter2,
  handleWidthChange,
  handleHeightChange,
  hydraulicDiameter,
  raynouldNumber,
  calculateF
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <Layout>
          <div className="flex pt-10 justify-center text-3xl font-bold mb-4 font-serif text-gray-600">
            Duct Size Calculation
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 xl:h-max w-full lg:w-[35%] lg:h-auto pb-6 rounded shadow-2xl">
              <div className="flex flex-row flex-wrap gap-4 pt-4 pl-6">
                <div className="w-full sm:w-1/2 lg:w-1/3 text-gray-600">
                  <b>Units</b>
                  <SelectInput
                    options={ductOptions}
                    placeholder="Select Unit"
                    onChange={handleUnitChange}
                  />
                </div>
                <div className="text-gray-600">
                  <b>Material</b>
                  <Tooltip
                    title="Additional information"
                    overlay={
                      isHovered
                        ? `Value for GI is 1.5 Value for plastic is 2  Value for flex is 2.5`
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
                  <Select
                    options={materialOptions}
                    placeholder="Select Material"
                    className="pt-2"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: "165px",
                        backgroundColor: "rgba(245, 244, 248)",
                        borderColor: "transparent",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        width: "165px",
                        backgroundColor: "rgba(245, 244, 248)",
                      }),
                    }}
                    value={materialOptions.find(
                      (option) => option.label === inputValue
                    )}
                    onChange={(selectedOption) =>
                      setInputValue(selectedOption ? selectedOption.label : "")
                    }
                    formatOptionLabel={(option, { context }) => (
                      <div>
                        {context === "menu" ? option.label : option.label}
                      </div>
                    )}
                  />
                </div>
              </div>
              <hr className="my-4 border-black " />
              <div className="flex flex-col pl-6 gap-2 pr-6 text-gray-600">
                <b> Input Parameter </b>
                <div className="flex flex-row items-center">
                  Airflow
                  <TextInput
                    placeholder="flow rate"
                    onChange={handleAirFlowChange}
                    id="airflow"
                    type="number"
                    unit={selectedUnit === "Metric" ? " l/s" : " cfm"}
                  />
                </div>
                {/* <hr className="my-4 border-black " /> */}
              </div>
              <div className="pl-6 pr-6 pt-4">
                {/* Size By */}
                <RadioInput
                  type="number"
                  label="Size By"
                  options={[
                    { value: "velocity", label: "Velocity" },
                    { value: "frictionLoss", label: "Friction Loss" },
                  ]}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                  additionalInputs={{
                    velocity: {
                      label: "Velocity",
                      id: "velocity",
                      onChange: handleVelocityChange,
                      placeholder: "add velocity",
                      unit: selectedUnit === "Metric" ? " m/s" : " fpm",
                    },
                    frictionLoss: {
                      label: "Friction Loss",
                      id: "frictionloss",
                      placeholder: "add friction loss",
                      unit:
                        selectedUnit === "Metric" ? " Pa/m" : " in. wg/100 ft",
                    },
                  }}
                />
                {/* <hr className="my-4 border-black " /> */}
              </div>
              <div className="pl-6 pr-6 pt-4 text-gray-600">
                <b>Equivalent Diameter: </b>
                <b>
                  {" "}
                  {equivalentDiameter !== null
                    ? `${equivalentDiameter} ${
                        selectedUnit === "Metric" ? "mm" : "in"
                      }`
                    : "result"}{" "}
                </b>
                .
                {/* <button onClick={() => { eqDiameterCal(); }} className="px-2  bg-gray-600 text-white rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline-blue">Calculate</button> */}
                <hr className="my-4 border-black " />
              </div>
              <div className="flex flex-col pl-6 pr-6 text-gray-600">
                <b>Shape of Duct</b>
                <div className="flex flex-row gap-12 pt-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="round"
                      checked={selectedShape === "round"}
                      onChange={() => handleShapeChange("round")}
                      className="h-4 w-4"
                    />
                    <span className="pl-2">Round</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="rect"
                      checked={selectedShape === "rect"}
                      onChange={() => handleShapeChange("rect")}
                      className="h-4 w-4"
                    />
                    <span className="pl-2">Rectangle</span>
                  </label>
                </div>
                <div className="flex flex-row pt-4">
                  <div>
                    {selectedShape === "round" && (
                      <div>
                        Round: result
                        {selectedUnit === "Metric" ? " mm" : " in. (Diameter)"}:
                      </div>
                    )}
                  </div>
                  <div>
                    {selectedShape === "rect" && (
                      <div>
                        Rectangle: result
                        {selectedUnit === "Metric" ? " mm" : " in"}
                      </div>
                    )}
                  </div>
                </div>
                <hr className="my-4 border-black " />
              </div>
              <div className="flex flex-col pl-6 pr-6 text-gray-600">
                <b>Duct Size</b>
                <div className="flex flex-col sm:flex-row items-center">
                  Width × Height ={" "}
                  <TextInput
                    type="number"
                    id="width"
                    placeholder="Width"
                    unit={selectedUnit === "Metric" ? " mm" : " in"}
                    onChange={handleWidthChange}
                  />
                  <span className="pl-2"> × </span>
                  <TextInput
                    type="number"
                    id="height"
                    placeholder="height"
                    unit={selectedUnit === "Metric" ? " mm" : " in"}
                    value={calculatedHeight}
                    onChange={(e) => handleHeightChange(e)}
                  />
                </div>

                <hr className="my-4 border-black " />
              </div>
              <div className="flex flex-col pl-6 pr-6 items-center text-gray-600">
                <b>Additional Information</b>
                <div className="pt-2">
                  Equivalent Diameter: {eqdiamter2}
                  {selectedUnit === "Metric" ? " mm" : " in"}
                </div>
                <div className="pt-2">
                  Hydraulic Diameter: {hydraulicDiameter()}
                  {selectedUnit === "Metric" ? " mm" : " in"}
                </div>
                <div className="pt-2">
                  Raynould Number: {raynouldNumber()}
                  {/* {selectedUnit === "Metric" ? " mm" : " in"} */}
                </div>
                <div className="pt-2">
                  Fluid Velocity: result
                  {selectedUnit === "Metric" ? " m/s" : " ft/min"}
                </div>
                <div className="pt-2">Friction Factor: {calculateF}</div>
                <div className="pt-2">
                  Velocuty Pressure: result
                  {selectedUnit === "Metric" ? " Pa" : " in.WC"}
                </div>
                <div className="pt-2">
                  Head Loss: result
                  {selectedUnit === "Metric" ? " Pa/m" : " in.WC/100ft"}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default DuctForm;
