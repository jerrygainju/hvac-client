import Calculation from "./CalculationInput";
import Table from "./Table";
import { useRef } from 'react';
import table1 from '../../public/table1.png';
import table2 from '../../public/table-2.png';
import Layout from "../homepage/layout";

const Car = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    if (tableRef.current) {
      window.scrollTo({ top: tableRef.current.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 pl-10 mt-[2680px]  ">
      <div className="pl-60">   
      <Layout>
        {' '}
      </Layout>
      </div>
      <div className="flex flex-row gap-14 pt-6 text-3xl content-center text-center pl-16 font-bold">
        Car Park Ventilation
        <div className="flex gap-10">
          <button className="text-sm border rounded p-2 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" onClick={scrollHandler}>
            Click for Information
          </button>
        </div>
      </div>
      <div>
        <Calculation />
      </div>

      <div className="text-base font-bold pt-16" ref={tableRef}>
        Information
      </div>
      <div className=" text-sm pr-20 py-3">
        Natural Ventilation of Car park is permitted if:
        <div className="pl-4">
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
      <div className="text-base font-bold pt-6 ">
        Car Park Mechanical Ventilation
      </div>
      <div className="text-sm font-bold pt-4 ">
        A. Smaller Car park Exhaust requirement
      </div>
      <div className="text-sm pt-2">
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
      <div className="text-sm pt-4 font-bold">
        B. Big Car park Exhaust requirement:
      </div>
      <div className="text-sm pt-2">
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
        <img src={table1} height={600} width={600} alt="Table 1" />
        <img src={table2} height={600} width={600} alt="Table 2" />
      </div>

    </div>
  );
}

export default Car;
