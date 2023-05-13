import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../components/CustomInputs/EmployeeForm';
import {
  EmployeeType,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from '../app/services/employees';
import { Row, Spin } from 'antd';
import { Paths } from '../Paths';
import { isErrorWithMessage } from '../utils/errorMessage';
import styled from 'styled-components';
import { CustomButton } from '../components';
import { ArrowLeftOutlined } from '@ant-design/icons';

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeByIdQuery(params.id || '');
  const [updateEmployee] = useUpdateEmployeeMutation();

  if (isLoading) {
    return (
      <Spin
        size='large'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  const handleEditUser = async (employee: EmployeeType) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await updateEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  return (
    <Container>
      <CustomButton
        onClick={() => navigate(-1)}
        type='primary'
        icon={<ArrowLeftOutlined />}
        style={{ width: 'fit-content' }}
      >
        Back
      </CustomButton>

      <Row align='middle' justify='center'>
        <EmployeeForm
          onFinish={handleEditUser}
          title='Edit Employee'
          employee={data}
          btnText='Submit Changes'
          error={error}
        />
      </Row>
    </Container>
  );
};

const Container = styled.div``;

export default EditEmployee;
