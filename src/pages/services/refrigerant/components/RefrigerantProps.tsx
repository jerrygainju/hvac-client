import { useState } from 'react';
import RefrigerantForm from './RefrigerantForm'; 

const RefrigerantProp = () => {
    const [fcuList, setFcuList] = useState([""]);

    const handleAddFcu = () => {
        setFcuList([...fcuList, ""]);
    };

    const handleDeleteFcu = (indexToDelete: number) => {
        setFcuList(fcuList.filter((_, index) => index !== indexToDelete)); 
    };

    return (
        <RefrigerantForm
            onAddFcu={handleAddFcu} 
            onDeleteFcu={handleDeleteFcu} 
            fcuList={fcuList}
        />
    );
};

export default RefrigerantProp;
