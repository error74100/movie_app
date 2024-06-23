import MovieView from '../components/MovieView';
import { useParams } from 'react-router-dom';

function View() {
  const param = useParams();

  return (
    <>
      <MovieView id={param.id} />
    </>
  );
}

export default View;
