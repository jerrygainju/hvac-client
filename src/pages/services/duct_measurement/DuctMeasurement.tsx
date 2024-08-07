import { Button, Input, Select, Table } from "antd";
import NewFooter from "../../homepage/footer/Footer";
import Navigation from "../../homepage/navigation/navigation";
import { ductDescription, insulationTypes } from "./components/ductPieces";
import { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import * as ExcelJS from "exceljs";
import { getElementStringValue } from "../carparkventilation/components/Extra ";

type RowData = {
  key: number;
  sn: number;
  description: string;
  insulation: string;
  width1: number;
  width3: number;
  height1: number;
  height3: number;
  length1: number;
  length2: number;
  length3: number;
  radius: number;
  width2: number;
  height2: number;
  duct_pieces: number;
  perimeter: number;
  area: number;
};

type LevelData = {
  key: number;
  title: string;
  rows: RowData[];
};

type EditableState = {
  [rowKey: number]: {
    width1: boolean;
    width3: boolean;
    height1: boolean;
    height3: boolean;
    length1: boolean;
    length2: boolean;
    length3: boolean;
    radius: boolean;
    width2: boolean;
    height2: boolean;
    duct_pieces: boolean;
  };
};

const DuctMeasurement = () => {
  const [levels, setLevels] = useState<LevelData[]>([]);
  const [editable, setEditable] = useState<EditableState>({});

  useEffect(() => {
    const initialLevel: LevelData = {
      key: 0,
      title: "Level 1",
      rows: [
        {
          key: 0,
          sn: 1,
          description: "Select the duct type",
          insulation: "Select the insulation type",
          width1: 0,
          width3: 0,
          height1: 0,
          height3: 0,
          length1: 0,
          length2: 0,
          length3: 0,
          radius: 0,
          width2: 0,
          height2: 0,
          duct_pieces: 0,
          perimeter: 0,
          area: 0,
        },
      ],
    };
    setLevels([initialLevel]);
    setEditable({
      0: {
        width1: false,
        width3: false,
        height1: false,
        height3: false,
        length1: false,
        length2: false,
        length3: false,
        radius: false,
        height2: false,
        width2: false,
        duct_pieces: false,
      },
    });
  }, []);

  const handleAddLevel = () => {
    setLevels([
      ...levels,
      {
        key: levels.length,
        title: `Level ${levels.length + 1}`,
        rows: [
          {
            key: 0,
            sn: 1,
            description: "Select the duct type",
            insulation: "Select the insulation type",
            width1: 0,
            width3: 0,
            height1: 0,
            height3: 0,
            length1: 0,
            length2: 0,
            length3: 0,
            radius: 0,
            width2: 0,
            height2: 0,
            duct_pieces: 0,
            perimeter: 0,
            area: 0,
          },
        ],
      },
    ]);
  };

  const handleAddRow = (levelKey: number) => {
    setLevels(
      levels.map((lvl) =>
        lvl.key === levelKey
          ? {
              ...lvl,
              rows: [
                ...lvl.rows,
                {
                  key: lvl.rows.length,
                  sn: lvl.rows.length + 1,
                  description: "Select the duct type",
                  insulation: "Select the insulation type",
                  width1: 0,
                  width3: 0,
                  height1: 0,
                  height3: 0,
                  length1: 0,
                  length2: 0,
                  length3: 0,
                  radius: 0,
                  width2: 0,
                  height2: 0,
                  duct_pieces: 0,
                  perimeter: 0,
                  area: 0,
                },
              ],
            }
          : lvl
      )
    );
  };

  const handleDeleteLevel = (levelKey: number) => {
    setLevels(levels.filter((level) => level.key !== levelKey));
  };
  const handleDescriptionChange = (
    levelKey: number,
    rowKey: number,
    value: string
  ) => {
    setLevels(
      levels.map((lvl) =>
        lvl.key === levelKey
          ? {
              ...lvl,
              rows: lvl.rows.map((row) =>
                row.key === rowKey
                  ? {
                      ...row,
                      description: value,
                    }
                  : row
              ),
            }
          : lvl
      )
    );
    updateEditableState(levelKey, rowKey, value);
  };

  const handleInsulationChange = (
    levelKey: number,
    rowKey: number,
    value: string
  ) => {
    setLevels(
      levels.map((lvl) =>
        lvl.key === levelKey
          ? {
              ...lvl,
              rows: lvl.rows.map((row) =>
                row.key === rowKey
                  ? {
                      ...row,
                      insulation: value,
                    }
                  : row
              ),
            }
          : lvl
      )
    );
  };

  const updateEditableState = (
    _levelKey: number,
    rowKey: number,
    description: string
  ) => {
    const newEditable: EditableState = { ...editable };
    switch (description) {
      case "Straight duct":
        newEditable[rowKey] = {
          width1: true,
          width3: false,
          height1: true,
          height3: false,
          length1: true,
          length2: false,
          length3: false,
          radius: false,
          width2: false,
          height2: false,
          duct_pieces: true,
        };
        break;
      case "Radius bend":
        newEditable[rowKey] = {
          width1: true,
          width3: false,
          height1: true,
          height3: false,
          length1: false,
          length2: false,
          length3: false,
          radius: true,
          width2: false,
          height2: false,
          duct_pieces: true,
        };
        break;
      case "Reducer":
        newEditable[rowKey] = {
          width1: true,
          width3: false,
          height1: true,
          height3: false,
          length1: true,
          length2: false,
          length3: false,
          radius: false,
          width2: true,
          height2: true,
          duct_pieces: true,
        };
        break;
      case "Mitered bend":
        newEditable[rowKey] = {
          width1: true,
          width3: false,
          height1: true,
          height3: false,
          length1: true,
          length2: true,
          length3: false,
          radius: false,
          width2: true,
          height2: true,
          duct_pieces: true,
        };
        break;
      case "End cap":
        newEditable[rowKey] = {
          width1: true,
          width3: false,
          height1: true,
          height3: false,
          length1: false,
          length2: false,
          length3: false,
          radius: false,
          height2: false,
          width2: false,
          duct_pieces: true,
        };
        break;
      case "Transition":
        newEditable[rowKey] = {
          width1: true,
          width2: false,
          width3: false,
          height1: true,
          height2: false,
          height3: false,
          radius: true,
          length1: true,
          length2: false,
          length3: false,
          duct_pieces: true,
        };
        break;
      case "Equal tee":
        newEditable[rowKey] = {
          width1: true,
          width2: true,
          width3: true,
          height1: true,
          height2: true,
          height3: true,
          radius: false,
          length1: true,
          length2: true,
          length3: true,
          duct_pieces: true,
        };
        break;
      case "Offset":
        newEditable[rowKey] = {
          width1: true,
          width2: false,
          width3: false,
          height1: true,
          height2: false,
          height3: false,
          radius: false,
          length1: true,
          length2: true,
          length3: false,
          duct_pieces: true,
        };
        break;
      default:
        newEditable[rowKey] = {
          width1: false,
          width3: false,
          height1: false,
          height3: false,
          length1: false,
          length2: false,
          length3: false,
          radius: false,
          width2: false,
          height2: false,
          duct_pieces: false,
        };
    }
    setEditable(newEditable);
  };

  const handleInputChange = (
    levelKey: number,
    rowKey: number,
    field: keyof RowData,
    value: number
  ) => {
    setLevels((prevLevels) =>
      prevLevels.map((lvl) =>
        lvl.key === levelKey
          ? {
              ...lvl,
              rows: lvl.rows.map((row) => {
                if (row.key !== rowKey) return row;

                const updatedRow = { ...row, [field]: value };

                // Convert dimensions to meters
                const widthInMeters = updatedRow.width1 / 1000 || 0;
                const heightInMeters = updatedRow.height1 / 1000 || 0;
                const lengthInMeters = updatedRow.length1 || 0;
                const radiusInMeters = updatedRow.radius / 1000 || 0;
                const width2InMeters = updatedRow.width2 / 1000 || 0;
                const height2InMeters = updatedRow.height2 / 1000 || 0;
                const width3InMeters = updatedRow.width3 / 1000 || 0;
                const height3InMeters = updatedRow.height3 / 1000 || 0;
                const length2InMeters = updatedRow.length2 || 0;
                const length3InMeters = updatedRow.length3 || 0;
                const ductPieces = updatedRow.duct_pieces || 0;

                // Recalculate area based on duct type
                switch (updatedRow.description) {
                  case "Straight duct":
                    updatedRow.area =
                      2 *
                      (widthInMeters + heightInMeters) *
                      lengthInMeters *
                      ductPieces;
                    break;
                  case "Reducer":
                    updatedRow.area =
                      (widthInMeters +
                        heightInMeters +
                        width2InMeters +
                        height2InMeters) *
                      lengthInMeters *
                      ductPieces;
                    break;
                  case "End cap":
                    updatedRow.area =
                      widthInMeters * heightInMeters * ductPieces;
                    break;
                  case "Radius bend":
                    updatedRow.area =
                      (widthInMeters + heightInMeters) *
                      2 *
                      ((2 * Math.PI * (radiusInMeters + widthInMeters / 2)) /
                        4) *
                      ductPieces;
                    break;
                  case "Mitered bend":
                    updatedRow.area =
                      (2 * (widthInMeters + heightInMeters) * lengthInMeters +
                        2 *
                          (width2InMeters + height2InMeters) *
                          length2InMeters) *
                      ductPieces;
                    break;
                  case "Transition":
                    updatedRow.area =
                      (widthInMeters +
                        heightInMeters +
                        Math.PI * radiusInMeters) *
                      lengthInMeters *
                      ductPieces;
                    break;
                  case "Equal tee":
                    updatedRow.area =
                      (2 * (widthInMeters + heightInMeters) * lengthInMeters +
                        2 *
                          (width2InMeters + height2InMeters) *
                          length2InMeters +
                        2 *
                          (width3InMeters + height3InMeters) *
                          length3InMeters) *
                      ductPieces;
                    break;
                  case "Offset":
                    updatedRow.area =
                      2 *
                      (widthInMeters + heightInMeters) *
                      (lengthInMeters + length2InMeters) *
                      ductPieces;
                    break;
                  default:
                    updatedRow.area = 0;
                }

                return updatedRow;
              }),
            }
          : lvl
      )
    );
  };

  const downloadTableData = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Duct Area Measurement");

    const projectName =
      getElementStringValue("projectName") || "Untitled Project";

    // Center the project title
    const projectRow = sheet.addRow([`Project: ${projectName}`]);
    // projectRow.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "A9A9A9" },
    // };
    projectRow.font = { bold: true };
    sheet.mergeCells(`A1:O3`);
    projectRow.alignment = { horizontal: "center", vertical: "middle" };

    sheet.addRow([]);
    sheet.addRow([]);

    // Define main headers
    const headers = [
      "S.N",
      "Description",
      "Insulation Type",
      "Duct Size",
      "",
      "",
      "Reducer Duct Size",
      "",
      "",
      "",
      "Length1(m)",
      "Length2(m)",
      "Length3(m)",
      "Duct Pieces",
      "Area(m²)",
    ];

    // Merge cells for main headers
    const headerRow = sheet.addRow(headers);
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    headerRow.font = { bold: true };
    sheet.mergeCells(`D6:F6`);
    sheet.mergeCells(`G6:J6`);

    // Define subheaders
    const subHeaders = [
      "",
      "",
      "",
      "Width1(mm)",
      "Height1(mm)",
      "Radius of Center(mm)",
      "Width2(mm)",
      "Height2(mm)",
      "Width3(mm)",
      "Height3(mm)",
      "",
      "",
      "",
      "",
      "",
    ];

    const subheaderRow = sheet.addRow(subHeaders);
    subheaderRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };

    subheaderRow.font = { bold: true };
    sheet.mergeCells(`A6:A7`);
    sheet.mergeCells(`B6:B7`);
    sheet.mergeCells(`C6:C7`);
    sheet.mergeCells(`K6:K7`);
    sheet.mergeCells(`L6:L7`);
    sheet.mergeCells(`M6:M7`);
    sheet.mergeCells(`N6:N7`);
    sheet.mergeCells(`O6:O7`);

    levels.forEach((level) => {
      const levelRow = sheet.addRow([`Level: ${level.title}`]);
      levelRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "72A0C1" },
      };
      sheet.mergeCells(`A${levelRow.number}:K${levelRow.number}`);
      levelRow.alignment = { horizontal: "left" };
      levelRow.font = { bold: true };
      level.rows.forEach((row) => {
        sheet.addRow([
          row.sn,
          row.description,
          row.insulation,
          row.width1,
          row.height1,
          row.radius,
          row.width2,
          row.height2,
          row.width3,
          row.height3,
          row.length1,
          row.length2,
          row.length3,
          row.duct_pieces,
          row.area.toFixed(2),
        ]);
      });
      // total area on the basis of the insulation types and total area
      const totalArea = calculateTotalArea(level.rows);
      const areaByInsulation = calculateTotalAreaByInsulation(level.rows);
      const totalRow = sheet.addRow([
        "",
        "Total Area",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        totalArea.toFixed(2),
      ]);
      totalRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F0F0F0" },
      };
      totalRow.font = { bold: true };

      const totalUninsulatedRow = sheet.addRow([
        "",
        "Uninsulated Area:",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        areaByInsulation.Uninsulated.toFixed(2),
      ]);
      totalUninsulatedRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F0F0F0" },
      };
      totalUninsulatedRow.font = { bold: true };
      const totalExternalRow = sheet.addRow([
        "",
        "Externally Insulated Area:",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        areaByInsulation.Externally_Insulated.toFixed(2),
      ]);
      totalExternalRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F0F0F0" },
      };
      totalExternalRow.font = { bold: true };
      const totalInternalRow = sheet.addRow([
        "",
        "Internally Insulated Area:",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        areaByInsulation.Internally_Insulated.toFixed(2),
      ]);
      totalInternalRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F0F0F0" },
      };
      totalInternalRow.font = { bold: true };
      sheet.addRow([]);
    });

    const columnWidths = [
      4, 35,25, 13, 13, 20, 13, 13, 13, 13, 13, 13, 15, 15, 15, 15,
    ];
    sheet.columns = sheet.columns.map((col, index) => ({
      ...col,
      width: columnWidths[index] || 15,
    }));

    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "medium" },
          left: { style: "medium" },
          bottom: { style: "medium" },
          right: { style: "medium" },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${projectName}_duct_area_measurement.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleTitleChange = (levelKey: number, value: string) => {
    setLevels(
      levels.map((lvl) =>
        lvl.key === levelKey ? { ...lvl, title: value } : lvl
      )
    );
  };

  const calculateTotalArea = (rows: RowData[]) =>
    rows.reduce((total, row) => total + row.area, 0);

  const calculateTotalAreaByInsulation = (rows: RowData[]) => {
    const totals = {
      Uninsulated: 0,
      Externally_Insulated: 0,
      Internally_Insulated: 0,
    };
    rows.forEach((row) => {
      if (row.insulation in totals) {
        totals[row.insulation as keyof typeof totals] += row.area;
      }
    });
    return totals;
  };

  const columns = (levelKey: number) => [
    {
      title: "S.N",
      dataIndex: "sn",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_text: string, record: RowData) => (
        <Select
          className="w-44"
          options={ductDescription.map((desc) => ({
            label: desc.label,
            value: desc.value,
          }))}
          value={record.description}
          onChange={(value) =>
            handleDescriptionChange(levelKey, record.key, value)
          }
        />
      ),
    },
    {
      title: "Insulation Type",
      dataIndex: "insulation",
      render: (_text: string, record: RowData) => (
        <Select
          className="w-44"
          options={insulationTypes.map((insulation) => ({
            label: insulation.label,
            value: insulation.value,
          }))}
          value={record.insulation}
          onChange={(value) =>
            handleInsulationChange(levelKey, record.key, value)
          }
        />
      ),
    },

    {
      title: "Duct Size",
      children: [
        {
          title: "Width1(mm)",
          dataIndex: "width1",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.width1}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "width1",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Height1(mm)",
          dataIndex: "height1",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.height1}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "height1",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Radius of Center (mm)",
          dataIndex: "radius",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.radius}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "radius",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
      ],
    },
    {
      title: "Reducer Duct Size",
      children: [
        {
          title: "Width2(mm)",
          dataIndex: "width2",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.width2}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "width2",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Height2(mm)",
          dataIndex: "height2",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.height2}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "height2",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Width3(mm)",
          dataIndex: "width3",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.width3}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "width3",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Height3(mm)",
          dataIndex: "height3",
          render: (text: number, record: RowData) => (
            <Input
              className=""
              type="number"
              value={text}
              disabled={!editable[record.key]?.height3}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "height3",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
      ],
    },
    {
      title: "Length1(m)",
      dataIndex: "length1",
      render: (text: number, record: RowData) => (
        <Input
          className=""
          type="number"
          value={text}
          disabled={!editable[record.key]?.length1}
          onChange={(e) =>
            handleInputChange(
              levelKey,
              record.key,
              "length1",
              parseFloat(e.target.value)
            )
          }
        />
      ),
    },
    {
      title: "Length 2(mm)",
      dataIndex: "length2",
      render: (text: number, record: RowData) => (
        <Input
          className=""
          type="number"
          value={text}
          disabled={!editable[record.key]?.length2}
          onChange={(e) =>
            handleInputChange(
              levelKey,
              record.key,
              "length2",
              parseFloat(e.target.value)
            )
          }
        />
      ),
    },
    {
      title: "Length3(m)",
      dataIndex: "length3",
      render: (text: number, record: RowData) => (
        <Input
          className=""
          type="number"
          value={text}
          disabled={!editable[record.key]?.length3}
          onChange={(e) =>
            handleInputChange(
              levelKey,
              record.key,
              "length3",
              parseFloat(e.target.value)
            )
          }
        />
      ),
    },
    {
      title: "Duct Pieces",
      dataIndex: "duct_pieces",
      render: (text: number, record: RowData) => (
        <Input
          className=""
          type="number"
          value={text}
          disabled={!editable[record.key]?.duct_pieces}
          onChange={(e) =>
            handleInputChange(
              levelKey,
              record.key,
              "duct_pieces",
              parseFloat(e.target.value)
            )
          }
        />
      ),
    },
    // {
    //   title: "Perimeter (m)",
    //   dataIndex: "perimeter",
    //   render: (text: number) => <span>{text.toFixed(2)}</span>,
    // },
    {
      title: "Area (m²)",
      dataIndex: "area",
      render: (text: number) => <span>{text.toFixed(2)}</span>,
    },
  ];

  return (
    <div>
      <Navigation />
      <div className="p-4">
        <div className="flex justify-center my-10 text-4xl font-bold font-mono text-gray-600">
          Duct Area Measurement
        </div>
        <div className="flex-col mx-30 items-center my-10">
          <div>
            <Input
              id="projectName"
              className="w-44 my-10 h-12"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <Button
              className="bg-gray-500 text-white"
              icon={<PlusOutlined />}
              onClick={handleAddLevel}
            >
              Add Level
            </Button>
          </div>
        </div>

        {levels.map((level) => (
          <div key={level.key} className="mb-8">
            <Input
              className="mb-2 w-64"
              value={level.title}
              onChange={(e) => handleTitleChange(level.key, e.target.value)}
            />
            <DeleteOutlined
              className="text-red-500 p-2"
              onClick={() => handleDeleteLevel(level.key)}
            />
            <Table
              bordered
              columns={columns(level.key)}
              dataSource={level.rows}
              pagination={false}
              footer={() => {
                const totalArea = calculateTotalArea(level.rows);
                const areaByInsulation = calculateTotalAreaByInsulation(
                  level.rows
                );
                return (
                  <div>
                    <div className="flex justify-between">
                      <span>Total Area: {totalArea.toFixed(2)} m²</span>
                      <Button
                        className="flex items-center bg-blue-500 text-white"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddRow(level.key)}
                      >
                        Add Row
                      </Button>
                    </div>
                    <div>
                      <span>
                        Total Uninsulated Area:{" "}
                        {areaByInsulation.Uninsulated.toFixed(2)} m²
                      </span>
                    </div>
                    <div>
                      <span>
                        Total Externally Insulated Area:{" "}
                        {areaByInsulation.Externally_Insulated.toFixed(2)} m²
                      </span>
                    </div>
                    <div>
                      <span>
                        Total Internally Insulated Area:{" "}
                        {areaByInsulation.Internally_Insulated.toFixed(2)} m²
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        ))}
        <Button
          className="flex my-10 bg-gray-600 text-white p-4 items-center"
          onClick={downloadTableData}
        >
          Download Excel File
        </Button>
      </div>
      <NewFooter />
    </div>
  );
};

export default DuctMeasurement;
