const Table = () => {
  return (
    <>
      <div className="text-sm text-center pt-4 font-bold">
        Table and variable
      </div>
      <div className="content-center">
        <table className="border border-collapse mt-4 text-sm w-5/12 mx-auto">
          <thead>
            <tr>
              <th className="border py-3">Interpretation</th>
              <th className="border px-6">Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                No of parking spaces in the zone of level under consideration
              </td>
              <td className="border pl-10">n1</td>
            </tr>
            <tr>
              <td className="border p-2">
                No of parking spaces situated in other parts of the car park,
                having exit routes passing through the zone or level under
                consideration
              </td>
              <td className="border pl-10">n2</td>
            </tr>
            <tr>
              <td className="border p-2">Parking usage factor (Table A)</td>
              <td className="border pl-10">p</td>
            </tr>
            <tr>
              <td className="border p-2">
                Average driving distance, in meters, within the zone or level
                under consideration for the exit of a car parked there
              </td>
              <td className="border pl-10">d1</td>
            </tr>
            <tr>
              <td className="border p-2">
                The average driving distance, in mtrs, within the zone or level
                under consideration for the exit of a car whose exit routes pass
                through the zone or level under consideration
              </td>
              <td className="border pl-10">d2</td>
            </tr>
            <tr>
              <td className="border p-2">The Staff Exposure Factor (Table C)</td>
              <td className="border pl-10">E</td>
            </tr>
            <tr>
              <td className="border p-2">The Vehicle Type Factor (Table B)</td>
              <td className="border pl-10">T</td>
            </tr>
            <tr>
              <td className="border p-2">The Staff Usage Factor (Table C)</td>
              <td className="border pl-10">F</td>
            </tr>
            <tr>
              <td className="border p-2">Area</td>
              <td className="border pl-10">A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
