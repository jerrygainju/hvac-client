import { Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Navigation from "../../homepage/navigation/navigation";
import NewFooter from "../../homepage/footer/Footer";
import { useState, useEffect } from "react";
import {
  copperValues,
  pvcValues,
  lightSteelValues,
  mediumSteelValues,
  swsValues,
  materials,
  heavySteelValues,
  sch40Values,
  sch20Values,
} from "./pipeData";

const Pipe = () => {
  const [material, setMaterial] = useState<string>("");
  const [diameterOptions, setDiameterOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [systemType, setSystemType] = useState<number | null>(null);
  const [systemRho, setSystemRho] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [waterFlowRate, setWaterFlowRate] = useState<number | null>(null);
  const [pipeDiameter, setPipeDiameter] = useState<number | null>(null);
  const [velocity, setVelocity] = useState<number | null>(null);
  const [pressureDropResult, setPressureDropResult] = useState<number | null>(null);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const selectedMaterial = (value: string) => {
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
      case "Sch40":
        setDiameterOptions(sch40Values);
        break;
      case "Sch20":
        setDiameterOptions(sch20Values);
        break;
      default:
        setDiameterOptions([]);
    }
  };

  const calculateArea = (diameter: number) => {
    const newDiameter = diameter / 1000;
    const area = (Math.PI * newDiameter * newDiameter) / 4;
    return area;
  };

  const calculateVelocity = () => {
    if (pipeDiameter !== null && waterFlowRate !== null) {
      const area = calculateArea(pipeDiameter);
      const flowRate = waterFlowRate / 1000;
      const velocity = flowRate / area;
      setVelocity(velocity);
    } else {
      setVelocity(null);
    }
  };

  const calRaynouldsNumber = (velocity: number, diameter: number) => {
    if (systemType === null) return null;
    const materialFactor = getMaterialFactor(material);
    const dh = diameter / 1000;
    const reynoldsNum = (materialFactor * velocity * dh) / systemType;
    return Number(reynoldsNum.toFixed(2));
  };

  const getMaterialFactor = (material: string) => {
    switch (material) {
      case "Copper":
        return 0.0015;
      case "PVC":
        return 0.0015;
      case "LightSteel":
        return 0.046;
      case "MediumSteel":
        return 0.046;
      case "HeavySteel":
        return 0.046;
      case "SWS":
        return 0.046;
      case "Sch40":
        return 0.046;
      case "Sch20":
        return 0.046;
      default:
        return 1;
    }
  };

  const getRho = (systemRho: string) => {
    switch (systemRho) {
      case "CW":
        return 994;
      case "HHW":
        return 970.6;
      case "CHW":
        return 999.6;
      default:
        return 1000;
    }
  };

  const calculateF = (diameter: number) => {
    const materialFactor = getMaterialFactor(material);
    const Dh = diameter / 1000;
    if (velocity === null) return null;
    const Re = calRaynouldsNumber(velocity, diameter);
    if (Re === null) return null;
    let f = 0.02;
    const tolerance = 1e-6;
    let iterations = 0;
    while (iterations < 100) {
      const lhs = 1 / Math.sqrt(f);
      const rhs =
        1.74 -
        2 * Math.log10((2 * materialFactor) / Dh + 18.7 / (Re * Math.sqrt(f)));
      const diff = lhs - rhs;
      if (Math.abs(diff) < tolerance) {
        break;
      }
      f = Math.pow(1 / rhs, 2);
      iterations++;
    }
    return Number(f.toFixed(5));
  };

  const pressureDrop = (diameter: number, velocity: number, systemRho: string) => {
    const f = calculateF(diameter);
    if (f === null) return null;
    const dh = diameter / 1000;
    const Rho = getRho(systemRho);
    const delP = (f / dh) * (Rho * velocity * velocity) / 2;
    return Number(delP.toFixed(2));
  };

  useEffect(() => {
    calculateVelocity();
  }, [pipeDiameter, waterFlowRate, material, systemType]);

  useEffect(() => {
    if (pipeDiameter !== null && velocity !== null) {
      const drop = pressureDrop(pipeDiameter, velocity, systemRho);
      setPressureDropResult(drop);
    } else {
      setPressureDropResult(null);
    }
  }, [pipeDiameter, velocity, systemRho]);

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
                      onChange={selectedMaterial}
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
                      defaultValue={{ value: 1, label: "Select type" }}
                      labelInValue
                      options={[
                        { value: 0.00131, label: "CHW" },
                        { value: 0.000346, label: "HHW" },
                        { value: 0.000719, label: "CW" },
                        { value: 0.0001, label: "Others" },
                      ]}
                      onChange={(option: { value: number; label: string }) => {
                        setSystemType(option.value);
                        setSystemRho(option.label);
                      }}
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
                    <p className="md:w-30 w-24 font-semibold">
                      Hours of Operation :
                    </p>
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
                    <input
                      type="number"
                      id="waterFlowRate"
                      className="w-16 h-6"
                      onChange={(e) => setWaterFlowRate(Number(e.target.value))}
                    />
                    <p className="text-gray-500">l/s</p>
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <p className="w-full font-semibold">Pipe Diameter :</p>
                    <Select
                      defaultValue={"Select diameter"}
                      className="w-36"
                      id="pipeDiameter"
                      options={diameterOptions}
                      onChange={(value) => setPipeDiameter(Number(value))}
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
                    <input
                      type="text"
                      className="w-24 rounded-sm"
                      value={pressureDropResult !== null ? pressureDropResult.toFixed(2) : ""}
                      readOnly
                    />
                  </div>
                  <div className="text-gray-600 flex gap-2">
                    <p className="font-semibold">Velocity :</p>
                    <input
                      type="text"
                      className="w-24 rounded-sm"
                      value={velocity !== null ? velocity.toFixed(2) : ""}
                      readOnly
                    />
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
