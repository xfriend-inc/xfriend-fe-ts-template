import type { GiftObjectType, GiftEditedObjectType } from '$lib/types';
import { writable } from 'svelte/store';
import ADD_GIFT_TO_WISHLIST from '../graphql/ADD_GIFT_TO_WISHLIST';
import REMOVE_GIFT_TO_WISHLIST from '../graphql/REMOVE_GIFT_TO_WISHLIST';
import UPDATE_GIFT_TO_WISHLIST from '../graphql/UPDATE_GIFT_TO_WISHLIST';
import { client } from './main';
import FIND_ALL_GIFT from '../graphql/FIND_ALL_GIFT';

export const gifts = writable<GiftObjectType[]>([] as GiftObjectType[]);

export async function addGift(added: GiftEditedObjectType) {
    try {
        const {
            data: { addGiftToWishlist },
        } = await client.mutate({
            mutation: ADD_GIFT_TO_WISHLIST,
            variables: added,
            fetchPolicy: 'no-cache',
        });

        return addGiftToWishlist;
    } catch (err) {
        return {};
    }
}

export async function removeGift(remove: GiftEditedObjectType) {
    try {
        const {
            data: { removeGiftToWishlist },
        } = await client.mutate({
            mutation: REMOVE_GIFT_TO_WISHLIST,
            variables: remove,
            fetchPolicy: 'no-cache',
        });

        return removeGiftToWishlist;
    } catch (err) {
        return {};
    }
}

export async function updateGift(edited: GiftEditedObjectType) {
    try {
        const {
            data: { updateGiftToWishlist },
        } = await client.mutate({
            mutation: UPDATE_GIFT_TO_WISHLIST,
            variables: edited,
            fetchPolicy: 'no-cache',
        });

        return updateGiftToWishlist;
    } catch (err) {
        return {};
    }
}

export async function getGift(wishlistId: string) {
    try {
        const {
            data: { findAllGiftToWishlist },
        } = await client.query({
            query: FIND_ALL_GIFT,
            variables: {
                wishlistId,
            },
            fetchPolicy: 'no-cache',
        });

        return gifts.set(findAllGiftToWishlist);
    } catch (err) {
        return gifts.set([]);
    }
}
