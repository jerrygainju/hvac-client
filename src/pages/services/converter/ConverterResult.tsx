import React from "react";

type Result = {
  [key: string]: number;
};

type ResultDisplayProps = {
  results: Result[];
};

const formatKey = (key: string) => {
  switch (key) {
    case "m3perS":
      return "m³/s";
    case "m3perHr":
      return "m³/hr";
    case "btuperHr":
      return "BTU/hr";
    default:
      return key;
  }
};

const ConverterResult: React.FC<ResultDisplayProps> = ({ results }) => {
  return (
    <div>
      <h2 className="flex justify-center font-bold mt-8">Results</h2>
      {results.map((result, index) => (
        <div key={index} className="my-4">
          <h3 className="font-bold">Result {index + 1}</h3>
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="flex justify-center gap-2">
              <p className="text-gray-600">{value?.toFixed(2)}</p>
              <p>{formatKey(key)}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConverterResult;
