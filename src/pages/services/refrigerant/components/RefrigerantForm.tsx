import { Input } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface RefrigerantFormProps {
    onAddFcu: (condenserIndex: number) => void;
    onDeleteFcu: (condenserIndex: number, fcuIndex: number) => void;
    fcuList: string[][];
    onAddCondenser: () => void;
    condenserList: string[];
    onDeleteCondenser: (condenserIndex: number) => void;
}

const RefrigerantForm: React.FC<RefrigerantFormProps> = ({ onAddFcu, onDeleteFcu, onDeleteCondenser, fcuList, onAddCondenser, condenserList }) => {
    return (
        <div className="lg:pt-12 sm:pt-6">
            <div className="font-mono text-3xl text-gray-500 text-center">
                Refrigerant Charge Calculation
            </div>
            <div className="px-12 pt-12">
                <button onClick={onAddCondenser} className="text-sm border rounded p-2 bg-gray-500 text-white hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-800">Add Condenser</button>
            </div>
            <div className="flex flex-row gap-2 px-12 pt-6">
                <div className="flex flex-col items-center">
                    {
                        condenserList.map((_condenser, condenserIndex) => (
                            <div className="flex flex-row gap-2 pt-6" key={condenserIndex}>
                                <div className="flex flex-col items-center font-mono text-gray-600">
                                    <div>Condenser {condenserIndex + 1}</div>
                                    <div className="flex flex-row gap-1">
                                        {condenserIndex !== 0 && (
                                            <button onClick={() => onDeleteCondenser(condenserIndex)}>
                                                <DeleteOutlined className="text-red-500 hover:text-red-700" />
                                            </button>
                                        )}
                                        <Input placeholder="Enter condenser name" className="text-center" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 pt-6">
                                    {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
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
                                <div className="flex flex-col items-center font-mono gap-1 text-gray-600 pl-4">
                                    <div> Refrigerant Charge </div>
                                    <div><Input placeholder="Additional Refrigerant"  className="text-center"/> </div>
                                    <div><Input placeholder="Precharged Refrigerant" className="text-center"/> </div>
                                    <div className="text-gray-400"> Result: Result </div>

                                </div>
                                <div className="flex flex-col items-center font-mono gap-1  text-gray-600 pl-4">
                                    <div> Area Servesd(kg) </div>
                                    {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                        <div key={fcuIndex}><Input placeholder="Enter Area Served" className="text-center"/> </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center font-mono gap-1  text-gray-600 pl-4">
                                    <div> Area m<sup>2</sup></div>
                                    {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                        <div key={fcuIndex}><Input placeholder="Enter Area Served" className="text-center"/> </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center font-mono gap-1  text-gray-600 pl-4">
                                    <div> Height</div>
                                    {fcuList[condenserIndex].map((_fcu, fcuIndex) => (
                                        <div key={fcuIndex}><Input placeholder="Enter height" className="text-center" /> </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RefrigerantForm;
