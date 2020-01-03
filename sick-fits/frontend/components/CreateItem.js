import React from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import { useForm } from '../hooks/useForm';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
      id
    }
  }
`;

export default function CreateItem() {
  const initialValues = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  const [values, handleChange] = useForm(initialValues);
  const [createItem] = useMutation(CREATE_ITEM_MUTATION);
  const router = useRouter();

  const uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'ddl35kq6');
    const res = await fetch('https://api.cloudinary.com/v1_1/du3mknohf/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    handleChange({
      target: { name: 'image', value: file.secure_url },
    });
    handleChange({
      target: { name: 'largeImage', value: file.eager[0].secure_url },
    });
  };
  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        const res = await createItem({
          variables: values,
        });
        router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id },
        });
      }}
    >
      <fieldset>
        <label htmlFor="file">
          Image
          <input type="file" id="file" name="file" placeholder="Upload an image" required onChange={uploadFile} />
          {values.image && <img width="200" src={values.image} alt="Upload Preview" />}
        </label>
      </fieldset>

      <fieldset>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={values.title}
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
            value={values.price}
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
            value={values.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}
