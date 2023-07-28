import type { WishlistEditedObjectType, WishlistObjectType } from '$lib/types';
import { writable } from 'svelte/store';
import FIND_ALL_WISHLIST from '../graphql/FIND_ALL_WISHLIST';
import CREATE_WISHLIST from '../graphql/CREATE_WISHLIST';
import UPDATE_WISHLIST from '../graphql/UPDATE_WISHLIST';
import EXCLUDE_WISHLIST from '../graphql/EXCLUDE_WISHLIST';
import { client } from './main';

export const wishlists = writable<WishlistObjectType[]>(
  [] as WishlistObjectType[],
);

export async function findAllWishlists() {
    try {
        const { data } = await client.query({
            query: FIND_ALL_WISHLIST,
            fetchPolicy: 'no-cache',
        });

        const wishlistsAll: WishlistObjectType[] = data.findAllWishlist;

        wishlists.set(wishlistsAll);
    } catch (err) {
        wishlists.set([]);
    }
}

export async function createWishlist(added: WishlistEditedObjectType) {
    try {
        const { data } = await client.mutate({
            mutation: CREATE_WISHLIST,
            variables: added,
            fetchPolicy: 'no-cache',
        });

        const wishlistsAll: WishlistObjectType[] = data.findAllWishlist;

        wishlists.set([]);
    } catch (err) {
        wishlists.set([]);
    }
}

export async function updateWishlist(edited: WishlistEditedObjectType) {
    try {
        const { data } = await client.mutate({
            mutation: UPDATE_WISHLIST,
            variables: edited,
            fetchPolicy: 'no-cache',
        });

        const wishlistsAll: WishlistObjectType[] = data.findAllWishlist;

        wishlists.set([]);
    } catch (err) {
        wishlists.set([]);
    }
}

export async function excludeWishlist(del: WishlistEditedObjectType) {
    try {
        const { data } = await client.mutate({
            mutation: EXCLUDE_WISHLIST,
            variables: del,
            fetchPolicy: 'no-cache',
        });

        const wishlistsAll: WishlistObjectType[] = data.findAllWishlist;

        wishlists.set([]);
    } catch (err) {
        wishlists.set([]);
    }
}

