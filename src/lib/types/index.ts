import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export interface GiftDetailObjectType {
  id: string;
  description: string;
  imageUrl: string;
  url: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface GiftObjectType {
  id: string;
  name: string;
  quantity: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  wishlistId: string;
  detailExtra: GiftDetailObjectType;
}

export interface GiftEditedObjectType {
  name?: string;
  quantity?: number;
  isVisible?: boolean;
  description?: string;
  imageUrl?: string;
  url?: string;
  price?: number;
  wishlistId?: string;
  giftId?: string;
}

export interface WishlistEditedObjectType {
  title?: string;
  isShared?: boolean;
  description?: string;
  expirationAt?: string;
  wishlistId?: string;
}

export interface WishlistObjectType {
  id: string;
  title: string;
  description: string;
  isShared: boolean;
  shareUrl: string;
  expirationAt: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  items: GiftObjectType[];
}

export interface WishlistsData {
  findAllWishlist: WishlistObjectType[];
}
export interface GiftData {
  updateGiftToWishlist: GiftObjectType;
}

export interface CustomButtonEvent extends Event {}

export interface WishlistsInput {
  wishlists: WishlistObjectType[] | [];
}
