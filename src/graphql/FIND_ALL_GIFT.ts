import { gql } from '@apollo/client/core/index.js';

export default gql`
  query findAllGiftToWishlist($wishlistId: ID!) {
    findAllGiftToWishlist(wishlistId: $wishlistId) {
      id
      name
      quantity
      isVisible
      createdAt
      updatedAt
      userId
      wishlistId
      detailExtra {
        id
        description
        imageUrl
        url
        price
        createdAt
        updatedAt
        giftId
      }
    }
  }
`;
