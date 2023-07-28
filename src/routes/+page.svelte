<script lang="ts">
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  import Button, { Group, Label } from "@smui/button";
  import CreateGift from "../components/CreateGift.svelte";
  import { Cell, InnerGrid } from "@smui/layout-grid";
  import { addGift } from "../stores/gift";
  import LinearProgress from "@smui/linear-progress";
  import {
    wishlists,
    updateWishlist,
    excludeWishlist,
    findAllWishlists,
  } from "../stores/wishlist";
  import type {
    GiftEditedObjectType,
    WishlistEditedObjectType,
  } from "$lib/types";
  import Paper, { Title as PaperTitle, Subtitle, Content } from "@smui/paper";
  import WishlistPanel from "../components/WishlistPanel.svelte";
  import Modal from "../components/Modal.svelte";

  let open = false;

  function handleModal() {
    open = false;
  }

  async function handleUpdateWishlist(edited: WishlistEditedObjectType) {
    await updateWishlist(edited);
    await findAllWishlists();
  }

  async function handleDelWishlist(del: WishlistEditedObjectType) {
    await excludeWishlist(del);
    await findAllWishlists();
  }

  async function handleCreateGift(added: GiftEditedObjectType) {
    handleModal();

    await addGift(added);
    await findAllWishlists();
  }

  async function handleCancelGift() {
    handleModal();
  }
</script>

<div class="accordion-container">
  <Paper>
    <PaperTitle>Lista de desejos</PaperTitle>
    <Subtitle>Todas as listas que você tem</Subtitle>
    <Content>
      {#if $wishlists.length > 0}
        {#each $wishlists as wishlistItem}
          <Modal bind:open title="Adicione presente a lista">
            <CreateGift
              bind:wishlistId={wishlistItem.id}
              onSubmit={handleCreateGift}
              onCancel={handleCancelGift}
            />
          </Modal>
          <WishlistPanel {wishlistItem}>
            <InnerGrid>
              <Cell span={6}>
                <FormField>
                  <Switch
                    bind:checked={wishlistItem.isShared}
                    on:click={() =>
                      handleUpdateWishlist({
                        wishlistId: wishlistItem.id,
                        isShared: !wishlistItem.isShared,
                      })}
                  />
                  <span slot="label">
                    Liberar lista publica, <small style="opacity: .4;"
                      >http://localhost.com</small
                    >
                  </span>
                </FormField>
              </Cell>
              <Cell span={6}>
                <Group style="width: 100%;">
                  <Button
                    style="width: 100%;"
                    on:click={() => (open = true)}
                    variant="unelevated"
                    class="button-shaped-notch"
                  >
                    <Label>Adicionar</Label>
                  </Button>
                  <Button
                    style="width: 100%;"
                    on:click={() =>
                      handleDelWishlist({
                        wishlistId: wishlistItem.id,
                      })}
                    variant="outlined"
                    class="button-shaped-notch"
                  >
                    <Label>Delete</Label>
                  </Button>
                </Group>
              </Cell>
            </InnerGrid>
          </WishlistPanel>
        {/each}
      {:else}
        <LinearProgress indeterminate />
      {/if}
    </Content>
  </Paper>
</div>

<style>
  * :global(.solo-input) {
    flex-grow: 1;
    color: var(--mdc-theme-on-surface, #000);
  }
  * :global(.solo-input::placeholder) {
    color: var(--mdc-theme-on-surface, #000);
    opacity: 0.6;
  }
</style>
