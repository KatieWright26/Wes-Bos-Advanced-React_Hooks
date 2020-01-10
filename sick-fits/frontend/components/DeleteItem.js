import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { ALL_ITEMS_QUERY } from './Queries';
import { DELETE_ITEM_MUTATION } from './Mutations';

export default function DeleteItem({ id, children }) {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    update(cache, payload) {
      const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
      const items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
      cache.writeQuery({ query: ALL_ITEMS_QUERY, data: { items } });
    },
  });

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItem({ variables: { id } });
        }
      }}
    >
      {children}
    </button>
  );
}

DeleteItem.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
};
