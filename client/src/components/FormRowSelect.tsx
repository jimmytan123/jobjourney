import type { SelectHTMLAttributes } from 'react';

type FormRowSelectProps = Pick<SelectHTMLAttributes<HTMLSelectElement>,
  'defaultValue' | 'onChange'> & {
  name: string;
  labelText?: string;
  options?: readonly string[];
};

const FormRowSelect = ({
  name,
  labelText,
  defaultValue = '',
  options = [],
  onChange,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
