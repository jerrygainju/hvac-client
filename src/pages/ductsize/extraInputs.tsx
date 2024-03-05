import React from 'react';
import Select from 'react-select';

interface SelectInputProps {
  options: any[];
  placeholder: string;
  onChange: (selectedOption: any) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({ options, placeholder, onChange }) => {
  return (
    <div>
      <Select
        options={options}
        placeholder={placeholder}
        className='pt-2'
        styles={{
          control: (provided) => ({
            ...provided,
            width: '165px',
            backgroundColor: 'rgba(231,229,225,255)',
            borderColor: 'transparent',
          }),
          menu: (provided) => ({
            ...provided,
            width: '165px',
            backgroundColor: "rgba(231,229,225,255)"
          }),
        }}
        onChange={onChange}
      />
    </div>
  );
};

interface RadioInputProps {
  type: string;
  label: string;
  options: any[];
  selectedOption: string;
  onChange: (option: string) => void;
  additionalInputs: Record<string, { label: string, id: string, placeholder: string, unit: string, onChange?: (value: string) => void }>;
}

export const RadioInput: React.FC<RadioInputProps> = ({ type, label, options, selectedOption, onChange, additionalInputs }) => {
  return (
    <div className='flex flex-col'>
      <b>{label}</b>
      <div className='flex flex-row gap-4 pt-4'>
        {options.map((option) => (
          <label key={option.value} className='flex items-center'>
            <input
              type='radio'
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4"
            />
            <span className='pl-2'>{option.label}</span>
          </label>
        ))}
      </div>
      <div className='flex flex-row gap-4 pt-4'>
        {Object.entries(additionalInputs).map(([key, input]) => (
          selectedOption === key && (
            <div key={key}>
              {input.label} <input
                placeholder={input.placeholder}
                id={input.id}
                onChange={(e) => {
                  if (input.onChange) {
                    input.onChange(e.target.value);
                  }
                }}
                type={type}
                style={{ backgroundColor: 'rgba(231,229,225,255)' }}
                className='rounded w-full md:w-32 h-8 text-center'
              />
              {input.unit}
            </div>
          )
        ))}
      </div>
    </div>
  );
};


interface TextInputProps {
  placeholder: string;
  type: string;
  id: string;
  unit: string;
  onChange?: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ type, id, placeholder, unit, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='pl-2'>
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        style={{ backgroundColor: 'rgba(231,229,225,255)' }}
        className='rounded w-28 h-8 text-center'
        onChange={handleChange}
      />
      {unit}
    </div>
  );
};

