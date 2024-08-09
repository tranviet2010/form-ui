import { Col, Row } from 'antd';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import "./style.css"

function Home() {
    return (
        // <Container fluid className="d-flex vh-100">
        //     <Row className="m-auto w-100">
        //         <Col xs={12} md={6} lg={4} className="mx-auto" >
        //             <Button variant="primary" href='/child'>Thai nhi</Button>{' '}
        //             <Button variant="primary"  href='/adult'>Trẻ từ 0-20 tuổi</Button>{' '}
        //             <Button variant="primary" href='/mature'>Người lớn</Button>{' '}
        //         </Col>
        //     </Row>
        // </Container>


<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col span={24} style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Button className="custom-button" href='/child' type="primary">Thai nhi</Button>
        </Col>
        <Col span={24} style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Button className="custom-button" href='/adult' type="primary">Trẻ từ 0-20 tuổi</Button>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button className="custom-button" href='/mature' type="primary">Người lớn</Button>
        </Col>
      </Row>
    </div>
    );
}

export default Home;

