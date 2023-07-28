import { gql } from '@apollo/client/core/index.js';

export default gql`
  mutation delWishlist(
    $wishlistId: ID!
  ) {
    delWishlist(
      wishlistId: $wishlistId
    ) {
      id
    }
  }
`;
