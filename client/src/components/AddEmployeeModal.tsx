import { Card, Form, Modal, Row, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EmployeeType,
  useCreateEmployeeMutation,
} from '../app/services/employees';
import { CustomButton, CustomInput } from '.';
import ErrorMsg from './ErrorMsg';
import { Paths } from '../Paths';
import { isErrorWithMessage } from '../utils/errorMessage';

type AddEmployeeModalProps = {
  onOpen: boolean;
  onCancel: () => void;
  employee?: EmployeeType | undefined;
};

const AddEmployeeModal = ({ onOpen, onCancel }: AddEmployeeModalProps) => {
  //get field values
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createEmployee] = useCreateEmployeeMutation();
  const [error, setError] = useState<string>('');

  const handleCreateEmployee = async (values: EmployeeType) => {
    try {
      await createEmployee(values).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (err) {
      const error = isErrorWithMessage(err);
      if (error) {
        if (setError) {
          setError(err.data.message);
        }
      } else {
        if (setError) {
          setError('Something went wrong');
        }
      }
    }
  };

  return (
    <>
      <Modal
        title='Add Employee'
        open={onOpen}
        onCancel={onCancel}
        footer={null}
      >
        <Row align='middle' justify='start'>
          <Card style={{ width: 500, margin: 'auto', marginTop: '30px' }}>
            <Form
              name='employee-form'
              form={form}
              onFinish={values => handleCreateEmployee(values as EmployeeType)}
              layout='vertical'
            >
              <CustomInput name='firstName' type='text' placeholder='Name' />
              <CustomInput
                name='lastName'
                type='text'
                placeholder='Last Name'
              />
              <CustomInput name='address' type='text' placeholder='Address' />
              <CustomInput name='age' type='number' placeholder='Age' />
              <Space>
                <ErrorMsg message={error} />
              </Space>
            </Form>
          </Card>

          <Space style={{ marginTop: '30px' }}>
            <CustomButton onClick={() => form.submit()} type='primary'>
              Submit
            </CustomButton>
            <CustomButton onClick={onCancel} type='primary' danger>
              Cancel
            </CustomButton>
          </Space>
        </Row>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
