import { Button, Input, Select, Table } from "antd";
import NewFooter from "../../homepage/footer/Footer";
import Navigation from "../../homepage/navigation/navigation";
import { ductDescription, insulationTypes } from "./components/ductPieces";
import { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import * as ExcelJS from "exceljs";
import { getElementStringValue } from "../carparkventilation/components/Extra ";
import "./components/customTable.css";

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
    if (levelKey === 0) {
      return;
    }
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
      sheet.mergeCells(`A${levelRow.number}:O${levelRow.number}`);
      levelRow.alignment = { horizontal: "left" };
      levelRow.font = { bold: true };


      const formatValue = (value: number | string): string => {
        if(typeof value ==='number' && value === 0){
          return '-';
        }
        return value.toString();
      };
      level.rows.forEach((row) => {
        sheet.addRow([
          row.sn,
          row.description,
          row.insulation,
          formatValue(row.width1),
          formatValue(row.height1),
          formatValue(row.radius),
          formatValue(row.width2),
          formatValue(row.height2),
          formatValue(row.width3),
          formatValue(row.height3),
          formatValue(row.length1),
          formatValue(row.length2),
          formatValue(row.length3),
          formatValue(row.duct_pieces),
          formatValue(row.area.toFixed(2)),
        ]);
      });

      const totalArea = calculateTotalArea(level.rows);
      const areaByInsulation = calculateTotalAreaByInsulation(level.rows);
      const totalRow = sheet.addRow([
        "",
        "Total Area:",
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
      sheet.mergeCells(`B${totalRow.number}:N${totalRow.number}`);
      totalRow.alignment = { horizontal: "center", vertical: "middle" };

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
      sheet.mergeCells(
        `B${totalUninsulatedRow.number}:N${totalUninsulatedRow.number}`
      );
      totalUninsulatedRow.alignment = {
        horizontal: "center",
        vertical: "middle",
      };

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
      sheet.mergeCells(
        `B${totalExternalRow.number}:N${totalExternalRow.number}`
      );
      totalExternalRow.alignment = { horizontal: "center", vertical: "middle" };

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
      sheet.mergeCells(
        `B${totalInternalRow.number}:N${totalInternalRow.number}`
      );
      totalInternalRow.alignment = { horizontal: "center", vertical: "middle" };

      sheet.addRow([]);
    });

    const columnWidths = [
      4, 40, 25, 13, 13, 20, 13, 13, 13, 13, 13, 13, 15, 15, 15, 15,
    ];
    sheet.columns = sheet.columns.map((col, index) => ({
      ...col,
      width: columnWidths[index] || 15,
    }));

    sheet.eachRow((row) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: { style: "medium" },
          left: { style: "medium" },
          bottom: { style: "medium" },
          right: { style: "medium" },
        };

        // Apply left alignment to "Description" column
        if (colNumber === 2) {
          cell.alignment = { horizontal: "left", vertical: "middle" };
        } else {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        }
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

  const handleDeleteRow = (levelKey: number, rowKey: number) => {
    setLevels(
      levels.map((lvl) =>
        lvl.key === levelKey
          ? {
              ...lvl,
              rows: lvl.rows.filter(
                (row) => row.key !== rowKey || row.key === 0
              ),
            }
          : lvl
      )
    );
  };

  const columns = (levelKey: number) => [
    {
      title: "S.N",
      dataIndex: "sn",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "auto",
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
      width: "auto",
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
          width: "auto",
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
          width: "auto",
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
          width: "auto",
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
          width: "auto",
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
          width: "auto",
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
          width: "auto",
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
          width: "auto",
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
      width: "auto",
      render: (text: number, record: RowData) => (
        <Input
          className="w-16"
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
      title: "Length2(mm)",
      dataIndex: "length2",
      width: "auto",
      render: (text: number, record: RowData) => (
        <Input
          className="16"
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
      width: "auto",
      render: (text: number, record: RowData) => (
        <Input
          className="16"
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
      width: "auto",
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
    //    width: "auto",
    //   render: (text: number) => <span>{text.toFixed(2)}</span>,
    // },
    {
      title: "Area (m²)",
      dataIndex: "area",
      width: "auto",
      render: (text: number) => <span className="w-40">{text.toFixed(2)}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "auto",
      render: (_text: string, record: RowData) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(levelKey, record.key)}
          hidden={record.key === 0}
        />
      ),
    },
  ];

  return (
    <div className="w-screen">
      <Navigation />
      <div className="p-4">
        <div className="flex justify-center my-10 text-4xl font-bold font-mono text-gray-600">
          Duct Area Measurement
        </div>
        <div className="flex flex-col justify-start items-center my-6 w-1/5">
          <Input
            id="projectName"
            className="w-44 my-4 h-12 border-2 border-gray-400 "
            placeholder="Enter project name"
          />
          <Button
            className="bg-gray-500 text-white w-44 h-10 mb-20"
            icon={<PlusOutlined />}
            onClick={handleAddLevel}
          >
            Add Level
          </Button>
        </div>

        {levels.map((level) => (
          <div key={level.key} className="mb-8">
            <div className="flex justify-start items-center gap-4  ">
              <Input
                className="mb-2 w-44 h-12 border-2 border-gray-400"
                value={level.title}
                onChange={(e) => handleTitleChange(level.key, e.target.value)}
              />
              <Button
                className="text-red-500 rounded-lg"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteLevel(level.key)}
                hidden={level.key === 0}
              />
            </div>
            <Table
              bordered
              className="border-2 drop-shadow-lg custom-table"
              columns={columns(level.key)}
              dataSource={level.rows}
              rowKey="key"
              pagination={false}
              footer={() => {
                const totalArea = calculateTotalArea(level.rows);
                const areaByInsulation = calculateTotalAreaByInsulation(
                  level.rows
                );
                return (
                  <div>
                    <div className="my-4">
                      <Button
                        className="flex justify-center items-center w-full"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddRow(level.key)}
                      >
                        Add Row
                      </Button>
                    </div>
                    <div>
                      <span>Total Area: {totalArea.toFixed(2)} m²</span>
                    </div>
                    <div>
                      <span>
                        Uninsulated Area:{" "}
                        {areaByInsulation.Uninsulated.toFixed(2)} m²
                      </span>
                    </div>
                    <div>
                      <span>
                        Externally Insulated Area:{" "}
                        {areaByInsulation.Externally_Insulated.toFixed(2)} m²
                      </span>
                    </div>
                    <div>
                      <span>
                        Internally Insulated Area:{" "}
                        {areaByInsulation.Internally_Insulated.toFixed(2)} m²
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            className="flex justify-center my-10 bg-gray-600 text-white p-4 items-center w-44 h-12"
            onClick={downloadTableData}
          >
            Download Excel File
          </Button>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default DuctMeasurement;
