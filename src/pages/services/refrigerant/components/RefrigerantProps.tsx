import { useEffect, useMemo, useState } from 'react';
import RefrigerantForm from './RefrigerantForm'; 
import { RefrigerantType } from './Inputs';

const RefrigerantProp = () => {
    const [fcuList, setFcuList] = useState<string[][]>([[""]]);
    const [condenserList, setCondenserList] = useState<string[]>([""]);
    const [additionalRefrigerantCharges, setAdditionalRefrigerantCharges] = useState<number[]>([0]);
    const [prechargedRefrigerantCharges, setPrechargedRefrigerantCharges] = useState<number[]>([0]);
    const [totalRefrigerantCharges, setTotalRefrigerantCharges] = useState<number[]>([0]);

    const [areas, setAreas] = useState<number[][]>([[0]]); 
    const [heights, setHeights] = useState<number[][]>([[0]]); 
    const [totalVolumes, setTotalVolumes] = useState<number[][]>([[0]]);
    const [selectRefrigerantTypes, setRefrigerantTypes] = useState<string[]>([""]);
    const [chargeLimits, setChargeLimits] = useState<(number)[][]>([[0]]);
    const [remark, setRemark] = useState<(string)[][]>([[""]])
    const [condenserHoverStates, setCondenserHoverStates] = useState<boolean[]>([false]);

const handleMouseOver = (condenserIndex:number) => {
    setCondenserHoverStates(prevStates => {
        const newStates = [...prevStates];
        newStates[condenserIndex] = true;
        return newStates;
    });
};

const handleMouseOut = (condenserIndex: number) => {
    setCondenserHoverStates(prevStates => {
        const newStates = [...prevStates];
        newStates[condenserIndex] = false;
        return newStates;
    });
};


    const handleRefrigerantType = (event: any, condenserIndex: number) => {
        const selectedValue = event.target.value;
        setRefrigerantTypes(prevTypes => {
            const newTypes = [...prevTypes];
            newTypes[condenserIndex] = selectedValue;
            return newTypes;
        });
    };

    const refrigerantOptions = RefrigerantType();
    
    const handleAddCondenser = () => {
        setCondenserList(prevList => [...prevList, ""]);
        setFcuList(prevList => [...prevList, [""]]);
        setAdditionalRefrigerantCharges(prevCharges => [...prevCharges, 0]);
        setPrechargedRefrigerantCharges(prevCharges => [...prevCharges, 0]);
        setTotalRefrigerantCharges(prevCharges => [...prevCharges, 0]);
        setAreas(prevAreas => [...prevAreas, [0]]);
        setHeights(prevHeights => [...prevHeights, [0]]);
        setTotalVolumes(prevVolumes => [...prevVolumes, [0]]);
        setRefrigerantTypes(prevTypes => [...prevTypes, ""]);
        setChargeLimits(prevLimits => [...prevLimits, [0]]); 
        setRemark(prevRemarks => [...prevRemarks, [""]])
        setCondenserHoverStates(prevStates => [...prevStates, false]);
    };
    
    const handleDeleteCondenser = (condenserIndex: number) => {
        setCondenserList(prevList => prevList.filter((_, index) => index !== condenserIndex));
        setFcuList(prevList => prevList.filter((_, index) => index !== condenserIndex));
        setAdditionalRefrigerantCharges(prevCharges => prevCharges.filter((_, index) => index !== condenserIndex));
        setPrechargedRefrigerantCharges(prevCharges => prevCharges.filter((_, index) => index !== condenserIndex));
        setTotalRefrigerantCharges(prevCharges => prevCharges.filter((_, index) => index !== condenserIndex));
        setAreas(prevAreas => prevAreas.filter((_, index) => index !== condenserIndex));
        setHeights(prevHeights => prevHeights.filter((_, index) => index !== condenserIndex));
        setTotalVolumes(prevVolumes => prevVolumes.filter((_, index) => index !== condenserIndex));
        setRefrigerantTypes(prevTypes => prevTypes.filter((_, index) => index !== condenserIndex));
        setChargeLimits(prevLimits => prevLimits.filter((_, index) => index !== condenserIndex)); 
        setRemark(prevRemarks => prevRemarks.filter((_, index) => index !== condenserIndex));
        setCondenserHoverStates(prevHover => prevHover.filter((_, index) => index !== condenserIndex))
    };
    
    const handleAddFcu = (condenserIndex: number) => {
        setFcuList(prevList => {
            const newList = [...prevList];
            newList[condenserIndex] = [...newList[condenserIndex], ""];
            return newList;
        });
        setAreas(prevAreas => {
            const newAreas = [...prevAreas];
            newAreas[condenserIndex] = [...newAreas[condenserIndex], 0];
            return newAreas;
        });
        setHeights(prevHeights => {
            const newHeights = [...prevHeights];
            newHeights[condenserIndex] = [...newHeights[condenserIndex], 0];
            return newHeights;
        });
        setTotalVolumes(prevVolumes => {
            const newVolumes = [...prevVolumes];
            newVolumes[condenserIndex] = [...newVolumes[condenserIndex], 0];
            return newVolumes;
        });
        setChargeLimits(prevLimits => {
            const newLimits = [...prevLimits];
            newLimits[condenserIndex] = [...newLimits[condenserIndex], 0]; 
            return newLimits;
        });
        setRemark(prevRemarks => {
            const newRemarks = [...prevRemarks];
            newRemarks[condenserIndex] = [...newRemarks[condenserIndex], ""];
            return newRemarks;
        })
    };
    
    const handleDeleteFcu = (condenserIndex: number, fcuIndex: number) => {
        setFcuList(prevList => {
            const newList = [...prevList];
            newList[condenserIndex] = prevList[condenserIndex].filter((_, index) => index !== fcuIndex);
            return newList;
        });
        setAreas(prevAreas => {
            const newAreas = [...prevAreas];
            newAreas[condenserIndex] = prevAreas[condenserIndex].filter((_, index) => index !== fcuIndex);
            return newAreas;
        });
        setHeights(prevHeights => {
            const newHeights = [...prevHeights];
            newHeights[condenserIndex] = prevHeights[condenserIndex].filter((_, index) => index !== fcuIndex);
            return newHeights;
        });
        setTotalVolumes(prevVolumes => {
            const newVolumes = [...prevVolumes];
            newVolumes[condenserIndex] = prevVolumes[condenserIndex].filter((_, index) => index !== fcuIndex);
            return newVolumes;
        });
        setChargeLimits(prevLimits => {
            const newLimits = [...prevLimits];
            newLimits[condenserIndex] = prevLimits[condenserIndex].filter((_, index) => index !== fcuIndex);
            return newLimits;
        });
        setRemark(prevRemarks => {
            const newRemarks = [...prevRemarks];
            newRemarks[condenserIndex] = prevRemarks[condenserIndex].filter((_, index) => index !== fcuIndex);
            return newRemarks;
        });
    };

    const handleAdditionalRefrigerantCharge = (condenserIndex: number, value: number) => {
        if (!isNaN(value)) {
            setAdditionalRefrigerantCharges(prevCharges => {
                const newCharges = [...prevCharges];
                newCharges[condenserIndex] = value;
                return newCharges;
            });
        } else {
            setAdditionalRefrigerantCharges(prevCharges => {
                const newCharges = [...prevCharges];
                newCharges[condenserIndex] = 0;
                return newCharges;
            });
        }
    };
    
    const handlePrechargedRefrigerantCharge = (condenserIndex: number, value: number) => {
        if (!isNaN(value)) {
            setPrechargedRefrigerantCharges(prevCharges => {
                const newCharges = [...prevCharges];
                newCharges[condenserIndex] = value;
                return newCharges;
            });
        } else {
            setPrechargedRefrigerantCharges(prevCharges => {
                const newCharges = [...prevCharges];
                newCharges[condenserIndex] = 0;
                return newCharges;
            });
        }
    };
    
    const refrigerantChargeCalculation = () => {    
        const newTotalCharges = additionalRefrigerantCharges.map((additionalCharge, index) => {
            return additionalCharge + prechargedRefrigerantCharges[index];
        });
        setTotalRefrigerantCharges(newTotalCharges);
        return newTotalCharges;
    };

    const handleArea = (condenserIndex: number, fcuIndex: number, value: number) => {
        setAreas(prevAreas => {
            const newAreas = [...prevAreas];
            newAreas[condenserIndex][fcuIndex] = value;
            return newAreas;
        });
    };

    const handleHeight = (condenserIndex: number, fcuIndex: number, value: number) => {
        setHeights(prevHeights => {
            const newHeights = [...prevHeights];
            newHeights[condenserIndex][fcuIndex] = value;
            return newHeights;
        });
    };

    const newTotalVolume = useMemo(() => {
        return areas.map((rowAreas, condenserIndex) => {
            return rowAreas.map((area, fcuIndex) => {
                if (heights[condenserIndex] && heights[condenserIndex][fcuIndex] !== undefined) {
                    const height = heights[condenserIndex][fcuIndex];
                    return area * height;
                } else {
                    return 0;
                }
            });
        });
    }, [areas, heights]);

    const calculateChargeLimit = (condenserIndex: number, fcuIndex: number): number | undefined => {
        const T = parseFloat(selectRefrigerantTypes[condenserIndex]);
        const V = totalVolumes[condenserIndex][fcuIndex];
        const result = isNaN(T) || isNaN(V) ? undefined : T * V;
        return result !== undefined ? parseFloat(result.toFixed(1)) : undefined;
    };

    const calculateRemarks = () => {
        const newRemarks = fcuList.map((condenser, condenserIndex) => {
            return condenser.map((_, fcuIndex) => {
                const chargeLimit = calculateChargeLimit(condenserIndex, fcuIndex);
                if (chargeLimit === undefined) {
                    return 'Result'; 
                } else if (chargeLimit >= totalRefrigerantCharges[condenserIndex]) {
                    return "OK";
                } else {
                    return "NOT OK";
                }
            });
        });
        setRemark(newRemarks);
    };
    

    useEffect(() => {
        refrigerantChargeCalculation();
        setTotalVolumes(newTotalVolume);
        const newChargeLimits = fcuList.map((condenser, condenserIndex) => {
            return condenser.map((_, fcuIndex) => {
                return calculateChargeLimit(condenserIndex, fcuIndex);
            }).filter(limit => limit !== undefined) as number[]; 
        });
        setChargeLimits(newChargeLimits);
        calculateRemarks();
    }, [additionalRefrigerantCharges, prechargedRefrigerantCharges, newTotalVolume, fcuList, selectRefrigerantTypes, totalVolumes]);
    

    return (
        <RefrigerantForm
            onAddFcu={handleAddFcu} 
            onDeleteFcu={handleDeleteFcu} 
            fcuList={fcuList}
            onAddCondenser={handleAddCondenser}
            condenserList={condenserList}
            onDeleteCondenser={handleDeleteCondenser}
            totalRefrigerantCharges={totalRefrigerantCharges}
            handleAdditionalRefrigerantCharge={handleAdditionalRefrigerantCharge}
            handlePrechargedRefrigerantCharge={handlePrechargedRefrigerantCharge}
            totalVolumes={totalVolumes}
            handleArea={handleArea}
            handleHeight={handleHeight}
            refrigerantOptions={refrigerantOptions}
            selectRefrigerantTypes={selectRefrigerantTypes}
            handleRefrigerantType={handleRefrigerantType}
            chargeLimits={chargeLimits} 
            remark={remark}
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
            condenserHoverStates={condenserHoverStates}
        />
    );
};

export default RefrigerantProp;
