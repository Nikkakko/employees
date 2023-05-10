import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps, Form } from 'antd';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Form.Item
      style={{
        marginBottom: 0,
      }}
    >
      <StyledButton {...props}>{children}</StyledButton>
    </Form.Item>
  );
};

const StyledButton = styled(Button)`
  /* width: 100%; */
  height: 100%;
`;

export default CustomButton;
