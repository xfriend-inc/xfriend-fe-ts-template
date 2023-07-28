import { gql } from '@apollo/client/core/index.js';

export default gql`
  mutation createWishlist(
    $title: String
    $description: String
    $expirationAt: String
  ) {
    createWishlist(
      title: $title
      description: $description
      expirationAt: $expirationAt
    ) {
      id
      title
      description
      isShared
      expirationAt
      createdAt
      updatedAt
      ownerId
    }
  }
`;
