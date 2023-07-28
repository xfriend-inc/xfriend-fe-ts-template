import { gql } from '@apollo/client/core/index.js';

export default gql`
  mutation addGiftToWishlist(
    $description: String
    $imageUrl: String
    $name: String!
    $price: Float
    $quantity: Int!
    $url: String
    $wishlistId: ID!
  ) {
    addGiftToWishlist(
      description: $description
      imageUrl: $imageUrl
      name: $name
      price: $price
      quantity: $quantity
      url: $url
      wishlistId: $wishlistId
    ) {
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
