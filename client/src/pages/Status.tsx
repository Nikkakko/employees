import { Button, Result, Row } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Paths } from '../Paths';

const Statuses: Record<string, string> = {
  created: 'Employee created successfully',
  updated: 'Employee updated successfully',
  deleted: 'Employee deleted successfully',
};

const Status = () => {
  const { status } = useParams<{ status: string }>();
  return (
    <Row align='middle' justify='center'>
      <Result
        status={status ? 'success' : 404}
        title={
          status ? Statuses[status as keyof typeof Statuses] : 'Page not found'
        }
        extra={
          <Button
            type='dashed'
            shape='round'
            size='large'
            style={{ marginTop: '20px' }}
          >
            <Link to={Paths.home}>Back Home</Link>
          </Button>
        }
      />
    </Row>
  );
};

export default Status;
