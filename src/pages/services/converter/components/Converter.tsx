import { Select, Tooltip } from "antd";
import NewFooter from "../../../homepage/footer/Footer";
import Navigation from "../../../homepage/navigation/navigation";
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import {
  FlowValues,
  LengthValues,
  PowerValues,
  PressureValues,
} from "./converterData";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import ConverterResult from "../ConverterResult";

type Result = {
  [key: string]: number;
};

type UnitOption = {
  label: string;
  value: string;
};

const unitConversion: Record<
  string,
  Record<string, (input: number) => Result>
> = {
  Flow: {
    lps: (input) => ({
      cfm: (input * 35.3147 * 60) / 1000,
      m3perS: input / 1000,
      m3perHr: (input / 1000) * 3600,
    }),
    cfm: (input) => ({
      m3perS: input * 0.00047194,
      m3perHr: input * 0.00047194 * 3600,
      lps: (input * 1000) / (35.3147 * 60),
    }),
    "m^3/s": (input) => ({
      m3perHr: input * 3600,
      lps: input * 3600 * 1000,
      cfm: input * 35.3147 * 60,
    }),
  },
  Power: {
    KW: (input) => ({
      hp: input * (1000 / 746),
      ton: input * 0.28434,
      btuperHr: input / 1.055,
    }),
    Hp: (input) => ({
      kw: input * (1000 / 746),
      ton: input * 0.28434,
      btuperHr: input * 2545,
    }),
    Ton: (input) => ({
      hp: input / 0.212036,
      kw: input * 3.5,
      btuperHr: input * 12000,
    }),
  },
  Length: {
    mm: (input) => ({
      inch: input / 25.4,
    }),
    inch: (input) => ({
      mm: input * 25.4,
    }),
  },
  Pressure: {
    Pa: (input) => ({
      inchesOfWater: input / (0.0254 * 1000 * 9.81),
    }),
    "Inches of water": (input) => ({
      Pa: input * 0.0254 * 1000 * 9.81,
    }),
  },
};

const Converter = () => {
  const [inputs, setInputs] = useState<{ value: number; unit: string }[]>([]);
  const [unitOptions, setUnitOptions] = useState<UnitOption[]>([]);
  const [selectedUnitType, setSelectedUnitType] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleUnitTypeChange = (value: string) => {
    setSelectedUnitType(value);
    const unitOptionsMap: Record<string, UnitOption[]> = {
      Flow: FlowValues,
      Power: PowerValues,
      Length: LengthValues,
      Pressure: PressureValues,
    };
    setUnitOptions(unitOptionsMap[value] || []);
    setInputs([]);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { value: 0, unit: unitOptions[0]?.value || "" }]);
  };

  const handleDeleteInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputChange = (index: number, value: number) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
  };

  const handleUnitChange = (index: number, unit: string) => {
    const newInputs = [...inputs];
    newInputs[index].unit = unit;
    setInputs(newInputs);
  };

  const calculateResults = () => {
    const newResults = inputs.map(({ value, unit }) => {
      const conversion = unitConversion[selectedUnitType]?.[unit];
      return conversion ? conversion(value) : {};
    });
    setResults(newResults);
  };

  useEffect(() => {
    calculateResults();
  }, [inputs, selectedUnitType]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="w-screen">
      <Navigation />
      <div className="w-screen md:w-96 flex justify-center border-2 rounded-2xl shadow-2xl mx-auto my-20 bg-gray-300">
        <div className="md:p-12 p-2">
          <div className="flex justify-center text-3xl my-4 -translate-y-6 font-bold">
            <h2>Units Converter</h2>
          </div>
          <div className="md:p-4 p-0">
            <div className="my-2">
              <h1 className="font-bold">Units</h1>
            </div>
            <div>
              <Select
                className="w-32"
                defaultValue={"Select Input"}
                onChange={handleUnitTypeChange}
                options={[
                  { label: "Flow", value: "Flow" },
                  { label: "Load", value: "Power" },
                  { label: "Length", value: "Length" },
                  { label: "Pressure", value: "Pressure" },
                ]}
              />
            </div>
          </div>
          <div className="md:p-4 p-0">
            <div className="flex items-center gap-4">
              <h1 className="font-bold">Input Parameters</h1>
              <Tooltip
                title="Additional information"
                overlay={
                  isHovered
                    ? `Select any units to load the input parameters`
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
            {inputs.map((input, index) => (
              <div key={index} className="flex gap-2 my-2">
                <Input
                  className="w-32"
                  value={input.value}
                  onChange={(e) =>
                    handleInputChange(index, Number(e.target.value))
                  }
                  type="number"
                  min="0"
                />
                <Select
                  className="w-36"
                  value={input.unit}
                  onChange={(value) => handleUnitChange(index, value)}
                  options={unitOptions}
                />
                <button
                  className="flex items-center bg-red-500 text-white p-2 h-8 rounded-md"
                  onClick={() => handleDeleteInput(index)}
                >
                  <CloseOutlined />
                </button>
              </div>
            ))}
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              onClick={handleAddInput}
            >
              Add Input
            </button>
            <ConverterResult results={results} />
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default Converter;
