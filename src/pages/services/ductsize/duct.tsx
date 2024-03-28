import { useState, useEffect } from 'react';
import { Materials, Units } from './components/Inputs';
import DuctForm from './components/duct-form';
import { getElementValue } from '../carparkventilation/components/Extra ';
import NewFooter from '../../homepage/footer/Footer';

const Duct = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedShape, setSelectedShape] = useState('');
  const [equivalentDiameter, setEquivalentDiameter] = useState<number | null>(null);
  const [airflowInputValue, setAirflowInputValue] = useState('');
  const [velocityInputValue, setVelocityInputValue] = useState('');
  console.log(airflowInputValue);
  console.log(velocityInputValue);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  const handleShapeChange = (shape: string) => {
    setSelectedShape(shape);
  };

  const ductOptions = Units();
  const materialOptions = Materials();

  const handleUnitChange = (selectedOption: any) => {
    const airFlow = document.querySelector('#airflow') as HTMLInputElement | null;
    const velocity = document.querySelector('#velocity') as HTMLInputElement | null;
    if (selectedUnit === selectedOption.value) {
      return;
    }
    else if (selectedOption?.value === 'Metric' && airFlow && velocity) {
      airFlow.value = Math.round((getElementValue('airflow') / 2118.8800) * 1000).toString()
      velocity.value = (getElementValue('velocity') / 196.8504).toFixed(3)
    }
    else if (selectedOption?.value === 'Imperial' && airFlow && velocity) {
      airFlow.value = Math.round((getElementValue('airflow') * 2118.8800) / 1000).toString()
      velocity.value = (getElementValue('velocity') * 196.8504).toFixed(3);
    }
    setSelectedUnit(selectedOption ? selectedOption.value : '');
  };

  const eqDiameterCal = () => {
    const q = getElementValue('airflow') / 1000;
    const v = getElementValue('velocity');

    if (selectedUnit === 'Metric') {
      const D = Math.sqrt((4 * q) / (Math.PI * v)) * 1000;
      const parseD = Number(D.toFixed(3))
      setEquivalentDiameter(parseD);
    }

    if (selectedUnit === 'Imperial') {
      const qi = getElementValue('airflow');
      const vi = getElementValue('velocity');
      const Di = Math.sqrt((4 * qi) / (Math.PI * vi)) * 12;
      const parseDi = Number(Di.toFixed(3))
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


const calculateFormula = (a:number, b:number) => {
  return D - 1.3 * Math.pow((a * b), 0.625) / Math.pow((a + b), 0.25)
}


const performIteration = (initialValue:number, b:number, maxIterations:number) => {
  let a = initialValue;

  for (let i = 1; i <= maxIterations; i++) {
    const result = calculateFormula(a, b);

    if (result === 0) {
      console.log(`Iteration ${i}: Found solution. a = ${a}`);
      return a;
    }

    a = result;
    console.log(`Iteration ${i}: a = ${a}`);
  }

  console.log(`Reached maximum iterations (${maxIterations}). Final value for a: ${a}`);
  return a;
}


const D = 190.7;
const b = 2;  

const initialValue = b;

const maxIterations = 7;

const finalValueForA = performIteration(initialValue, b, maxIterations);

console.log(`Final value for a: ${finalValueForA}`);



  useEffect(() => {
    eqDiameterCal();
  }, [selectedUnit]);

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
    />
    <NewFooter />
    </>
  );
};

export default Duct;
