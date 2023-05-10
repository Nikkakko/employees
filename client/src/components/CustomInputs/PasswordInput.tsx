import React from 'react';
import { Input, Form, InputProps } from 'antd';
import { NamePath } from 'antd/lib/form/interface';

interface PasswordInputProps extends InputProps {
  dependencies?: NamePath[];
}

const PasswordInput: React.FC<PasswordInputProps> = ({ ...props }) => {
  return (
    <Form.Item
      name={props.name}
      dependencies={props.dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Обязательное поле',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (props.name === 'confirmPassword') {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Passowrd and confirm password do not match')
              );
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error('Password must be at least 6 characters long')
                );
              }

              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input {...props} />
    </Form.Item>
  );
};

export default PasswordInput;
