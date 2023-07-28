import { gql } from '@apollo/client/core/index.js';

export default gql`
  mutation updateGiftToWishlist(
    $description: String
    $imageUrl: String
    $name: String
    $isVisible: Boolean
    $price: Float
    $quantity: Int
    $url: String
    $wishlistId: ID!
    $giftId: ID!
  ) {
    updateGiftToWishlist(
      description: $description
      imageUrl: $imageUrl
      name: $name
      isVisible: $isVisible
      price: $price
      quantity: $quantity
      url: $url
      wishlistId: $wishlistId
      giftId: $giftId
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
