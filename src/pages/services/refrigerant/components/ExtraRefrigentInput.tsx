import React from 'react';
import Select from 'react-select';

  
  interface SelectInputProps {
    options: any[];
    placeholder: string;
    onChange: (selectedOption: any) => void;
    value?: any; 
    className?: string
  }

export const SelectRefriInput: React.FC<SelectInputProps> = ({ options, placeholder, onChange, value, className }) => {
    return (
      <div>
        <Select
          options={options}
          placeholder={placeholder}
          value={value} 
        //   styles={{
        //     control: (provided) => ({
        //       ...provided,
        //     //   width: '165px',
        //       borderColor: 'transparent',
        //     }),
        //     menu: (provided) => ({
        //       ...provided,
        //     //   width: '165px',
        //     //   backgroundColor: "rgba(245, 244, 248)"
        //     }),
        //   }}
          onChange={onChange}
          className={className}
        />
      </div>
    );
  };