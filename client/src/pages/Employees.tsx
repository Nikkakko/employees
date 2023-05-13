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

const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const { user } = useAppSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [navigate, user]);

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

      <AddEmployeeModal onOpen={isModalOpen} onCancel={handleCancel} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Employees;
