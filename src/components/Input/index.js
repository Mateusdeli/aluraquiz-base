import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  padding: 15px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 0;
  margin-bottom: 25px;
  border-radius: 3px;
  outline: 0;
  color: #ffffff;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  &::placeholder {
    color: #ffffff;
  }
`;

// eslint-disable-next-line react/prop-types
export default function Input({ placeholder, onChange }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

Input.defaultProps = {
    value: ''
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
