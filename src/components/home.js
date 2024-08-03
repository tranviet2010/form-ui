import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
function Home() {
    return (
        <Container fluid className="d-flex vh-100">
            <Row className="m-auto w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto" >
                    <Button variant="primary" href='/child'>Thai nhi</Button>{' '}
                    <Button variant="primary"  href='/adult'>Trẻ từ 0-20 tuổi</Button>{' '}
                    <Button variant="primary" href='/mature'>Người lớn</Button>{' '}
                </Col>
            </Row>
        </Container>
    );
}

export default Home;

