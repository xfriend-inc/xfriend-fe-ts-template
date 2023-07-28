import { gql } from '@apollo/client/core/index.js';

export default gql`
  query findAllWishlist {
    findAllWishlist {
      id
      title
      description
      isShared
      expirationAt
      createdAt
      updatedAt
      ownerId
      items {
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
  }
`;
