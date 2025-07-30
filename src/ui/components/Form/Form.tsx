import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';



interface FormEntry {
  name: string;
  placeholder: string;
  extraProps: React.InputHTMLAttributes<HTMLInputElement>;
}

interface FormProps {
  label: string;
  loading: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void> | void;
  submitText: string;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading,
  formEntries,
  onFormSubmit,
  submitText
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps }, index) => {
          const { value, ...otherProps } = extraProps;
          return (
            <div key={`${name}-${index}`} className={$.formRow}>
              <InputText
                key={`${name}-${index}`}
                name={name}
                placeholder={placeholder}
                value={value?.toString() || ''}
                {...otherProps}
              />  
            </div>
          );
        })}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
