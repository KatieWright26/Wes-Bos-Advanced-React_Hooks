import PropTypes from 'prop-types';
import UpdateItem from '../components/UpdateItem';

export default function Update({ query }) {
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
}

Update.propTypes = {
  query: PropTypes.object,
};
