import { useState } from 'react';
import RefrigerantForm from './RefrigerantForm'; 

const RefrigerantProp = () => {
    const [fcuList, setFcuList] = useState<string[][]>([[""]]);
    const [condenserList, setCondenserList] = useState<string[]>([""]);

    const handleAddCondenser = () => {
        setCondenserList([...condenserList, ""]);
        setFcuList([...fcuList, [""]]);
    };

    const handleAddFcu = (condenserIndex: number) => {
        const newFcuList = [...fcuList];
        newFcuList[condenserIndex] = [...newFcuList[condenserIndex], ""];
        setFcuList(newFcuList);
    };

    const handleDeleteFcu = (condenserIndex: number, fcuIndex: number) => { 
        const newFcuList = [...fcuList];
        newFcuList[condenserIndex] = newFcuList[condenserIndex].filter((_, index) => index !== fcuIndex);
        setFcuList(newFcuList);
    };
    const handleDeleteCondenser = (condenserIndex: number) => {
        const newCondenserList = [...condenserList];
        newCondenserList.splice(condenserIndex, 1);
        setCondenserList(newCondenserList);

        const newFcuList = [...fcuList];
        newFcuList.splice(condenserIndex, 1);
        setFcuList(newFcuList);
    };


    return (
        <RefrigerantForm
            onAddFcu={handleAddFcu} 
            onDeleteFcu={handleDeleteFcu} 
            fcuList={fcuList}
            onAddCondenser={handleAddCondenser}
            condenserList={condenserList}
            onDeleteCondenser={handleDeleteCondenser}
        />
    );
};

export default RefrigerantProp;