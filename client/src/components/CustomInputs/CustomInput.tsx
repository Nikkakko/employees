import React from 'react';
import { Input, Form, InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  children?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({ ...props }) => {
  return (
    <Form.Item
      name={props.name}
      shouldUpdate={true}
      rules={[
        {
          required: true,
          message: `Please input your ${props.name}!`,
        },
      ]}
    >
      <Input {...props} />
    </Form.Item>
  );
};

export default CustomInput;
