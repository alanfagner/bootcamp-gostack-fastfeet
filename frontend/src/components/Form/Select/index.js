import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function Select({ options, labelName, name, ...rest }) {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,

      ref: selectRef.current,

      path: 'state.value',

      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map(option => option.value);
        }

        if (!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <label htmlFor={name}>{labelName}</label>
      <ReactSelect
        options={options}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
