import styled from 'styled-components';
import { CustomButton } from '../components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  EmployeeType,
  useGetAllEmployeesQuery,
} from '../app/services/employees';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../Paths';
import { useAppSelector } from '../app/hook';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { useCreateEmployeeMutation } from '../app/services/employees';
import { isErrorWithMessage } from '../utils/errorMessage';

const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const { user } = useAppSelector(state => state.auth);
  const [createEmployee] = useCreateEmployeeMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [navigate, user]);

  const handleAdd = () => {
    navigate(Paths.employeeAdd);
  };

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [navigate, user]);

  const handleCreateEmployee = async (values: EmployeeType) => {
    try {
      await createEmployee(values).unwrap();
      navigate(`${Paths.status}/created}`);
      setIsModalOpen(false);
    } catch (err) {
      const error = isErrorWithMessage(err);

      if (error) {
        setError(err.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  const columns: ColumnsType<EmployeeType> = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },

    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = values => {
    console.log(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <CustomButton
        type='primary'
        style={{ width: 'fit-content' }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add
      </CustomButton>
      <Table
        dataSource={data}
        loading={isLoading}
        columns={columns}
        rowKey={record => record.id}
        onRow={record => {
          return {
            onClick: () => {
              navigate(`${Paths.employee}/${record.id}`);
            },
          };
        }}
      />

      <AddEmployeeModal
        onOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        error={error}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Employees;
