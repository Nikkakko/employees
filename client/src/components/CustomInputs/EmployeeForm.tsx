import { FC } from 'react';
import { Form, Card, Space } from 'antd';
import { EmployeeType } from '../../app/services/employees';
import { CustomInput } from '..';
import ErrorMsg from '../ErrorMsg';

interface EmployeeFormProps {
  onFinish?: (values: EmployeeType) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: EmployeeType | undefined;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ onFinish, error, employee }) => {
  return (
    <Card style={{ width: 500, margin: 'auto', marginTop: '30px' }}>
      <Form
        name='employee-form'
        initialValues={employee}
        onFinish={values => {
          console.log(values, 'values');
        }}
        layout='vertical'
      >
        <CustomInput name='firstName' type='text' placeholder='Name' />
        <CustomInput name='lastName' type='text' placeholder='Last Name' />
        <CustomInput name='address' type='text' placeholder='Address' />
        <CustomInput name='age' type='number' placeholder='Age' />
        <Space>
          <ErrorMsg error={error} />
        </Space>

        <Form.Item>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EmployeeForm;
