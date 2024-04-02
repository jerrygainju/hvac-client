import { useEffect, useState } from 'react';
import RefrigerantForm from './RefrigerantForm'; 


const RefrigerantProp = () => {
    const [fcuList, setFcuList] = useState<string[][]>([[""]]);
    const [condenserList, setCondenserList] = useState<string[]>([""]);
    const [additionalRefrigerantCharge, setAdditionalRefrigerantCharge] = useState<number>(0);
    const [prechargedRefrigerantCharge, setPrechargedRefrigerantCharge] = useState<number>(0);
    const [totalRefrigerantCharge, setTotalRefrigerantCharge] = useState<number>(0);
    const [inputArea, setAreaInput] = useState<number>(0);
    const [inputHeight, setInputheight] = useState<number>(0);
    const [totalVolume, setTotalVolume] = useState<number>(0);
 
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
        setFcuList(prevFcuList => {
            const newFcuList = prevFcuList.map((fcuRow, index) => {
                if (index === condenserIndex) {
                    return fcuRow.filter((_, i) => i !== fcuIndex);
                }
                return fcuRow;
            });
            return newFcuList;
        });
    };
    
    const handleDeleteCondenser = (condenserIndex: number) => {
        const newCondenserList = [...condenserList];
        newCondenserList.splice(condenserIndex, 1);
        setCondenserList(newCondenserList);

        const newFcuList = [...fcuList];
        newFcuList.splice(condenserIndex, 1);
        setFcuList(newFcuList);
    };
    const refrigerantChargeCalculation = () => {
        
        const totalCharge = additionalRefrigerantCharge + prechargedRefrigerantCharge;
        setTotalRefrigerantCharge(Number(totalCharge.toFixed(2)));
        return Number(totalCharge.toFixed(2));
    };

    const calculateTotalVolume = () => {
        let totalVolume = 0;
        fcuList.forEach(row => {
            row.forEach(() => {
                totalVolume += inputArea * inputHeight;
            });
        });
        console.log(totalVolume, 'check');
        setTotalVolume(Number(totalVolume.toFixed(2)))
        return Number(totalVolume.toFixed(2))
    }
    

    useEffect(() => {
        refrigerantChargeCalculation();
            calculateTotalVolume();
    }, [additionalRefrigerantCharge, prechargedRefrigerantCharge, inputArea, inputHeight]);


    return (
        <RefrigerantForm
            onAddFcu={handleAddFcu} 
            onDeleteFcu={handleDeleteFcu} 
            fcuList={fcuList}
            onAddCondenser={handleAddCondenser}
            condenserList={condenserList}
            onDeleteCondenser={handleDeleteCondenser}
            totalRefrigerantCharge = {totalRefrigerantCharge}
            handleAdditionalRefrigerantCharge = {setAdditionalRefrigerantCharge}
            handlePrechargedRefrigerantCharge = {setPrechargedRefrigerantCharge}
            totalVolume = {totalVolume}
            handleArea = {setAreaInput}
            handleHeight = {setInputheight}
        />
    );
};

export default RefrigerantProp;
