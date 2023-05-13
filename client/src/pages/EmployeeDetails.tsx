import { useState } from 'react';

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  useDeleteEmployeeMutation,
  useGetEmployeeByIdQuery,
} from '../app/services/employees';
import { useAppSelector } from '../app/hook';
import { Descriptions, Divider, Modal, Space, Spin } from 'antd';
import { CustomButton } from '../components';
import { Paths } from '../Paths';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ErrorMsg from '../components/ErrorMsg';
import { isErrorWithMessage } from '../utils/errorMessage';

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetEmployeeByIdQuery(id || '');
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await deleteEmployee(data?.id as string).unwrap();
      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      console.log(err);
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  if (isLoading) {
    return (
      <Spin
        size='large'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      />
    );
  }

  if (!data) {
    return <Navigate to='/' />;
  }

  return (
    <Container>
      <CustomButton
        type='primary'
        onClick={() => navigate('/')}
        shape='round'
        icon={<ArrowLeftOutlined />}
        style={{ width: 'fit-content', marginBottom: '20px' }}
      >
        Back
      </CustomButton>
      <Descriptions title='Employee Details' bordered={true}>
        <Descriptions.Item label='Name' span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label='Age' span={3}>
          {data?.age}
        </Descriptions.Item>
        <Descriptions.Item label='Address' span={3}>
          {data?.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.user.id === data?.userId && (
        <>
          <Divider orientation='left'>Actions</Divider>
          <Space
            style={{
              marginBottom: '20px',
            }}
          >
            <CustomButton
              type='default'
              onClick={() => navigate(`${Paths.employeeEdit}/${data.id}`)}
              shape='round'
              icon={<EditOutlined />}
            >
              Edit
            </CustomButton>
            <CustomButton
              shape='round'
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Delete
            </CustomButton>
          </Space>
        </>
      )}

      <ErrorMsg message={error} />
      <Modal
        title='Confirm Delete'
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText='
        
        Delete'
        cancelText='Cancel'
      >
        Do you want to delete this employee?
      </Modal>
    </Container>
  );
};

const Container = styled.div``;

export default EmployeeDetails;
