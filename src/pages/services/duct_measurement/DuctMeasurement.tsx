import { Button, Input, Select, Table } from "antd";
import NewFooter from "../../homepage/footer/Footer";
import Navigation from "../../homepage/navigation/navigation";
import { ductDescription } from "./components/ductPieces";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

type RowData = {
  key: number;
  sn: number;
  description: string;
  width: number;
  height: number;
  length: number;
  radius: number;
  reducer_width: number;
  reducer_height: number;
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
    width: boolean;
    height: boolean;
    radius: boolean;
    reducer_width: boolean;
    reducer_height: boolean;
  };
};

const DuctMeasurement = () => {
  const [levels, setLevels] = useState<LevelData[]>([]);
  const [editable, setEditable] = useState<EditableState>({});

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
            description: "",
            width: 0,
            height: 0,
            length: 0,
            radius: 0,
            reducer_width: 0,
            reducer_height: 0,
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
                  description: "",
                  width: 0,
                  height: 0,
                  length: 0,
                  radius: 0,
                  reducer_width: 0,
                  reducer_height: 0,
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

  const handleDescriptionChange = (levelKey: number, rowKey: number, value: string) => {
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

  const updateEditableState = (_levelKey: number, rowKey: number, description: string) => {
    const newEditable: EditableState = { ...editable };
    switch (description) {
      case "Straight duct":
        newEditable[rowKey] = {
          width: true,
          height: true,
          radius: false,
          reducer_width: false,
          reducer_height: false,
        };
        break;
      case "Radius bend":
        newEditable[rowKey] = {
          width: true,
          height: true,
          radius: true,
          reducer_width: false,
          reducer_height: false,
        };
        break;
      case "Reducer":
        newEditable[rowKey] = {
          width: false,
          height: false,
          radius: true,
          reducer_width: true,
          reducer_height: true,
        };
        break;
      case "Mitered bend":
        newEditable[rowKey] = {
          width: true,
          height: true,
          radius: true,
          reducer_width: true,
          reducer_height: true,
        };
        break;
      default:
        newEditable[rowKey] = {
          width: false,
          height: false,
          radius: false,
          reducer_width: false,
          reducer_height: false,
        };
    }
    setEditable(newEditable);
  };

  // const handleInputChange = (levelKey: number, rowKey: number, field: keyof RowData, value: number) => {
  //   setLevels((prevLevels) =>
  //     prevLevels.map((lvl) =>
  //       lvl.key === levelKey
  //         ? {
  //             ...lvl,
  //             rows: lvl.rows.map((row) =>
  //               row.key === rowKey
  //                 ? {
  //                     ...row,
  //                     [field]: value,
  //                     perimeter:
  //                       field === "width" || field === "height"
  //                         ? 2 * (field === "width" ? value + row.height : row.width + value)
  //                         : row.perimeter,
  //                     area:
  //                       field === "width" ||
  //                       field === "height" ||
  //                       field === "duct_pieces" ||
  //                       field === "length"
  //                         ? (field === "width"
  //                             ? value * row.height * row.length
  //                             : row.width *
  //                               (field === "height" ? value : row.height) *
  //                               (field === "length" ? value : row.length)) *
  //                           (field === "duct_pieces" ? value : row.duct_pieces)
  //                         : row.area,
  //                   }
  //                 : row
  //             ),
  //           }
  //         : lvl
  //     )
  //   );
  // };
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
                const isStraightDuct = row.description === "Straight duct";
                const widthInMeters = isStraightDuct ? (row.width / 1000) : row.width;
                const heightInMeters = isStraightDuct ? (row.height / 1000) : row.height;
                const lengthInMeters = row.length; 
  
                const updatedRow = {
                  ...row,
                  [field]: value,
                  perimeter:
                    (field === "width" || field === "height") && isStraightDuct
                      ? 2 * ((field === "width" ? value / 1000 : widthInMeters) + (field === "height" ? value / 1000 : heightInMeters))
                      : row.perimeter,
                  area:
                    isStraightDuct
                      ? 2 * (widthInMeters + heightInMeters) * lengthInMeters * (field === "duct_pieces" ? value : row.duct_pieces)
                      : row.area,
                };
  
                if (field === "width" && isStraightDuct) {
                  updatedRow.area = 2 * ((value / 1000) + heightInMeters) * lengthInMeters * row.duct_pieces;
                }
  
                if (field === "height" && isStraightDuct) {
                  updatedRow.area = 2 * (widthInMeters + (value / 1000)) * lengthInMeters * row.duct_pieces;
                }
  
                if (field === "length" && isStraightDuct) {
                  updatedRow.area = 2 * (widthInMeters + heightInMeters) * value * row.duct_pieces;
                }
  
                if (field === "duct_pieces" && isStraightDuct) {
                  updatedRow.area = 2 * (widthInMeters + heightInMeters) * lengthInMeters * value;
                }
  
                return row.key === rowKey ? updatedRow : row;
              }),
            }
          : lvl
      )
    );
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
          className="w-48"
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
      title: "Duct Size",
      children: [
        {
          title: "Width (mm)",
          dataIndex: "width",
          render: (text: number, record: RowData) => (
            <Input
              className="w-24"
              type="number"
              value={text}
              disabled={!editable[record.key]?.width}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "width",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Height (mm)",
          dataIndex: "height",
          render: (text: number, record: RowData) => (
            <Input
              className="w-24"
              type="number"
              value={text}
              disabled={!editable[record.key]?.height}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "height",
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
              className="w-24"
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
          title: "Width (mm)",
          dataIndex: "reducer_width",
          render: (text: number, record: RowData) => (
            <Input
              className="w-24"
              type="number"
              value={text}
              disabled={!editable[record.key]?.reducer_width}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "reducer_width",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
        {
          title: "Height (mm)",
          dataIndex: "reducer_height",
          render: (text: number, record: RowData) => (
            <Input
              className="w-24"
              type="number"
              value={text}
              disabled={!editable[record.key]?.reducer_height}
              onChange={(e) =>
                handleInputChange(
                  levelKey,
                  record.key,
                  "reducer_height",
                  parseFloat(e.target.value)
                )
              }
            />
          ),
        },
      ],
    },
    {
      title: "Length (m)",
      dataIndex: "length",
      render: (text: number, record: RowData) => (
        <Input
          className="w-24"
          type="number"
          value={text}
          onChange={(e) =>
            handleInputChange(
              levelKey,
              record.key,
              "length",
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
          className="w-24"
          type="number"
          value={text}
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
        <div className="flex justify-center my-6 text-3xl font-bold font-mono">Duct Area Measurement</div>
        {levels.map((level) => (
          <div key={level.key} className="mb-8">
            <Input
              className="mb-2 w-64"
              value={level.title}
              onChange={(e) => handleTitleChange(level.key, e.target.value)}
            />
            <Table
              columns={columns(level.key)}
              dataSource={level.rows}
              pagination={false}
              footer={() => (
                <div className="flex justify-between">
                  <span>Total Area: {calculateTotalArea(level.rows).toFixed(2)} m²</span>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddRow(level.key)}
                  >
                    Add Row
                  </Button>
                </div>
              )}
            />
          </div>
        ))}
        <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddLevel}>
          Add Level
        </Button>
      </div>
      <NewFooter />
    </div>
  );
};

export default DuctMeasurement;
