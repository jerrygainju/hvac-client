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

  const updateEditableState = (levelKey: number, rowKey: number, description: string) => {
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

  const handleInputChange = (levelKey: number, rowKey: number, field: keyof RowData, value: number) => {
    setLevels(
      levels.map((lvl) =>
        lvl.key === levelKey
          ? {
              ...lvl,
              rows: lvl.rows.map((row) =>
                row.key === rowKey
                  ? {
                      ...row,
                      [field]: value,
                      perimeter: 2 * (row.width + row.height),
                      area: row.duct_pieces * row.width * row.height * row.length,
                    }
                  : row
              ),
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

  const calculateTotalArea = (rows: RowData[]) => rows.reduce((total, row) => total + row.area, 0);

  const columns = (levelKey: number) => [
    {
      title: "S.N",
      dataIndex: "sn",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string, record: RowData) => (
        <Select
          className="w-48"
          options={ductDescription}
          value={record.description}
          onChange={(value) => handleDescriptionChange(levelKey, record.key, value)}
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
                handleInputChange(levelKey, record.key, "width", parseFloat(e.target.value))
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
                handleInputChange(levelKey, record.key, "height", parseFloat(e.target.value))
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
                handleInputChange(levelKey, record.key, "radius", parseFloat(e.target.value))
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
                handleInputChange(levelKey, record.key, "reducer_width", parseFloat(e.target.value))
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
                handleInputChange(levelKey, record.key, "reducer_height", parseFloat(e.target.value))
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
            handleInputChange(levelKey, record.key, "length", parseFloat(e.target.value))
          }
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "duct_pieces",
      render: (text: number, record: RowData) => (
        <Input
          className="w-24"
          type="number"
          value={text}
          onChange={(e) =>
            handleInputChange(levelKey, record.key, "duct_pieces", parseFloat(e.target.value))
          }
        />
      ),
    },
    {
      title: "Area (m²)",
      dataIndex: "area",
      render: (text: number) => <span>{text.toFixed(2)}</span>,
    },
  ];

  return (
    <div className="w-screen">
      <Navigation />
      <section className="flex-col my-10">
        <div className="flex justify-center text-2xl font-bold">
          <h2>Duct Area Measurement</h2>
        </div>
        <div className="flex justify-center my-10">
          <div className="flex-col">
            <div className="my-2">
              <Input className="w-40 text-center" placeholder="Enter Project Name" />
            </div>
            <div className="flex justify-center">
              <Button onClick={handleAddLevel} className="bg-gray-600 text-white">
                Add Level
              </Button>
            </div>
          </div>
        </div>
        <div className="my-10 w-full">
          {levels.map((lvl) => (
            <div key={lvl.key} className="flex-col my-10">
              <div className="flex gap-6 items-center my-4 translate-x-80">
                <Input
                  className="text-xl font-bold w-40"
                  value={lvl.title}
                  onChange={(e) => handleTitleChange(lvl.key, e.target.value)}
                />
                <Button onClick={() => handleAddRow(lvl.key)} className="bg-blue-600 text-white">
                  <PlusOutlined />
                </Button>
              </div>
              <Table
                className="flex justify-center"
                bordered
                columns={columns(lvl.key)}
                dataSource={lvl.rows}
                pagination={false}
              />
              <div className="flex justify-end my-4 w-10/12">
                <span className="text-lg font-semibold">
                  Total Area: {calculateTotalArea(lvl.rows).toFixed(2)} m²
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <NewFooter />
    </div>
  );
};

export default DuctMeasurement;
