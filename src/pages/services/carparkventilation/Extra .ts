export const getElementValue = (elementId: string): number => {
    const element = document.getElementById(elementId) as HTMLInputElement | null;
    return element ? parseFloat(element.value) : 0;
};

export const getElementStringValue = (elementId: string): string => {
    const element = document.getElementById(elementId) as HTMLInputElement | null;
    return element ? element.value : '';
};

export const percentageOptions = () => {
    const options = [];
    for (let i = 75; i <= 90; i++) {
        const percentage = i / 100;
        options.push({ value: percentage.toString(), label: `${i}%` });
    }
    return options;
};

export const generateParkingOptions = () => {
    return [
        { value: '0.3', label: 'Residental' },
        { value: '0.5', label: 'Commercial' },
        { value: '0.7', label: 'Retail/food and drink services' },
        { value: '1', label: 'Entertainment/sports cnetres' },
        { value: '2.4', label: 'vehicle depots (see Note)' },
    ];
};

export const generateStaffExposureOptions = () => {
    return [
        { value: '1', label: 'Staff in seperate enclosure' },
        { value: '1.8', label: 'Staff in car park enclosure' }
    ]
}

export const generateVehicleTypeFactor = () => {
    return [
        { value: '1', label: 'No special vehicle population' },
        { value: '2.4', label: 'Diesel vehicles' },
        { value: '1', label: 'LPG vehicles' },
        { value: '1', label: 'CNG vehicles' },
        { value: '0.1', label: 'Electric powered vehicles' },
        { value: '0.25', label: 'Motorcycles' },
    ]
}

export const generateStaffUsageFactor = () => {
    return [
        { value: '1', label: 'Staff in seperate enclosure' },
        { value: '2', label: 'Staff in car park enclosure' }
    ]
}
