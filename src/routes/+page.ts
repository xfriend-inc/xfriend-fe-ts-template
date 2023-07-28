import { findAllWishlists } from '../stores/wishlist';

export async function load() {
    await findAllWishlists();
}
