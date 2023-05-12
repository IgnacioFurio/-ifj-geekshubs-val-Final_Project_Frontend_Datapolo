import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const Cards = ({src, title, text, link, textLink}) => {
    return (
        <>
            <Card style={{ width: '18rem' }} className='d-flex justify-content-center my-3'>
            <Card.Img variant="top" src={src} />
            <Card.Body>
                <Card.Title className='font fw-bold'>{title}</Card.Title>
                <Card.Text>
                {text}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Link className='font fw-bold text-decoration-none cursor-pointer' onClick={link}>{textLink}</Card.Link>
            </Card.Body>
            </Card>
        </>
    );
}