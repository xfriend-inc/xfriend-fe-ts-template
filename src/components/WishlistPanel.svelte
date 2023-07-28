<script lang="ts">
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import type { GiftEditedObjectType, WishlistObjectType } from "$lib/types";
  import EditGift from "./EditGift.svelte";
  import { getGift, removeGift, updateGift, gifts } from "../stores/gift";
  import LinearProgress from "@smui/linear-progress";

  let selectedAccordion: { [key: string]: boolean } = {};
  export let wishlistItem: WishlistObjectType;

  let open = false;

  function clearGifts() {
    open = false;
    selectedAccordion = {};
    gifts.set([]);
  }

  async function handleGetAllGifts() {
    await getGift(wishlistItem.id);
  }

  async function handleUpdateGift(edited: GiftEditedObjectType) {
    await updateGift(edited);

    clearGifts();
  }

  async function handleDeleteGift(remove: GiftEditedObjectType) {
    await removeGift(remove);

    clearGifts();
  }

  function togglePanel(wishlistItemId: string) {
    if (isPanelOpen(wishlistItemId)) {
      selectedAccordion = { [wishlistItemId]: true };
    }
  }

  function isPanelOpen(wishlistItemId: string): boolean {
    return !!selectedAccordion[wishlistItemId];
  }
</script>

<Accordion>
  <Panel bind:open on:click={handleGetAllGifts}>
    <Header>
      {wishlistItem.title.toUpperCase()}
    </Header>
    <Content>
      <Accordion>
        <Header
          style="display: flex; align-items: center !important; gap: 1rem;"
        />
        <Content>
          {#if $gifts.length > 0}
            {#each $gifts as giftItem}
              <Panel
                bind:open={selectedAccordion[giftItem.id]}
                on:click={() => togglePanel(giftItem.id)}
              >
                <Header>
                  {giftItem.name}
                </Header>
                <Content>
                  <EditGift
                    {giftItem}
                    onSubmit={handleUpdateGift}
                    onExclude={handleDeleteGift}
                  />
                </Content>
              </Panel>
            {/each}
          {:else}
            <LinearProgress indeterminate />
          {/if}
        </Content>
      </Accordion>
    </Content>
    <Content>
      <slot />
    </Content>
  </Panel>
</Accordion>
