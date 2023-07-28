<script lang="ts">
  import LayoutGrid, { Cell, InnerGrid } from "@smui/layout-grid";
  import Textfield from "@smui/textfield";
  import Fab from "@smui/fab";
  import HelperText from "@smui/textfield/helper-text";
  import Paper, { Title, Subtitle, Content } from "@smui/paper";
  import type { WishlistEditedObjectType } from "$lib/types";
  import { findAllWishlists, createWishlist } from "../stores/wishlist";

  async function handleCreateWishlist(added: WishlistEditedObjectType) {
    await createWishlist(added);
    await findAllWishlists();
  }

  function isValidDesableSubmit(edited: WishlistEditedObjectType) {
    return !(edited.title && edited.expirationAt);
  }

  let title = "";
  let expirationAt = "";
</script>

<LayoutGrid style="display: flex; justify-content: center;">
  <Cell span={12}>
    <div class="paper-container">
      <Paper>
        <Title>Desejos</Title>
        <Subtitle>Crie sua lista.</Subtitle>
        <Content>
          <InnerGrid>
            <Cell span={6}>
              <Textfield
                style="width: 100%;"
                variant="filled"
                bind:value={title}
              >
                <HelperText persistent slot="helper"
                  >Dê o nome para sua lista</HelperText
                >
              </Textfield>
            </Cell>
            <Cell span={5}>
              <Textfield
                style="width: 100%;"
                type="date"
                variant="filled"
                bind:value={expirationAt}
              >
                <HelperText persistent slot="helper"
                  >Até quando é valido</HelperText
                >
              </Textfield>
            </Cell>
            <Cell span={1}>
              <Fab
                on:click={() =>
                  handleCreateWishlist({
                    title,
                    expirationAt,
                  })}
                disabled={isValidDesableSubmit({
                  title,
                  expirationAt,
                })}
              >
                <div
                  style="display: flex; width: 100%; font-size: 3rem; align-items: center; justify-content:center"
                >
                  +
                </div>
              </Fab>
            </Cell>
          </InnerGrid>
        </Content>
      </Paper>
    </div>
  </Cell>
  <Cell span={12}>
    <slot />
  </Cell>
</LayoutGrid>
