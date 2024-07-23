import { SearchOutlined} from "@ant-design/icons";
import { Input, Button, Dropdown, Menu, Checkbox } from "antd";
import Vector from "../../public/Vector.png";
import { clients } from "./clientData";
import printer from "../../public/printer.png";
import exportIcon from "../../public/export.png";
import AddClient from "./AddClient";

const ClientPage = () => {
  const handleMenuClick = (e: any) => {
    if (e.key === "print") {
      console.log("Print");
    } else if (e.key === "export") {
      console.log("Export");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="print">
        <div className="flex items-center gap-2">
          <div>
            <img src={printer} alt="printer" className="w-2" />
          </div>
          Printer
        </div>
      </Menu.Item>
      <Menu.Item key="export">
        <div className="flex items-center gap-2">
          <div><img src={exportIcon} alt="export-icon" /></div>
          Export
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-[1440px]">
      <div className="flex justify-center my-4">
        <div className="flex flex-col gap-6 w-10/12">
          <div className="font-semibold text-2xl">
            <h2>Clients</h2>
          </div>
          <div className="flex justify-between w-[1078px] ">
            <div>
              <Input
                type="text"
                className="p-2 w-[280px] h-[46px] text-lg"
                placeholder="Search"
                prefix={<SearchOutlined className="pt-[1px] text-xl" />}
              />
            </div>
            <div className="h-[44px] w-[176px]">
              <AddClient />
            </div>
          </div>
          <div className="flex gap-16">
            <div className="w-[166px] h-[91px] bg-gray-100 rounded-md shadow-sm">
              <div className="flex flex-col gap-3 pl-4 pt-4">
                <div className="text-teal-400">
                  <p>XX</p>
                </div>
                <div className="text-sm">
                  <p>Active Clients</p>
                </div>
              </div>
            </div>
            <div className="w-[166px] h-[91px] bg-gray-100 rounded-md shadow-sm">
              <div className="flex flex-col gap-3 pl-4 pt-4">
                <div className="text-blue-700">
                  <p>XX</p>
                </div>
                <div className="text-sm">
                  <p>Added this month</p>
                </div>
              </div>
            </div>
            <div className="w-[166px] h-[91px] bg-gray-100 rounded-md shadow-sm">
              <div className="flex flex-col gap-3 pl-4 pt-4">
                <div className="text-red-300">
                  <p>XX</p>
                </div>
                <div className="text-sm">
                  <p>Added this Quarter</p>
                </div>
              </div>
            </div>
            <div className="w-[178px] h-[91px] bg-gray-100 rounded-md shadow-sm">
              <div className="flex flex-col gap-3 pl-4 pt-4">
                <div className="text-red-200">
                  <p>XX</p>
                </div>
                <div className="text-sm">
                  <p>Added this fiscal year</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto w-[1098px] h-full shadow-md rounded-xl">
            <table className="w-full h-[50px] text-lg text-left">
              <thead className="text-md text-gray-700" style={{background:"#D9D9D9"}}> 
                <tr className="h-[50px] w-[1098px]">
                  <th scope="col" className="w20"></th>
                  <th scope="col" className="px-6">
                    Name
                  </th>
                  <th scope="col" className="">
                    Company Name
                  </th>
                  <th scope="col" className="">
                    State
                  </th>
                  <th scope="col" className="">
                    Address
                  </th>
                  <th scope="col" className="">
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button type="link">
                        <img
                          src={Vector}
                          className="w-1 h-4"
                          alt="vector-img"
                        />
                      </Button>
                    </Dropdown>
                  </th>
                </tr>
              </thead>
              {clients.map((client) => (
                <tbody key={client.id}>
                  <tr className="hover:bg-gray-200 border-b ">
                    <td className="flex justify-center items-center h-[50px]">
                      <Checkbox />
                    </td>
                    <td className="px-8">{client.name}</td>
                    <td className="">{client.companyName}</td>
                    <td className="">{client.state}</td>
                    <td className="">{client.address}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        <div className="l-div"></div>
      </div>
    </div>
  );
};

export default ClientPage;
