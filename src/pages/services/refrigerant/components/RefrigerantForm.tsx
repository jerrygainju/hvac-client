import { Input, Tooltip } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

interface RefrigerantFormProps {
    onAddFcu: (condenserIndex: number) => void;
    onDeleteFcu: (condenserIndex: number, fcuIndex: number) => void;
    onDeleteCondenser: (condenserIndex: number) => void;
    fcuList: string[][];
    onAddCondenser: () => void;
    condenserList: string[];
    totalRefrigerantCharges: number[];
    handleAdditionalRefrigerantCharge: (index: number, value: number) => void;
    handlePrechargedRefrigerantCharge: (index: number, value: number) => void;
    totalVolumes: number[][];
    handleArea: (condenserIndex: number, fcuIndex: number, value: number) => void;
    handleHeight: (condenserIndex: number, fcuIndex: number, value: number) => void;
    refrigerantOptions: any[];
    selectRefrigerantTypes: string[];
    handleRefrigerantType: (event: any, condenserIndex: number) => void;
    chargeLimits: (number | undefined)[][];
    remark: string[][]
}

const RefrigerantForm: React.FC<RefrigerantFormProps> = ({
    onAddFcu,
    onDeleteFcu,
    onDeleteCondenser,
    fcuList,
    onAddCondenser,
    condenserList,
    totalRefrigerantCharges,
    handleAdditionalRefrigerantCharge,
    handlePrechargedRefrigerantCharge,
    totalVolumes,
    handleArea,
    handleHeight,
    refrigerantOptions,
    selectRefrigerantTypes,
    handleRefrigerantType,
    chargeLimits,
    remark

}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };
    return (
        <div className="lg:pt-12 sm:pt-6">
            <div className="font-mono text-3xl text-gray-500 text-center">
                Refrigerant Charge Calculation
            </div>
            <div className="flex flex-col gap-2 px-12 pt-12">
                <Input placeholder="Enter Project Name" className="w-40" id="prj1" />
                <button onClick={onAddCondenser} className="text-sm border rounded p-2 bg-gray-500 text-white hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-800 w-40">Add Condenser</button>
            </div>
            <div className="flex flex-row gap-2 px-12 pt-6">
                <div className="flex flex-col items-center">
                    {condenserList.map((_, condenserIndex) => (
                        <div className="flex flex-row pt-6 text-sm" key={condenserIndex}>
                            <div className="flex flex-col items-center font-mono text-gray-600">
                                <div>Condenser {condenserIndex + 1}</div>
                                <div className="flex flex-row gap-1">
                                    {condenserIndex !== 0 && (
                                        <button onClick={() => onDeleteCondenser(condenserIndex)}>
                                            <DeleteOutlined className="text-red-500 hover:text-red-700" />
                                        </button>
                                    )}
                                    <Input placeholder="Enter condenser name" className="text-center w-40" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center font-mono gap-1 text-gray-600 pl-4">
                                <div> Refrigerant Type </div>
                                <div>
                                    <select
                                        className="text-center w-32 py-2 border border-gray rounded-lg"
                                        value={selectRefrigerantTypes[condenserIndex]}
                                        onChange={(e) => handleRefrigerantType(e, condenserIndex)}
                                    >
                                        <option value="">Type</option>
                                        {refrigerantOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 pt-6 pl-1">
                                {fcuList[condenserIndex].map((_, fcuIndex) => (
                                    <div key={fcuIndex} className="flex flex-row gap-1 items-center">
                                        <Input placeholder={`Enter FCU ${fcuIndex + 1}`} className="w-40 text-center" />
                                        {fcuIndex !== 0 && (
                                            <button onClick={() => onDeleteFcu(condenserIndex, fcuIndex)}>
                                                <DeleteOutlined className="text-red-500 hover:text-red-700" />
                                            </button>
                                        )}
                                        <button onClick={() => onAddFcu(condenserIndex)}>
                                            <PlusOutlined className="text-blue-500 hover:text-blue-700" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center font-mono gap-2 text-gray-600 pl-4">
                                <div> Refrigerant Charge(kg) </div>
                                <div><Input placeholder="Additional Refrigerant" className="text-center w-32" type="number" onChange={(e) => handleAdditionalRefrigerantCharge(condenserIndex, parseFloat(e.target.value))} /> </div>
                                <div><Input placeholder="Precharged Refrigerant" className="text-center w-32" type="number" onChange={(e) => handlePrechargedRefrigerantCharge(condenserIndex, parseFloat(e.target.value))} /> </div>
                                <div className="text-gray-400"> Result: {totalRefrigerantCharges[condenserIndex]} kg </div>
                            </div>
                            <div className="flex flex-col items-center font-mono gap-1 text-gray-600 pl-4">
                                <div> Area Served </div>
                                {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex}><Input placeholder="Enter Area Served" className="text-center w-24" /> </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center font-mono gap-1 text-gray-600 pl-4">
                                <div> Area m<sup>2</sup></div>
                                {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex}><Input placeholder="Enter Area" className="text-center w-24" type="number" onChange={(e) => handleArea(condenserIndex, fcuIndex, parseFloat(e.target.value))} /> </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center font-mono gap-1 text-gray-600 pl-4">
                                <div> Height m</div>
                                {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex}><Input placeholder="Enter height" className="text-center w-24" type="number" onChange={(e) => handleHeight(condenserIndex, fcuIndex, parseFloat(e.target.value))} /> </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center  font-mono gap-2 text-gray-600 pl-4">
                                <div>Volume m<sup>3</sup></div>
                                {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex} className="text-base text-gray-400">
                                        {totalVolumes[condenserIndex] && totalVolumes[condenserIndex][fcuIndex] !== undefined ?
                                            `${totalVolumes[condenserIndex][fcuIndex]} m³` :
                                            ''}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col items-center font-mono gap-2 text-gray-600 pl-4">
                                <div className="w-40 text-center"> Maximum charge limit for room(kg)</div>
                                {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex} className="text-base text-gray-400">
                                        {chargeLimits[condenserIndex] && chargeLimits[condenserIndex][fcuIndex] !== undefined ?
                                            `${chargeLimits[condenserIndex][fcuIndex]} kg` :
                                            'Result'}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center font-mono gap-2 text-gray-600 pl-4">
                                <div> Remarks</div>
                                {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex} className="text-base text-gray-400">{remark[condenserIndex] && remark[condenserIndex][fcuIndex] !== undefined ?
                                        `${remark[condenserIndex][fcuIndex]}` :
                                        ' '}</div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center font-mono gap-2 text-gray-600 pl-4">
                                <div> <Tooltip
                                    title="Additional information"
                                    overlay={
                                        isHovered
                                            ? `Conditions: Space combined with 15mm UC and High Level Transfer Grille.
                                            High Level and Low Level Grille provided in the door towards walkway`
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
                                </Tooltip></div>
                                {/* {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                    <div key={fcuIndex} className="text-base text-gray-400">Result</div>
                                ))} */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RefrigerantForm;
