import { Select } from "antd";
import NewFooter from "../../homepage/footer/Footer";
import Navigation from "../../homepage/navigation/navigation";
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import {
  FlowValues,
  LengthValues,
  PowerValues,
  PressureValues,
} from "./converterData";

type Result = {
  cfm?: number;
  m3perS?: number;
  m3perHr?: number;
  hp?: number;
  ton?: number;
  btuperHr?: number;
  inch?: number;
  mm?: number;
  Pa?: number;
  inchesOfWater?: number;
  lps?: number;
  psi?: number;
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
  const [input, setInput] = useState<number | null>(null);
  const [isOption, setIsOption] = useState<UnitOption[]>([]);
  const [selectedUnitType, setSelectedUnitType] = useState<string>("");
  const [selectedInputUnit, setSelectedInputUnit] = useState<string>("");
  const [results, setResults] = useState<Result>({});

  const handleUnitTypeChange = (value: string) => {
    setSelectedUnitType(value);
    const unitOptions: Record<string, UnitOption[]> = {
      Flow: FlowValues,
      Power: PowerValues,
      Length: LengthValues,
      Pressure: PressureValues,
    };
    setIsOption(unitOptions[value] || []);
  };

  const calculateResults = () => {
    if (input === null || !selectedInputUnit || !selectedUnitType) {
      setResults({});
      return;
    }
    const conversion = unitConversion[selectedUnitType]?.[selectedInputUnit];
    if (conversion) {
      setResults(conversion(input));
    } else {
      setResults({});
    }
  };

  useEffect(() => {
    calculateResults();
  }, [input, selectedInputUnit, selectedUnitType]);

  const formatKey = (key: string) => {
    switch (key) {
      case "m3perS":
        return "m³/s";
      case "m3perHr":
        return "m³/hr";
      case "btuperHr":
        return "BTU/hr";
      default:
        return key;
    }
  };

  return (
    <div className="w-screen">
      <Navigation />
      <div className="w-screen md:w-96 flex justify-center border-2 rounded-3xl shadow-2xl mx-auto my-20 bg-gray-300">
        <div className="md:p-12 p-2">
          <div className="flex justify-center text-3xl my-4 -translate-y-6 font-bold">
            <h2>Converter</h2>
          </div>
          <div className="md:p-4 p-0">
            <div className="my-2">
              <h1 className="font-bold">Units</h1>
            </div>
            <div className="">
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
            <h1 className="font-bold">Input Parameter</h1>
            <div className="flex gap-2 my-2">
              <Input
              className="w-32"
                onChange={(e) => setInput(Number(e.target.value))}
                type="number"
                min="0"
              />
              <Select
                className="w-44"
                defaultValue={"Select unit"}
                onChange={(value) => setSelectedInputUnit(value)}
                options={isOption}
              />
            </div>
            <h2 className="flex justify-center font-bold mt-8">Result</h2>
            <div className="">
              {Object.entries(results).map(([key, value]) => (
                <div key={key} className="flex justify-center gap-2">
                  <p className="text-gray-600">{value?.toFixed(2)}</p>
                  <p>{formatKey(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default Converter;
