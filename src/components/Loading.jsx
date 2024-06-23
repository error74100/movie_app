import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import './Loading.css';

function Loading() {
  return (
    <>
      <Container>
        <Row>
          <Col className="loading_wrap">
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Loading;
