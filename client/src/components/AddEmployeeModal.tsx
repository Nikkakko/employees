import { Button, Card, Form, Modal, Row, Space } from 'antd';
import EmployeeForm from './CustomInputs/EmployeeForm';
import { useAppSelector } from '../app/hook';
import { useNavigate } from 'react-router-dom';
import { EmployeeType } from '../app/services/employees';
import { CustomInput } from '.';
import ErrorMsg from './ErrorMsg';

type AddEmployeeModalProps = {
  onOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  error?: string;
  employee?: EmployeeType | undefined;
};

const AddEmployeeModal = ({
  onOpen,
  onOk,
  onCancel,
  error,
}: AddEmployeeModalProps) => {
  //get field values
  const [form] = Form.useForm();
  const values = form.getFieldsValue();

  const handleOk = () => {
    console.log(values);
  };

  return (
    <>
      <Modal
        title='Add Employee'
        open={onOpen}
        onOk={handleOk}
        onCancel={onCancel}
        okText='Submit'
        cancelText='Cancel'
      >
        <Row align='middle' justify='center'>
          <Card style={{ width: 500, margin: 'auto', marginTop: '30px' }}>
            <Form
              name='employee-form'
              form={form}
              initialValues={{ remember: true }}
              onFinish={handleOk}
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
                <ErrorMsg error={error} />
              </Space>
            </Form>
          </Card>
        </Row>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
