import { gql } from '@apollo/client/core/index.js';

export default gql`
  mutation modifyWishlist(
    $description: String
    $title: String
    $isShared: Boolean
    $expirationAt: String
    $wishlistId: ID!
  ) {
    modifyWishlist(
      description: $description
      title: $title
      isShared: $isShared
      expirationAt: $expirationAt
      wishlistId: $wishlistId
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
