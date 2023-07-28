import { gql } from '@apollo/client/core/index.js';

export default gql`
  mutation removeGiftToWishlist(
    $wishlistId: ID!
    $giftId: ID!
  ) {
    removeGiftToWishlist(
      wishlistId: $wishlistId
      giftId: $giftId
    ) {
      id
      }
  }
`;
