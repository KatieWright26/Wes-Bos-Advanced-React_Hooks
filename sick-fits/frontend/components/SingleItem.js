import React from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import { SINGLE_ITEM_QUERY } from './Queries';
import { SingleItemStyles } from './styles/SingleItemStyles';

export default function SingleItem({ id }) {
  return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id,
      }}
    >
      {({ error, loading, data }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for {id}</p>;
        const { item } = data;
        return (
          <SingleItemStyles>
            <Head>
              <title>Sick Fits | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
              <h2>Viewing {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </SingleItemStyles>
        );
      }}
    </Query>
  );
}

SingleItem.propTypes = {
  id: PropTypes.string,
};
