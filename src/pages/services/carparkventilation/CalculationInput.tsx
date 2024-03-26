import { useEffect, useState } from "react";
import Select from "react-select";

import * as ExcelJS from 'exceljs';
import { generateParkingOptions, generateStaffExposureOptions, generateStaffUsageFactor, generateVehicleTypeFactor, getElementStringValue, getElementValue, percentageOptions } from "./Extra ";

interface RowData {
    interpretation: string;
    variable: string;
    values: {
        [key: string]: number;
    };
}

interface ProjectData {
    projectName: string;
    tableData: RowData[];
}


const CalculationTable = () => {
    const [projectName, setProjectName] = useState('');
    const [savedProjects, setSavedProjects] = useState<ProjectData[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [greatestValueCol1, setGreatestValueCol1] = useState<number | null>(null);
    const [greatestValueCol2, setGreatestValueCol2] = useState<number | null>(null);
    const [greatestValueCol3, setGreatestValueCol3] = useState<number | null>(null);
    const [greatestValueCol4, setGreatestValueCol4] = useState<number | null>(null);
    const [greatestValueCol5, setGreatestValueCol5] = useState<number | null>(null);

    const [combinedGreatestValue, setCombinedGreatestValue] = useState<number | null>(null);

    const [inputFactorFz, setInputFz] = useState('');
    const [inputFactorFa, setInputFa] = useState('');
    const [inputFactorFb, setInputFb] = useState('');
    const [inputFactorFc, setInputFc] = useState('');
    const [inputFactorFd, setInputFd] = useState('');

    const [inputStaffEz, setInputEz] = useState('');
    const [inputStaffEa, setInputEa] = useState('');
    const [inputStaffEb, setInputEb] = useState('');
    const [inputStaffEc, setInputEc] = useState('');
    const [inputStaffEd, setInputEd] = useState('');

    const [inputVTypeTz, setInputTz] = useState('');
    const [inputVTypeTa, setInputTa] = useState('');
    const [inputVTypeTb, setInputTb] = useState('');
    const [inputVTypeTc, setInputTc] = useState('');
    const [inputVTypeTd, setInputTd] = useState('');

    const [inputValuePz, setInputValuePz] = useState('');
    const [inputValuePa, setInputValuePa] = useState('');
    const [inputValuePb, setInputValuePb] = useState('');
    const [inputValuePc, setInputValuePc] = useState('');
    const [inputValuePd, setInputValuePd] = useState('');

    const [percentValue, setpercentValue] = useState('');

    const [calculatedValue, setCalculatedValue] = useState('');
    const [calculatedValueCa, setCalculatedValueCa] = useState('');
    const [calculatedValueCb, setCalculatedValueCb] = useState('');
    const [calculatedValueCc, setCalculatedValueCc] = useState('');
    const [calculatedValueCd, setCalculatedValueCd] = useState('');

    const [calculatedValueAz, setCalculatedValueAz] = useState('');
    const [calculatedValueAa, setCalculatedValueAa] = useState('');
    const [calculatedValueAb, setCalculatedValueAb] = useState('');
    const [calculatedValueAc, setCalculatedValueAc] = useState('');
    const [calculatedValueAd, setCalculatedValueAd] = useState('');

    const [calculatedValueBz, setCalculatedValueBz] = useState('');
    const [calculatedValueBa, setCalculatedValueBa] = useState('');
    const [calculatedValueBb, setCalculatedValueBb] = useState('');
    const [calculatedValueBc, setCalculatedValueBc] = useState('');
    const [calculatedValueBd, setCalculatedValueBd] = useState('');

    const [calculatedValueC1z, setCalculatedValueC1z] = useState('');
    const [calculatedValueC1a, setCalculatedValueC1a] = useState('');
    const [calculatedValueC1b, setCalculatedValueC1b] = useState('');
    const [calculatedValueC1c, setCalculatedValueC1c] = useState('');
    const [calculatedValueC1d, setCalculatedValueC1d] = useState('');

    const [calculateAirSupply, setCalculateTotalAirSupply] = useState<number | null>(null);

    useEffect(() => {
        const savedProjectsFromStorage = localStorage.getItem('savedProjects');
        if (savedProjectsFromStorage) {
            setSavedProjects(JSON.parse(savedProjectsFromStorage));
        }
    }, []);

    const downloadTableData = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My sheet");
        sheet.properties.defaultRowHeight = 20;

        const projectName = [getElementStringValue("pr1"), ' ', ' ', ' ', ' ', ' ', ' '];
        const data = [
            ['Interpretation', 'Variables', getElementStringValue("h1"), getElementStringValue("h2"), getElementStringValue("h3"), getElementStringValue("h4"), getElementStringValue("h5")],
            ["No of parking spaces in the zone of level under consideration", "n1", getElementValue("n1z"), getElementValue("n1a"), getElementValue("n1b"), getElementValue("n1c"), getElementValue("n1d")],
            ["No of parking spaces situated in other parts of the car park, having exit routes passing through the zone or level under consideration", "n2", getElementValue("n2z"), getElementValue("n2a"), getElementValue("n2b"), getElementValue("n2c"), getElementValue("n2d")],
            ["Parking usage factor", "P", parseFloat(inputValuePz), parseFloat(inputValuePa), parseFloat(inputValuePb), parseFloat(inputValuePc), parseFloat(inputValuePd)],
            ["Average driving distance, in meters, within the zone or level under consideration for the exit of a car parked there", "d1", getElementValue("d1z"), getElementValue("d1a"), getElementValue("d1b"), getElementValue("d1c"), getElementValue("d1d")],
            ["The average driving distance, in mtrs, within the zone or level under consideration for the exit of a car whose exit routes passes through the zone or level under consideration", "d2", getElementValue("d2z"), getElementValue("d2a"), getElementValue("d2b"), getElementValue("d2c"), getElementValue("d2d")],
            ["The Staff Exposure Factor", "E", parseFloat(inputStaffEz), parseFloat(inputStaffEa), parseFloat(inputStaffEb), parseFloat(inputStaffEc), parseFloat(inputStaffEd)],
            ["The Vehicle Type Factor", "T", parseFloat(inputVTypeTz), parseFloat(inputVTypeTa), parseFloat(inputVTypeTb), parseFloat(inputVTypeTc), parseFloat(inputVTypeTd)],
            ["The Staff Usage Factor", "F", parseFloat(inputFactorFz), parseFloat(inputFactorFa), parseFloat(inputFactorFb), parseFloat(inputFactorFc), parseFloat(inputFactorFd)],
            ["Area", "A", getElementValue("A1z"), getElementValue("A1a"), getElementValue("A1b"), getElementValue("A1c"), getElementValue("A1d")],
            [],
            ["Unit of Measurement (L/s)"],
            ["C (Contaminant Generation Rate)", , parseInt(calculatedValue), parseInt(calculatedValueCa), parseInt(calculatedValueCb), parseInt(calculatedValueCc), parseInt(calculatedValueCd)],
            ["(a) 0.85 x C x E x T", , parseInt(calculatedValueAz), parseInt(calculatedValueAa), parseInt(calculatedValueAb), parseInt(calculatedValueAc), parseInt(calculatedValueAd)],
            ["(b) 2000 x F x T", , parseInt(calculatedValueBz), parseInt(calculatedValueBa), parseInt(calculatedValueBb), parseInt(calculatedValueBc), parseInt(calculatedValueBd)],
            ["(c) 2.5 x A", , parseInt(calculatedValueC1z), parseInt(calculatedValueC1a), parseInt(calculatedValueC1b), parseInt(calculatedValueC1c), parseInt(calculatedValueC1d)],
            [],
            ["Suggested Value", , greatestValueCol1, greatestValueCol2, greatestValueCol3, greatestValueCol4, greatestValueCol5],
            ["Total Air Exhaust", combinedGreatestValue],
            [],
            ["Air Supply Percentage(%)", (parseFloat(percentValue) * 100)],
            ["Total Air Supply", calculateAirSupply]
        ];

        sheet.columns = projectName.map(header => ({
            header,
            key: header,
            width: 30,
            style: { font: { bold: true } },
        }));
        data.forEach(rowData => {
            sheet.addRow(rowData);
        });

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "car_park.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const parkingOptions = generateParkingOptions();
    const vehicleOptions = generateVehicleTypeFactor();
    const exposureOptions = generateStaffExposureOptions();
    const factorOptions = generateStaffUsageFactor();
    const percentOptions = percentageOptions();


    const calculateValues = (): Record<string, number> => {
        const inputKeys: string[] = ['z', 'a', 'b', 'c', 'd'];
        const stateSetters: Record<string, React.Dispatch<React.SetStateAction<string>>> = {
            'z': setCalculatedValue,
            'a': setCalculatedValueCa,
            'b': setCalculatedValueCb,
            'c': setCalculatedValueCc,
            'd': setCalculatedValueCd,
        };

        const results: number[] = inputKeys.map(suffix => {
            const P = parseFloat((eval(`inputValueP${suffix}`) as string));
            const n1 = getElementValue(`n1${suffix}`);
            const d1 = getElementValue(`d1${suffix}`);
            const n2 = getElementValue(`n2${suffix}`);
            const d2 = getElementValue(`d2${suffix}`);

            const result = P * (100 * n1 + n1 * d1 + n2 * d2);
            const roundedResult = Math.round(result);
            stateSetters[suffix](roundedResult.toString());
            return roundedResult;
        });

        return inputKeys.reduce((acc, suffix, index) => {
            acc[`resultC${suffix}`] = results[index];
            return acc;
        }, {} as Record<string, number>);
    };


    const calculateAValues = () => {
        const { resultCz, resultCa, resultCb, resultCc, resultCd } = calculateValues()

        const Ez = parseFloat(inputStaffEz)
        const Ea = parseFloat(inputStaffEa)
        const Eb = parseFloat(inputStaffEb)
        const Ec = parseFloat(inputStaffEc)
        const Ed = parseFloat(inputStaffEd)

        const Tz = parseFloat(inputVTypeTz)
        const Ta = parseFloat(inputVTypeTa)
        const Tb = parseFloat(inputVTypeTb)
        const Tc = parseFloat(inputVTypeTc)
        const Td = parseFloat(inputVTypeTd)

        const resultA1z = Math.round(0.85 * resultCz * Ez * Tz);
        const resultA1a = Math.round(0.85 * resultCa * Ea * Ta);
        const resultA1b = Math.round(0.85 * resultCb * Eb * Tb);
        const resultA1c = Math.round(0.85 * resultCc * Ec * Tc);
        const resultA1d = Math.round(0.85 * resultCd * Ed * Td);

        setCalculatedValueAz(resultA1z.toString())
        setCalculatedValueAa(resultA1a.toString())
        setCalculatedValueAb(resultA1b.toString())
        setCalculatedValueAc(resultA1c.toString())
        setCalculatedValueAd(resultA1d.toString())

        return { resultA1z, resultA1a, resultA1b, resultA1c, resultA1d }
    }

    const calculateBValues = () => {
        const factorInputs = [inputFactorFz, inputFactorFa, inputFactorFb, inputFactorFc, inputFactorFd];
        const typeInputs = [inputVTypeTz, inputVTypeTa, inputVTypeTb, inputVTypeTc, inputVTypeTd];

        const factorValues = factorInputs.map(input => parseFloat(input));
        const typeValues = typeInputs.map(input => parseFloat(input));

        const calculateResult = (factor: any, type: any) => Math.round(2000 * factor * type);

        const [resutlBz, resutlBa, resutlBb, resutlBc, resutlBd] = factorValues.map((factor, index) =>
            calculateResult(factor, typeValues[index])
        );

        setCalculatedValueBz(resutlBz.toString());
        setCalculatedValueBa(resutlBa.toString());
        setCalculatedValueBb(resutlBb.toString());
        setCalculatedValueBc(resutlBc.toString());
        setCalculatedValueBd(resutlBd.toString());

        return { resutlBz, resutlBa, resutlBb, resutlBc, resutlBd };
    };

    const calculateCValues = () => {
        const Az = getElementValue("A1z")
        const Aa = getElementValue("A1a")
        const Ab = getElementValue("A1b")
        const Ac = getElementValue("A1c")
        const Ad = getElementValue("A1d")

        const resultAz = Math.round(2.5 * Az)
        const resultAa = Math.round(2.5 * Aa)
        const resultAb = Math.round(2.5 * Ab)
        const resultAc = Math.round(2.5 * Ac)
        const resultAd = Math.round(2.5 * Ad)

        setCalculatedValueC1z(resultAz.toString())
        setCalculatedValueC1a(resultAa.toString())
        setCalculatedValueC1b(resultAb.toString())
        setCalculatedValueC1c(resultAc.toString())
        setCalculatedValueC1d(resultAd.toString())

        return { resultAz, resultAa, resultAb, resultAc, resultAd }
    }

    const calculategreatesValue = () => {
        const { resultA1a, resultA1z, resultA1b, resultA1c, resultA1d } = calculateAValues();
        const { resutlBa, resutlBz, resutlBb, resutlBc, resutlBd } = calculateBValues();
        const { resultAa, resultAz, resultAb, resultAc, resultAd } = calculateCValues();
        const col1 = Math.max(resultA1z, resutlBz, resultAz)
        const col2 = Math.max(resultA1a, resutlBa, resultAa);
        const col3 = Math.max(resultA1b, resutlBb, resultAb);
        const col4 = Math.max(resultA1c, resutlBc, resultAc);
        const col5 = Math.max(resultA1d, resutlBd, resultAd);

        setGreatestValueCol1(col1);
        setGreatestValueCol2(col2);
        setGreatestValueCol3(col3);
        setGreatestValueCol4(col4);
        setGreatestValueCol5(col5);

        return { col1, col2, col3, col4, col5 }
    };

    const calculateCombinedGreatestValue = () => {
        const { col1, col2, col3, col4, col5 } = calculategreatesValue();
        const columnsToSum = [col1, col2, col3, col4, col5];
        const validColumns = columnsToSum.filter(column => column || column === 0);
        const greatestValueSum = validColumns.reduce((sum, column) => sum + parseFloat(column.toString()));
        setCombinedGreatestValue(greatestValueSum);
        return { greatestValueSum, validColumns };
    };

    const calculateTotalAirSupply = () => {
        const { greatestValueSum } = calculateCombinedGreatestValue();
        const Ex = parseFloat(percentValue);
        const totalAirSupply = Math.round(Ex * greatestValueSum);
        setCalculateTotalAirSupply(totalAirSupply);
    };

    const handleSave = () => {
        const tableData: RowData[] = [
            {
                interpretation: "No of parking spaces in the zone of level under consideration",
                variable: "n1",
                values: {
                    "z": getElementValue("n1z"),
                    "a": getElementValue("n1a"),
                    "b": getElementValue("n1b"),
                    "c": getElementValue("n1c"),
                    "d": getElementValue("n1d"),
                }
            },
            {
                interpretation: "No of parking spaces situated in other parts of the car park",
                variable: "n2",
                values: {
                    "z": getElementValue("n2z"),
                    "a": getElementValue("n2a"),
                    "b": getElementValue("n2b"),
                    "c": getElementValue("n2c"),
                    "d": getElementValue("n2d"),
                }
            },
        ];

        const projectData: ProjectData = {
            projectName: projectName,
            tableData: tableData
        };

        const savedProjectsFromStorage = localStorage.getItem('savedProjects');
        const existingSavedProjects = savedProjectsFromStorage ? JSON.parse(savedProjectsFromStorage) : [];

        const updatedSavedProjects = [...existingSavedProjects, projectData];

        setSavedProjects(updatedSavedProjects);
        localStorage.setItem('savedProjects', JSON.stringify(updatedSavedProjects));
    };



    const handleDeleteProject = (index: any) => {
        const updatedSavedProjects = [...savedProjects];
        updatedSavedProjects.splice(index, 1);
        setSavedProjects(updatedSavedProjects);
        localStorage.setItem('savedProjects', JSON.stringify(updatedSavedProjects));
    };
    const handleEditProject = (index: any, newName: any) => {
        const updatedSavedProjects = [...savedProjects];
        updatedSavedProjects[index].projectName = newName;
        setSavedProjects(updatedSavedProjects);
        localStorage.setItem('savedProjects', JSON.stringify(updatedSavedProjects));
    };

    const maxC1z = Math.max(parseInt(calculatedValueAz), parseInt(calculatedValueBz), parseInt(calculatedValueC1z));
    const maxC2z = Math.max(parseInt(calculatedValueAa), parseInt(calculatedValueBa), parseInt(calculatedValueC1a));
    const maxC3z = Math.max(parseInt(calculatedValueAb), parseInt(calculatedValueBb), parseInt(calculatedValueC1b));
    const maxC4z = Math.max(parseInt(calculatedValueAc), parseInt(calculatedValueBc), parseInt(calculatedValueC1c));
    const maxC5z = Math.max(parseInt(calculatedValueAd), parseInt(calculatedValueBd), parseInt(calculatedValueC1d));

    return (
        <div>
            <div className="text-lg font-bold text-center pt-6 font-mono">
                Car Park Ventilation Calculation
            </div>
            <div className="text-sm font-bold text-center ">
                Based On AS 1668.2 - 2012
            </div>
            <div className="pl-16">
                <input
                    type='text'
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder='Enter project name'
                    className="border rounded h-10 text-center border-gray-400 w-72"
                />
            </div>
            <div className="content-center">
                <table className="border border-collapse mt-4 text-sm w-11/12 mx-auto ">
                    <tr>
                        <th className="border py-3">
                            Interpretation
                        </th>
                        <th className="border px-8">
                            Variable
                        </th>
                        <th className="border px-4">
                            <input
                                type="text"
                                id="h1"
                                placeholder="Enter Basement"
                                className="w-32 py-2 "
                            />
                        </th>
                        <th className="border px-4">
                            <input
                                type="text"
                                id="h2"
                                placeholder="Enter Basement"
                                className="w-32 py-2 "
                            />
                        </th>
                        <th className="border px-4">
                            <input
                                type="text"
                                id="h3"
                                placeholder="Enter Basement"
                                className="w-32 py-2 "
                            />
                        </th>
                        <th className="border px-4">
                            <input
                                type="text"
                                id="h4"
                                placeholder="Enter Basement"
                                className="w-32 py-2 "
                            />
                        </th>
                        <th className="border px-4">
                            <input
                                type="text"
                                id="h5"
                                placeholder="Enter Basement"
                                className="w-32 py-2 "
                            />
                        </th>
                        <th className="border px-4">
                            Action
                        </th>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            No of parking spaces in the zone of level under consideration
                        </td>
                        <td className="border pl-16">
                            n1
                        </td>
                        <td className="border ">
                            <input
                                type="number"
                                id="n1z"
                                placeholder="Enter value n1(z)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n1a"
                                placeholder="Enter value n1(a)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n1b"
                                placeholder="Enter value n1(b)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n1c"
                                placeholder="Enter value n1(c)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n1d"
                                placeholder="Enter value n1(d)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            No of parking spaces situated in other parts of the car park,
                            having exit routes passing through the zone or level under consideration
                        </td>
                        <td className="border pl-16">
                            n2
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n2z"
                                placeholder="Enter value n2(z)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n2a"
                                placeholder="Enter value n2(a)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n2b"
                                placeholder="Enter value n2(b)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n2c"
                                placeholder="Enter value n2(c)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="n2d"
                                placeholder="Enter value n2(d)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            Parking usage factor (Table A)
                        </td>
                        <td className="border pl-16">
                            p
                        </td>
                        <td className="border">
                            <Select
                                options={parkingOptions}
                                placeholder="Enter value p(z)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 260 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center',
                                    }),
                                }}
                                value={parkingOptions.find(option => option.value === inputValuePz)}
                                onChange={(selectedOption) => setInputValuePz(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={parkingOptions}
                                placeholder="Enter value p(a)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                    }),
                                }}
                                value={parkingOptions.find(option => option.value === inputValuePa)}
                                onChange={(selectedOption) => setInputValuePa(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={parkingOptions}
                                placeholder="Enter value p(b)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                    }),
                                }}
                                value={parkingOptions.find(option => option.value === inputValuePb)}
                                onChange={(selectedOption) => setInputValuePb(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={parkingOptions}
                                placeholder="Enter value p(c)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                    }),
                                }}
                                value={parkingOptions.find(option => option.value === inputValuePc)}
                                onChange={(selectedOption) => setInputValuePc(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={parkingOptions}
                                placeholder="Enter value p(d)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                    }),
                                }}
                                value={parkingOptions.find(option => option.value === inputValuePd)}
                                onChange={(selectedOption) => setInputValuePd(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            Average driving distance, in meters, within the zone or level under consideration
                            for the exit of a car parked there
                        </td>
                        <td className="border pl-16">
                            d1
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d1z"
                                placeholder="Enter value d1(z)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d1a"
                                placeholder="Enter value d1(a)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d1b"
                                placeholder="Enter value d1(b)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d1c"
                                placeholder="Enter value d1(c)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d1d"
                                placeholder="Enter value d1(d)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            The average driving distance, in mtrs, within the zone or level under consideration
                            for the exit of a car whose exit routes passes through the zone or level under consideration
                        </td>
                        <td className="border pl-16">
                            d2
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d2z"
                                placeholder="Enter value d2(z)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d2a"
                                placeholder="Enter value d2(a)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d2b"
                                placeholder="Enter value d2(b)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d2c"
                                placeholder="Enter value d2(c)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="d2d"
                                placeholder="Enter value d2(d)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            The Staff Exposure Factor (Table C)
                        </td>
                        <td className="border pl-16">
                            E
                        </td>
                        <td className="border">
                            <Select
                                options={exposureOptions}
                                placeholder="Enter value E(z)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={exposureOptions.find(option => option.value === inputStaffEz)}
                                onChange={(selectedOption) => setInputEz(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={exposureOptions}
                                placeholder="Enter value E(a)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={exposureOptions.find(option => option.value === inputStaffEa)}
                                onChange={(selectedOption) => setInputEa(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={exposureOptions}
                                placeholder="Enter value E(b)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={exposureOptions.find(option => option.value === inputStaffEb)}
                                onChange={(selectedOption) => setInputEb(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={exposureOptions}
                                placeholder="Enter value E(c)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={exposureOptions.find(option => option.value === inputStaffEc)}
                                onChange={(selectedOption) => setInputEc(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={exposureOptions}
                                placeholder="Enter value E(d)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={exposureOptions.find(option => option.value === inputStaffEd)}
                                onChange={(selectedOption) => setInputEd(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            The Vehicle Type Factor (Table B)
                        </td>
                        <td className="border pl-16">
                            T
                        </td>
                        <td className="border">
                            <Select
                                options={vehicleOptions}
                                placeholder="Enter value T(z)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={vehicleOptions.find(option => option.value === inputVTypeTz)}
                                onChange={(selectedOption) => setInputTz(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={vehicleOptions}
                                placeholder="Enter value T(a)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={vehicleOptions.find(option => option.value === inputVTypeTa)}
                                onChange={(selectedOption) => setInputTa(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={vehicleOptions}
                                placeholder="Enter value T(b)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={vehicleOptions.find(option => option.value === inputVTypeTb)}
                                onChange={(selectedOption) => setInputTb(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={vehicleOptions}
                                placeholder="Enter value T(c)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={vehicleOptions.find(option => option.value === inputVTypeTc)}
                                onChange={(selectedOption) => setInputTc(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={vehicleOptions}
                                placeholder="Enter value T(d)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={vehicleOptions.find(option => option.value === inputVTypeTd)}
                                onChange={(selectedOption) => setInputTd(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            The Staff Usage Factor (Table C)
                        </td>
                        <td className="border pl-16">
                            F
                        </td>
                        <td className="border">
                            <Select
                                options={factorOptions}
                                placeholder="Enter value F(z)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={factorOptions.find(option => option.label === inputFactorFz)}
                                onChange={(selectedOption) => setInputFz(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={factorOptions}
                                placeholder="Enter value F(a)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={factorOptions.find(option => option.label === inputFactorFa)}
                                onChange={(selectedOption) => setInputFa(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={factorOptions}
                                placeholder="Enter value F(b)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={factorOptions.find(option => option.label === inputFactorFb)}
                                onChange={(selectedOption) => setInputFb(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={factorOptions}
                                placeholder="Enter value F(c)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={factorOptions.find(option => option.label === inputFactorFc)}
                                onChange={(selectedOption) => setInputFc(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                        <td className="border">
                            <Select
                                options={factorOptions}
                                placeholder="Enter value F(d)"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: ' rgb(248 250 252 / var(--tw-bg-opacity))',
                                        borderColor: 'transparent',
                                        alignContent: 'center'
                                    }),
                                }}
                                value={factorOptions.find(option => option.label === inputFactorFd)}
                                onChange={(selectedOption) => setInputFd(selectedOption ? selectedOption.value : '')}
                                formatOptionLabel={(option, { context }) => (
                                    <div>
                                        {context === 'menu' ? option.label : option.value}
                                    </div>
                                )}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">
                            Area
                        </td>
                        <td className="border pl-16">
                            A
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="A1z"
                                placeholder="Enter value A(z)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="A1a"
                                placeholder="Enter value A(a)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="A1b"
                                placeholder="Enter value A(b)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="A1c"
                                placeholder="Enter value A(c)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                        <td className="border">
                            <input
                                type="number"
                                id="A1d"
                                placeholder="Enter value A(d)"
                                className="w-full py-2 pl-6 "
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="border p-2">C (Contaminant Generation Rate)</td>
                        <td className="border pl-2">
                            P × (100 × n1 + n1 × d1 + n2 × d2)
                        </td>
                        <td className="border pl-16 text-gray-600"> {isNaN(parseInt(calculatedValue)) ? "Result" : `${parseInt(calculatedValue)} L/s`}</td>
                        <td className="border pl-16 text-gray-600">{isNaN(parseInt(calculatedValueCa)) ? "Result" : `${parseInt(calculatedValueCa)} L/s`}</td>
                        <td className="border pl-16 text-gray-600">{isNaN(parseInt(calculatedValueCb)) ? "Result" : `${parseInt(calculatedValueCb)} L/s`}</td>
                        <td className="border pl-16 text-gray-600">{isNaN(parseInt(calculatedValueCc)) ? "Result" : `${parseInt(calculatedValueCc)} L/s`}</td>
                        <td className="border pl-16 text-gray-600">{isNaN(parseInt(calculatedValueCd)) ? "Result" : `${parseInt(calculatedValueCd)} L/s`}</td>
                        <td className="border"><button onClick={calculateValues} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Calculate</button></td>
                    </tr>
                    <tr>
                        <td className=" border border-r-0 p-2">(a) 0.85 x C x E x T</td>
                        <td className="border border-l-0 pl-2">
                        </td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueAz) === maxC1z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueAz)) ? "Result" : `${parseInt(calculatedValueAz)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueAa) === maxC2z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueAa)) ? "Result" : `${parseInt(calculatedValueAa)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueAb) === maxC3z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueAb)) ? "Result" : `${parseInt(calculatedValueAb)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueAc) === maxC4z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueAc)) ? "Result" : `${parseInt(calculatedValueAc)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueAd) === maxC5z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueAd)) ? "Result" : `${parseInt(calculatedValueAd)} L/s`}</td>
                        <td className="border"><button onClick={calculateAValues} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Calculate</button></td>
                    </tr>
                    <tr>
                        <td className="border border-r-0 p-2">(b) 2000 x F x T</td>
                        <td className="border border-l-0 pl-2">
                        </td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueBz) === maxC1z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueBz)) ? "Result" : `${parseInt(calculatedValueBz)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueBa) === maxC2z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueBa)) ? "Result" : `${parseInt(calculatedValueBa)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueBb) === maxC3z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueBb)) ? "Result" : `${parseInt(calculatedValueBb)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueBc) === maxC4z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueBc)) ? "Result" : `${parseInt(calculatedValueBc)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueBd) === maxC5z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueBd)) ? "Result" : `${parseInt(calculatedValueBd)} L/s`}</td>
                        <td className="border"><button onClick={calculateBValues} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Calculate</button></td>
                    </tr>
                    <tr>
                        <td className="border border-r-0 p-2">(c) 2.5 x A</td>
                        <td className="pl-2">
                        </td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueC1z) === maxC1z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueC1z)) ? "Result" : `${parseInt(calculatedValueC1z)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueC1a) === maxC2z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueC1a)) ? "Result" : `${parseInt(calculatedValueC1a)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueC1b) === maxC3z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueC1b)) ? "Result" : `${parseInt(calculatedValueC1b)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueC1c) === maxC4z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueC1c)) ? "Result" : `${parseInt(calculatedValueC1c)} L/s`}</td>
                        <td className={`border pl-16 text-gray-600 ${parseInt(calculatedValueC1d) === maxC5z ? 'bg-green-200' : ''}`}>{isNaN(parseInt(calculatedValueC1d)) ? "Result" : `${parseInt(calculatedValueC1d)} L/s`}</td>
                        <td className="border"><button onClick={calculateCValues} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Calculate</button></td>
                    </tr>
                </table>
            </div >
            <div className="flex gap-24 pb-12 pl-16">
                <div className="pt-10">
                    <button onClick={calculategreatesValue} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Click to Show Greatest Value</button>
                    <p className="pt-2">
                        Design should be based on{' '}
                        {greatestValueCol1 === null || isNaN(greatestValueCol1)
                            ? 'Result'
                            : `${greatestValueCol1} L/s for column 1`}
                    </p>
                    <p className="pt-2">
                        Design should be based on{' '}
                        {greatestValueCol2 === null || isNaN(greatestValueCol2)
                            ? 'Result'
                            : `${greatestValueCol2} L/s for column 2`}
                    </p>
                    <p className="pt-2">
                        Design should be based on{' '}
                        {greatestValueCol3 === null || isNaN(greatestValueCol3)
                            ? 'Result'
                            : `${greatestValueCol3} L/s for column 3`}
                    </p>
                    <p className="pt-2">
                        Design should be based on{' '}
                        {greatestValueCol4 === null || isNaN(greatestValueCol4)
                            ? 'Result'
                            : `${greatestValueCol4} L/s for column 4`}
                    </p>
                    <p className="pt-2">
                        Design should be based on{' '}
                        {greatestValueCol5 === null || isNaN(greatestValueCol5)
                            ? 'Result'
                            : `${greatestValueCol5} L/s for column 5`}
                    </p>
                </div>
                <div className="pt-10">
                    <button onClick={calculateCombinedGreatestValue} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Calculate Total Air Exhaust</button>
                    <p className="pt-4">Total Air Exhaust : {combinedGreatestValue === null || isNaN(combinedGreatestValue) ? "Result" : `${combinedGreatestValue} L/s`}</p>
                </div>
                <div className="pt-10">
                    <button onClick={calculateTotalAirSupply} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Calculate Total Air Supply </button>
                    <div className="pt-4">
                        <Select
                            options={percentOptions}
                            placeholder="Enter the percentage"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: ' rgb(248 250 260 / var(--tw-bg-opacity))',
                                    alignContent: 'center',
                                }),
                            }}
                            value={percentOptions.find(option => option.label === percentValue)}
                            onChange={(selectedOption) => setpercentValue(selectedOption ? selectedOption.value : '')}
                            formatOptionLabel={(option, { context }) => (
                                <div>
                                    {context === 'menu' ? option.label : option.label}
                                </div>
                            )}
                        />
                    </div>
                    <p className="pt-4">
                        Total Air Supply : {calculateAirSupply === null || isNaN(calculateAirSupply) ? 'Result' : `${calculateAirSupply} L/s`}
                    </p>
                </div>
                <div className="pt-10">
                    <button onClick={downloadTableData} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue">Download Excel File </button>
                </div>
                <div className="pt-10">
                    <button onClick={handleSave} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue">
                        Save Project
                    </button>
                </div>
            </div>
            <div>
                <h2 className="pt-4 pl-20 text-xl font-mono">Projects List</h2>
                <ul>
                    {savedProjects.map((project, index) => (
                        <li key={index}>
                            <button onClick={() => setSelectedProject(project)}>
                                <div className="pl-20 font-mono">
                                    {index + 1} {project.projectName}
                                </div>
                            </button>
                            <button className="pl-10" onClick={() => handleDeleteProject(index)}>Delete</button>
                            <button onClick={() => handleEditProject(index, " ")}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedProject && (
                <div>
                    <p className="pl-20">Project Name: {selectedProject.projectName}</p>
                    <table className="border border-gray-400  mt-4 text-sm w-7/12 mx-auto">
                        <tbody>
                            {selectedProject.tableData.map((rowData, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{rowData.interpretation}</td>
                                    <td>{rowData.variable}</td>
                                    {Object.keys(rowData.values).map((key, columnIndex) => (
                                        <td key={columnIndex}>{rowData.values[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            )}
        </div >
    )
}

export default CalculationTable