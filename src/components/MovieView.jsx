import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import './MovieList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const fetch = require('node-fetch');

const imageUrl = 'https://image.tmdb.org/t/p/w500';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGZkNzE2MjA0OTRhNGIxMGZiMWNhMzc3YTU4YTQyYyIsIm5iZiI6MTcxOTExNjMxOS44MjI2OTIsInN1YiI6IjY2NzU3NWVhMTJkMDBkOWNkNTViNDE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jkBlyEzdOdmd500f2HKZ5QsrOcXV0Z05wi-OP4mJ6cU',
  },
};

const getMovieUrl = (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KO`;

  return url;
};

function MovieView({ id }) {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    fetch(getMovieUrl(id), options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setIsLoading(false);
      })
      .catch((err) => console.error('error:' + err));
  }, [id]);

  const onClickList = () => {
    nav('/');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container style={{ padding: '80px 0 0', textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>
        <Row className="justify-content-md-center">
          <Col xs lg="12">
            Movie Details
          </Col>
        </Row>
      </Container>

      <Container style={{ padding: '50px 0 50px', textAlign: 'center' }}>
        <Row>
          <Col>
            <img src={`${imageUrl}${movies.poster_path}/`} alt="" />
          </Col>
        </Row>
        <Row>
          <Col className="h2_type">{movies.title}</Col>
        </Row>
        <Row>
          <Col style={{ padding: '0 0 50px' }}>{movies.overview}</Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <colgroup>
              <col style={{ width: '33.33%' }}></col>
              <col style={{ width: '33.33%' }}></col>
              <col style={{ width: '*' }}></col>
            </colgroup>
            <thead>
              <tr>
                <th>유형</th>
                <th>개봉일</th>
                <th>평점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {movies.genres.map((item, idx) => (
                    <span key={idx}>{item.name} / </span>
                  ))}
                </td>
                <td>{movies.release_date}</td>
                <td>{movies.vote_average}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>

      <Container style={{ padding: '50px 0 50px' }}>
        <Row>
          <Stack direction="horizontal" gap={0}>
            <div className="p-2 ms-auto">
              <Button variant="primary" onClick={onClickList}>
                List
              </Button>
            </div>
          </Stack>
        </Row>
      </Container>
    </>
  );
}

export default MovieView;
