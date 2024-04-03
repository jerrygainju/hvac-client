import { useState, useEffect } from "react";
import { Materials, Units } from "./components/Inputs";
import DuctForm from "./components/duct-form";
import { getElementValue } from "../carparkventilation/components/Extra ";
import NewFooter from "../../homepage/footer/Footer";

const Duct = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedShape, setSelectedShape] = useState("");
  const [equivalentDiameter, setEquivalentDiameter] = useState<number | null>(
    null
  );
  const [equivalentDiameter2, setEquivalentDiameter2] = useState<number | null>(
    null
  );
  const [airflowInputValue, setAirflowInputValue] = useState("");
  const [velocityInputValue, setVelocityInputValue] = useState("");
  const [widthInput, setWidthInput] = useState("");
  const [calculatedHeight, setCalculatedHeight] = useState<number>(0);
  const [frictionInput, setFrictionInput] = useState<number | null>(null);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  const handleShapeChange = (shape: string) => {
    setSelectedShape(shape);
  };

  const ductOptions = Units();
  const materialOptions = Materials();

  const handleUnitChange = (selectedOption: any) => {
    const airFlow = document.querySelector(
      "#airflow"
    ) as HTMLInputElement | null;
    const velocity = document.querySelector(
      "#velocity"
    ) as HTMLInputElement | null;

    if (selectedUnit === selectedOption.value) {
      return;
    } else if (selectedOption?.value === "Metric" && airFlow && velocity) {
      airFlow.value = Math.round(
        (getElementValue("airflow") / 2118.88) * 1000
      ).toString();
      velocity.value = (getElementValue("velocity") / 196.8504).toFixed(3);
    } else if (selectedOption?.value === "Imperial" && airFlow && velocity) {
      airFlow.value = Math.round(
        (getElementValue("airflow") * 2118.88) / 1000
      ).toString();
      velocity.value = (getElementValue("velocity") * 196.8504).toFixed(3);
    }

    setSelectedUnit(selectedOption ? selectedOption.value : "");
  };

  const eqDiameterCal = () => {
    const q = getElementValue("airflow") / 1000;
    const v = getElementValue("velocity");

    if (selectedUnit === "Metric") {
      const D = Math.sqrt((4 * q) / (Math.PI * v)) * 1000;
      const parseD = Number(D.toFixed(3));
      setEquivalentDiameter(parseD);
    }

    if (selectedUnit === "Imperial") {
      const qi = getElementValue("airflow");
      const vi = getElementValue("velocity");
      const Di = Math.sqrt((4 * qi) / (Math.PI * vi)) * 12;
      const parseDi = Number(Di.toFixed(3));
      setEquivalentDiameter(parseDi);
    }
  };

  const handleAirFlowChange = (value: string) => {
    setAirflowInputValue(value);
    eqDiameterCal();
  };

  const handleVelocityChange = (value: string) => {
    setVelocityInputValue(value);
    eqDiameterCal();
  };

  const handleHeightChange = (value: string) => {
    setCalculatedHeight(parseFloat(value));
  };

  const handleWidthChange = (value: string) => {
    setWidthInput(value);
    calculateHeight();
  };

  const flowAreaCal = () => {
    const airFlow = getElementValue("airflow");
    const newAirFlow = airFlow / 1000;
    const velocity = getElementValue("velocity");
    const flowArea = newAirFlow / velocity;
    return flowArea;
  };

  const convertFlowArea = () => {
    const flowArea = flowAreaCal();
    const newFlowArea = flowArea * 1000000;
    return newFlowArea;
  };

  const insertWidth = () => {
    const width = getElementValue("width");
    const newFlowArea = convertFlowArea();
    const height = newFlowArea / width;
    return { height };
  };

  const calculateHeight = () => {
    const { height } = insertWidth();
    const notPoint = height / 25;

    if (Number.isInteger(notPoint)) {
      setCalculatedHeight(height);
      return height;
    } else {
      const height2 = (Math.floor(notPoint) + 1) * 25;
      setCalculatedHeight(height2);
      return height2;
    }
  };

  const eqDiameterCal2 = () => {
    const a = calculateHeight();
    const b = getElementValue("width");
    const D = (1.3 * Math.pow(a * b, 0.625)) / Math.pow(a + b, 0.25);
    const diameter = Number(D.toFixed(3));
    setEquivalentDiameter2(diameter);
  };

  const hydraulicDiameterCal = () => {
    const a = calculateHeight();
    const b = getElementValue("width");
    const dh = (4 * (a * b)) / (2 * (a + b));
    const diameter = Number(dh.toFixed(3));
    return diameter;
  };

  const calRaynouldsNumber = () => {
    const velocity = getElementValue("velocity");
    const dh = hydraulicDiameterCal();
    const raynouldNum = 66.4 * velocity * dh;
    return Number(raynouldNum.toFixed(2));
  };

  const calculateF = () => {
    const Dh = hydraulicDiameterCal();
    const Re = calRaynouldsNumber();
    let f = 0.02;
    const tolerance = 1e-6;
    let iterations = 0;
    while (iterations < 100) {
      const lhs = 1 / Math.sqrt(f);
      const rhs =
        -2 * Math.log10(0.09 / (3.7 * Dh) + 2.51 / (Re * Math.sqrt(f)));
      const diff = lhs - rhs;
      if (Math.abs(diff) < tolerance) {
        break;
      }
      f = Math.pow(1 / rhs, 2)
      iterations++;
    }
    setFrictionInput(Number(f.toFixed(5)))
    return (Number(f.toFixed(5)))
  };

  const calculateHeadLoss = () => {
    const f = calculateF();
    const Dh = hydraulicDiameterCal();
    const v = getElementValue('velocity');
    const headLoss = ((1000 * f)/Dh * (1.204 * Math.pow(v, 2))/2)
    return Number(headLoss.toFixed(3))
  }

  const calculateVelocityPressure = () => {
    const v = getElementValue('velocity');
    const velocityPressure = 0.602 * Math.pow(v,2);
    return Number(velocityPressure.toFixed(4));
  }

  useEffect(() => {
    eqDiameterCal();
    eqDiameterCal2();
    calculateF();
    calculateHeight();
    calculateHeadLoss();
    calculateVelocityPressure()
  }, [selectedUnit, airflowInputValue, velocityInputValue, widthInput]);

  return (
    <>
      <DuctForm
        selectedUnit={selectedUnit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        selectedShape={selectedShape}
        handleShapeChange={handleShapeChange}
        ductOptions={ductOptions}
        materialOptions={materialOptions}
        handleUnitChange={handleUnitChange}
        equivalentDiameter={equivalentDiameter}
        handleAirFlowChange={handleAirFlowChange}
        handleVelocityChange={handleVelocityChange}
        calculatedHeight={calculatedHeight}
        eqdiamter2={equivalentDiameter2}
        handleWidthChange={handleWidthChange}
        handleHeightChange={handleHeightChange}
        hydraulicDiameter={hydraulicDiameterCal}
        raynouldNumber={calRaynouldsNumber}
        calculateF={frictionInput}
        calculateHeadLoss = {calculateHeadLoss}
        calculateVelocityPressure = {calculateVelocityPressure}
      />
      <NewFooter />
    </>
  );
};

export default Duct;
