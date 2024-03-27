import Select from 'react-select';
import { Dispatch, SetStateAction } from 'react';
import { RadioInput, SelectInput, TextInput } from './extraInputs';
import Layout from '../../homepage/navigation/layout';
import NewFooter from '../../homepage/home/footer/NewFooter';

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
    handleVelocityChange
}) => {
    return (
        <div className="flex h-screen justify-center w-screen overflow-x-hidden " >
            <div className='flex flex-col xl:w-1/2 lg:w-[50%] sm:w-[90%] items-center'>
                <Layout>
                    <div className='flex pt-10 justify-center w-full text-3xl font-bold mb-4 font-serif text-gray-600'>
                        Duct Size Calculation
                    </div>
                    <div className='flex justify-center pb-16'>
                        <div className="bg-gray-200 xl:h-max w-full lg:w-[35%] lg:h-auto pb-6 rounded shadow-xl">
                            <div className='flex flex-row flex-wrap gap-4 pt-4 pl-6'>
                                <div className='w-full sm:w-1/2 lg:w-1/3 text-gray-600'>
                                    <b>Units</b>
                                    <SelectInput
                                        options={ductOptions}
                                        placeholder="Select Unit"
                                        onChange={handleUnitChange}
                                    />
                                </div>
                                <div className='text-gray-600'>
                                    <b>Material</b>
                                    <Select
                                        options={materialOptions}
                                        placeholder="Select Material"
                                        className='pt-2'
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                width: '165px',
                                                backgroundColor: 'rgba(245, 244, 248)',
                                                borderColor: 'transparent',
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                width: '165px',
                                                backgroundColor: "rgba(245, 244, 248)"
                                            }),
                                        }}
                                        value={materialOptions.find(option => option.value === inputValue)}
                                        onChange={(selectedOption) => setInputValue(selectedOption ? selectedOption.value : '')}
                                        formatOptionLabel={(option, { context }) => (
                                            <div>
                                                {context === 'menu' ? option.label : option.value}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <hr className="my-4 border-black " />
                            <div className='flex flex-col pl-6 gap-2 pr-6 text-gray-600'>
                                <b> Parameter </b>
                                <div className='flex flex-row items-center'>
                                    Airflow
                                    <TextInput
                                        placeholder='flow rate'
                                        onChange={handleAirFlowChange}
                                        id='airflow'
                                        type='number'
                                        unit={selectedUnit === 'Metric' ? ' l/s' : ' cfm'}
                                    />
                                </div>
                                <hr className="my-4 border-black " />
                            </div>
                            <div className='pl-6 pr-6'>
                                {/* Size By */}
                                <RadioInput
                                    type='number'
                                    label="Size By"
                                    options={[
                                        { value: 'velocity', label: 'Velocity' },
                                        { value: 'frictionLoss', label: 'Friction Loss' },
                                    ]}
                                    selectedOption={selectedOption}
                                    onChange={handleOptionChange}
                                    additionalInputs={{
                                        velocity: {
                                            label: 'Velocity',
                                            id: 'velocity',
                                            onChange: handleVelocityChange,
                                            placeholder: 'add velocity',
                                            unit: selectedUnit === 'Metric' ? ' m/s' : ' fpm',
                                        },
                                        frictionLoss: {
                                            label: 'Friction Loss',
                                            id: 'frictionloss',
                                            placeholder: 'add friction loss',
                                            unit: selectedUnit === 'Metric' ? ' Pa/m' : ' in. wg/100 ft',
                                        },
                                    }}
                                />
                                <hr className="my-4 border-black " />
                            </div>
                            <div className='pl-6 pr-6 text-gray-600'>
                                <b>Equivalent Diameter: </b>
                                <b> {equivalentDiameter !== null
                                    ? `${equivalentDiameter} ${selectedUnit === 'Metric' ? 'mm' : 'in'}`
                                    : 'result'} {' '} </b>.
                                {/* <button onClick={() => { eqDiameterCal(); }} className="px-2  bg-gray-600 text-white rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline-blue">Calculate</button> */}
                                <hr className="my-4 border-black " />
                            </div>
                            <div className='flex flex-col pl-6 pr-6 text-gray-600'>
                                <b>Shape of Duct</b>
                                <div className='flex flex-row gap-12 pt-4'>
                                    <label className='flex items-center'>
                                        <input
                                            type='radio'
                                            value='round'
                                            checked={selectedShape === "round"}
                                            onChange={() => handleShapeChange("round")}
                                            className="h-4 w-4"
                                        />
                                        <span className='pl-2'>Round</span>
                                    </label>
                                    <label className='flex items-center'>
                                        <input
                                            type='radio'
                                            value='rect'
                                            checked={selectedShape === "rect"}
                                            onChange={() => handleShapeChange("rect")}
                                            className="h-4 w-4"
                                        />
                                        <span className='pl-2'>Rectangle</span>
                                    </label>
                                </div>
                                <div className='flex flex-row pt-4'>
                                    <div>
                                        {selectedShape === "round" && (
                                            <div>
                                                Round: result
                                                {selectedUnit === 'Metric' ? ' mm' : ' in. (Diameter)'}:
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {selectedShape === "rect" && (
                                            <div>
                                                Rectangle: result
                                                {selectedUnit === 'Metric' ? ' mm' : ' in'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <hr className="my-4 border-black " />
                            </div>
                            <div className='flex flex-col pl-6 pr-6 text-gray-600'>
                                <b>Duct Size</b>
                                <div className='flex flex-col sm:flex-row items-center'>
                                    Width × Height = {" "}
                                    <TextInput
                                        type='number'
                                        id='width'
                                        placeholder='Width'
                                        unit={selectedUnit === 'Metric' ? ' mm' : ' in'}
                                    />
                                    <span className='pl-2'> × </span>
                                    <TextInput
                                        type='number'
                                        id='height'
                                        placeholder='height'
                                        unit={selectedUnit === 'Metric' ? ' mm' : ' in'}
                                    />
                                </div>
                                {/* <div className='pt-2'>
                            Width × Height = {" "}
                            <input placeholder='width' style={{ backgroundColor: 'rgb(255, 216, 155)' }} className='rounded w-24 h-8 text-center' />
                            {selectedUnit === 'Metric' ? ' mm' : ' in'}  ×  {' '}
                            <input placeholder='height' style={{ backgroundColor: 'rgb(255, 216, 155)' }} className='rounded w-24 h-8 text-center' />
                            {selectedUnit === 'Metric' ? ' mm' : ' in'}
                        </div> */}
                                <hr className="my-4 border-black " />
                            </div>
                            <div className='flex flex-col pl-6 pr-6 items-center text-gray-600'>
                                <b>Additional Information</b>
                                <div className='pt-2'>
                                    Equivalent Diameter: result
                                    {selectedUnit === 'Metric' ? ' mm' : ' in'}
                                </div>
                                <div className='pt-2'>
                                    Flow Area: result
                                    {selectedUnit === 'Metric' ? ' mm' : ' ft'}
                                    {selectedUnit === 'Metric' && <sup>2</sup>}
                                    {selectedUnit !== 'Metric' && <sup>2</sup>}
                                </div>
                                <div className='pt-2'>
                                    Fluid Velocity: result
                                    {selectedUnit === 'Metric' ? ' m/s' : ' ft/min'}
                                </div>
                                <div className='pt-2'>
                                    Reynolds Number: result

                                </div>
                                <div className='pt-2'>
                                    Friction Factor: result
                                </div>
                                <div className='pt-2'>
                                    Velocuty Pressure: result
                                    {selectedUnit === 'Metric' ? ' Pa' : ' in.WC'}
                                </div>
                                <div className='pt-2'>
                                    Head Loss: result
                                    {selectedUnit === 'Metric' ? ' Pa/m' : ' in.WC/100ft'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <NewFooter />
                </Layout>
            </div>
        </div>

    );
};

export default DuctForm;



{/* <b>Size By </b>
                        <div className='flex flex-row gap-10 pt-4'>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="velocity"
                                        checked={selectedOption === "velocity"}
                                        onChange={() => handleOptionChange("velocity")}
                                        className="h-4 w-4"
                                    />
                                    <span className="pl-2">Velocity</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="frictionLoss"
                                        checked={selectedOption === "frictionLoss"}
                                        onChange={() => handleOptionChange("frictionLoss")}
                                        className="h-4 w-4"

                                    />
                                    <span className="pl-2">Friction Loss</span>
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-row pt-4'>
                            <div>
                                {selectedOption === "velocity" && (
                                    <div>
                                        Velocity: <input placeholder='add velocity' style={{ backgroundColor: 'rgb(255, 216, 155)' }} className='rounded w-28 h-8 text-center' />
                                        {selectedUnit === 'Metric' ? ' m/s' : ' fpm'}
                                    </div>
                                )}
                            </div>
                            <div>
                                {selectedOption === "frictionLoss" && (
                                    <div>
                                        Friction Loss: <input placeholder='add friction loss' style={{ backgroundColor: 'rgb(255, 216, 155)' }} className='rounded w-32 h-8 text-center' />
                                        {selectedUnit === 'Metric' ? ' Pa/m' : ' in. wg/100 ft'}
                                    </div>
                                )}
                            </div>
                        </div> */}
