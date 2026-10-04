import type { InputHTMLAttributes } from 'react';

type FormRowProps = Pick<InputHTMLAttributes<HTMLInputElement>,
  'type' | 'defaultValue' | 'required' | 'onChange'> & {
  name: string;
  labelText?: string;
};


const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  required = false,
  onChange,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
