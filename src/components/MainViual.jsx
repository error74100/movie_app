import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import './MainViual.css';
import { useEffect, useState } from 'react';
import Loading from './Loading';

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
const imageUrl = 'https://image.tmdb.org/t/p/original';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGZkNzE2MjA0OTRhNGIxMGZiMWNhMzc3YTU4YTQyYyIsIm5iZiI6MTcxOTAzODk1OC4wMjczODcsInN1YiI6IjY2NzU3NWVhMTJkMDBkOWNkNTViNDE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yLFzJTL8jZPrKsfaiw_36Z0rjS7m4GeKzPSnnK7Kmpw',
  },
};

function MainViual() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
        setIsLoading(false);
      })
      .catch((err) => console.error('error:' + err));
  }, []);

  const viualRandomImage = Math.floor(Math.random() * movies.length);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="viual_bg_wrap"
        style={{
          backgroundImage: `url(${imageUrl}${movies[viualRandomImage].backdrop_path})`,
        }}
      >
        <Container className="txt_box">
          <Row>
            <Col>
              <Stack gap={3}>
                <div className="p-2 title">themoviedb API Example</div>
                <div className="p-2">
                  https://www.themoviedb.org/
                  <br />
                  연습 싸이트 입니다.
                </div>
              </Stack>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default MainViual;
