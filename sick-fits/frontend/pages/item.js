import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';

export default function Item({ query }) {
  return (
    <div>
      <SingleItem id={query.id} />
    </div>
  );
}

Item.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};
