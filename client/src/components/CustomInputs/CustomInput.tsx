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
      hasFeedback
      rules={[
        {
          required: true,
          message: `Please enter your ${props.name}!`,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              !value ||
              getFieldValue('email') === value.toLowerCase().trim()
            ) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error('The two emails that you entered do not match!')
            );
          },
        }),
      ]}
    >
      <Input {...props} />
    </Form.Item>
  );
};

export default CustomInput;
