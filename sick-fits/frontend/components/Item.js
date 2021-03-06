import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

export const Item = ({ item }) => (
  <ItemStyles>
    {item.image && <img src={item.image} alt={item.title} />}

    <Title>
      <Link
        href={{
          pathname: '/item',
          query: { id: item.id },
        }}
      >
        <a>{item.title}</a>
      </Link>
    </Title>
    <PriceTag>{formatMoney(item.price)}</PriceTag>
    <p>{item.description}</p>

    <div className="buttonList">
      <Link
        href={{
          pathname: 'update',
          query: { id: item.id },
        }}
      >
        <a>Edit ✏️</a>
      </Link>
      <button type="button">Add To Cart</button>
      <DeleteItem id={item.id}>Delete This Item</DeleteItem>
    </div>
  </ItemStyles>
);

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }),
};
