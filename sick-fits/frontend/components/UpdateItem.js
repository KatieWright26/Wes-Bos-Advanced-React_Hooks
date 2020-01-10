import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

function UpdateItem({ id }) {
  const { data, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  const [state, setState] = useState({});
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);

  const handleChange = e => {
    const { name, type, value } = e.target;
    const sanitizeValue = type === 'number' ? parseFloat(value) : value;
    setState({
      ...state,
      [name]: sanitizeValue,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  const update = async (e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id,
        ...state,
      },
    });
    console.log('updated');
  };

  return (
    <Form onSubmit={e => update(e, updateItem)}>
      <fieldset>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            defaultValue={data.item.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            defaultValue={data.item.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            defaultValue={data.item.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
}

UpdateItem.propTypes = {
  id: PropTypes.string,
};

export default UpdateItem;
