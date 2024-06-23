import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MovieList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGZkNzE2MjA0OTRhNGIxMGZiMWNhMzc3YTU4YTQyYyIsIm5iZiI6MTcxOTExNjMxOS44MjI2OTIsInN1YiI6IjY2NzU3NWVhMTJkMDBkOWNkNTViNDE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jkBlyEzdOdmd500f2HKZ5QsrOcXV0Z05wi-OP4mJ6cU',
  },
};

function MovieList() {
  const [movies, setMovies] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
      })
      .catch((err) => console.error('error:' + err));
  }, []);

  const onClickDetail = (id) => {
    nav(`/view/${id}`);
  };

  return (
    <>
      <Container style={{ padding: '80px 0 0', textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>
        <Row className="justify-content-md-center">
          <Col xs lg="12">
            Popular Movie Lists
          </Col>
        </Row>
      </Container>

      <Container style={{ padding: '50px 0 50px' }}>
        <Row>
          <ul className="movie_list_wrap">
            {movies.map((movie) => (
              <li key={movie.id}>
                <Card>
                  <Card.Img variant="top" src={`${imageUrl}${movie.poster_path}`} />
                  <Card.Body>
                    <Card.Title className="ellipsis">{movie.title}</Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => {
                        onClickDetail(movie.id);
                      }}
                    >
                      자세히 보기 &gt;
                    </Button>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </Row>
      </Container>
    </>
  );
}

export default MovieList;
