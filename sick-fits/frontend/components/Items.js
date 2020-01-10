import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Item } from './Item';
import { ALL_ITEMS_QUERY } from './Queries';
import { Center, ItemsList } from './styles/ListStyles';

export default function Items() {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Center>
      <ItemsList>
        {data.items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ItemsList>
    </Center>
  );
}
