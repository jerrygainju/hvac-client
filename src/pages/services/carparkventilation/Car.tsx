import Calculation from "./components/CalculationInput";
import Table from "./components/Table";
import { useState, useRef } from 'react';
import table1 from '../../../public/table1.png';
import table2 from '../../../public/table-2.png';
import { Image } from "antd";
import Navigation from "../../homepage/navigation/Navigation";

const Car = () => {
  const [showInformation, setShowInformation] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    if (tableRef.current) {
      window.scrollTo({ top: tableRef.current.offsetTop, behavior: 'smooth' });
    }
  };
  const toggleInformation = () => {
    setShowInformation(!showInformation);
    if (!showInformation) {
      setTimeout(() => {
        scrollHandler();
      }, 100);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex flex-row gap-14 pt-6 text-3xl content-center text-center pl-16 font-mono font-bold">
        Car Park Ventilation
        <div>
          <button style={{ width: '250px' }} className="text-sm border rounded p-2 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={() => toggleInformation()}>
            {showInformation ? 'Hide Information' : 'Click for More Information'}
          </button>
        </div>
      </div>
      <div>
        <Calculation />
      </div>
      {showInformation && (
        <div>
          <div className=" text-sm pr-20 pl-16 pt-10" ref={tableRef}>
            <b>Natural Ventilation of Car park is permitted if:</b>
            <div className="pl-4 pt-2">
              <li>
                <b>The lowest point of the floor of the car park</b> being ventilated shall be <b>not more than 1.2 m below the ground level</b> of the required outdoor clear space, <b>with permanent ventilation</b> openings along at least one side.
              </li>
              <li>
                Minimum of 3m unobstructed space outside the permanent opening.
              </li>
              <li>
                Zone with parking space less than six motor vehicle: Opening area should not be less than 5% of the floor area
              </li>
              <li>
                Zone with Opening not less 12.5% of wall area, distance from opening to car park area should be less than 9 m.
              </li>
              <li>
                Zone within 18m distance from opening to other wall (opening to one side of wall), Opening should be uniformly distributed and should not be less than 2.0 m2 per car parking space. If opening on each side then opening should be min 1.0 m2 per car parking space.

              </li>
              <li>
                Zone with not more than 75 m distance between two extremes wall, then opening area should be 0.5 m2 on each wall per car parking space.
              </li>
            </div>
          </div >
          <div className="text-base font-bold pt-6 pl-16">
            Car Park Mechanical Ventilation
          </div>
          <div className="text-sm font-bold pt-4 pl-16">
            A. Smaller Car park Exhaust requirement
          </div>
          <div className="text-sm pt-2 pl-16">
            For car parks with <b>40 or fewer car spaces with no special vehicle population</b> and <b>no attendant parking,</b> the airflow rate, in liters per second, may be taken as the greatest of
            <ul>
              (a) 400 n1P;
            </ul>
            <ul>
              (b) 2000; or
            </ul>
            <ul>
              (c) 2.5 × A.
            </ul>
            where,
            <ul>
              n1=No of parking spaces in the zone of level under consideration
            </ul>
            <ul>
              P = Parking usage factor determined from Table 4.1
            </ul>
            <ul>
              A =Area of the zone or level, in square meters
            </ul>
          </div>
          <div className="text-sm pt-4 font-bold pl-16">
            B. Big Car park Exhaust requirement:
          </div>
          <div className="text-sm pt-2 pl-16">
            The greatest of --
            <ul>
              (a) 0.85 C × E × T;
            </ul>
            <ul>
              (b) 2000 × F × T; or
            </ul>
            <ul>
              (c) 2.5 × A.
            </ul>
          </div>
          <Table />

          <div className="text-sm pt-4 font-bold">
            {/* C (Contaminant Generation Rate) = P × (100 × n1 + n1 × d1 + n2 × d2) */}
          </div>
          <div className="flex pt-8 pl-32 pb-20">
            <Image src={table1} height={600} width={600} alt="Table 1" />
            <Image src={table2} height={600} width={600} alt="Table 2" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Car;
