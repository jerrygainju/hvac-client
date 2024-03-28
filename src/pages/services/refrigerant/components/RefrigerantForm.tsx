import { Input } from "antd";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface RefrigerantFormProps {
    onAddFcu: () => void;
    onDeleteFcu: (index: number) => void;
    fcuList: string[];
}

const RefrigerantForm: React.FC<RefrigerantFormProps> = ({ onAddFcu, onDeleteFcu, fcuList }) => {
    return (
        <div className="lg:pt-12 sm:pt-6 px-4">
            <div className="font-mono text-3xl text-gray-500 text-center">
                Refrigerant Charge Calculation
            </div>
            <div className="px-6 pt-12">
                <button className="text-sm border rounded p-2 bg-gray-500 text-white hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-800">Add Condenser</button>
            </div>
            <div className="flex flex-row gap-2 px-4 pt-6">
                <div className="flex flex-col items-center font-mono text-gray-600">
                    Condenser
                    <Input placeholder="Enter condenser name" />
                </div>
                <div className="flex flex-col pt-6 gap-1">
                    {fcuList.map((_fcu, index) => (
                        <div key={index} className="flex flex-row gap-1 items-center">
                            <Input placeholder={`Enter FCU ${index + 1}`} className="w-48"/>
                            {index !== 0 && ( 
                                <button onClick={() => onDeleteFcu(index)}><DeleteOutlined className="text-red-500 hover:text-red-700"/></button>
                            )}
                            <button onClick={onAddFcu}><PlusOutlined  className="text-blue-500 hover:text-blue-700"/> </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RefrigerantForm;
