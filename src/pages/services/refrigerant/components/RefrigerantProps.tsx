import { useEffect, useState } from 'react';
import RefrigerantForm from './RefrigerantForm'; 
import { RefrigerantType } from './Inputs';


const RefrigerantProp = () => {
    const [fcuList, setFcuList] = useState<string[][]>([[""]]);
    const [condenserList, setCondenserList] = useState<string[]>([""]);
    const [additionalRefrigerantCharge, setAdditionalRefrigerantCharge] = useState<number>(0);
    const [prechargedRefrigerantCharge, setPrechargedRefrigerantCharge] = useState<number>(0);
    const [totalRefrigerantCharge, setTotalRefrigerantCharge] = useState<number>(0);
    const [areas, setAreas] = useState<number[][]>([[0]]); 
    const [heights, setHeights] = useState<number[][]>([[0]]); 
    const [totalVolume, setTotalVolume] = useState<number[][]>([[0]]);
    const [selectRefrigerantType, setRefrigerantType] = useState("");
   
 
    const handleRefrigerantType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setRefrigerantType(selectedValue);;
    };
    const refrigerantOptions = RefrigerantType()
    
    const handleAddCondenser = () => {
        setCondenserList([...condenserList, ""]);
        setFcuList([...fcuList, [""]]);
    };

    const handleAddFcu = (condenserIndex: number) => {
        setFcuList(prevFcuList => {
            const newFcuList = [...prevFcuList];
            newFcuList[condenserIndex] = [...newFcuList[condenserIndex], ""];
            return newFcuList;
        });
    
        setTotalVolume(prevTotalVolume => {
            const newTotalVolume = [...prevTotalVolume];
            newTotalVolume[condenserIndex] = [...newTotalVolume[condenserIndex], 0]; 
            return newTotalVolume;
        });
    };
    
    const handleDeleteFcu = (condenserIndex: number, fcuIndex: number) => {
        setFcuList(prevFcuList => {
            const newFcuList = [...prevFcuList];
            newFcuList[condenserIndex] = newFcuList[condenserIndex].filter((_, i) => i !== fcuIndex);
            return newFcuList;
        });
    
        setTotalVolume(prevTotalVolume => {
            const newTotalVolume = [...prevTotalVolume];
            newTotalVolume[condenserIndex] = newTotalVolume[condenserIndex].filter((_, i) => i !== fcuIndex);
            return newTotalVolume;
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
    
    const handleArea = (condenserIndex: number, fcuIndex: number, value: number) => {
        const newAreas = [...areas];
        newAreas[condenserIndex][fcuIndex] = value;
        setAreas(newAreas);
    };

    const handleHeight = (condenserIndex: number, fcuIndex: number, value: number) => {
        const newHeights = [...heights];
        newHeights[condenserIndex][fcuIndex] = value;
        setHeights(newHeights);
    };


     const calculateTotalVolume = () => {
        const newTotalVolume = areas.map((rowAreas, condenserIndex) => {
            return rowAreas.map((area, fcuIndex) => {
                const height = heights[condenserIndex][fcuIndex];
                return area * height;
            });
        });
        setTotalVolume(newTotalVolume);
        return newTotalVolume
    };

    // const calculateChargeLimit = () => {
    //     const T = parseFloat(selectRefrigerantType);
    //     console.log(T, 't value');
        
    //     const V = calculateTotalVolume(); 
    //     console.log(totalVolume, 'total vol');
        
    //     const chargeLimit = T * V;
    //     console.log(chargeLimit,'charge');
        
    // };


    useEffect(() => {
        refrigerantChargeCalculation();
            calculateTotalVolume();
            // calculateChargeLimit()
    }, [additionalRefrigerantCharge, prechargedRefrigerantCharge, areas, heights]);


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
            handleArea = {handleArea}
            handleHeight = {handleHeight}
            refrigerantOptions = {refrigerantOptions}
            selectRefrigerantType = {selectRefrigerantType}
            handleRefrigerantType = {handleRefrigerantType}
        />
    );
};

export default RefrigerantProp;
