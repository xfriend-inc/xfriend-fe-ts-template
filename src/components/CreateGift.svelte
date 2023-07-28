<script lang="ts">
  import Button, { Label, Group } from "@smui/button";
  import FormGift from "./FormGift.svelte";
  import type { ZodFormattedError } from "zod";
  import type { CustomButtonEvent, GiftEditedObjectType } from "$lib/types";
  import validator from "$lib/utilities/validator";
  import { Cell, InnerGrid } from "@smui/layout-grid";
  import { onDestroy } from "svelte";

  export let wishlistId: string;
  let name = "";
  let quantity = 1;
  let price = 0;
  let url = "";
  let imageUrl = "";
  let description = "";
  let isVisible = false;
  let errors: ZodFormattedError<GiftEditedObjectType> | null | undefined;

  export let onCancel = () => {};
  export let onSubmit = ({}: GiftEditedObjectType) => {};

  function isValidDesableSubmit(edited: GiftEditedObjectType) {
    if (edited.name && edited.quantity) return false;

    return true;
  }

  function clearForm() {
    name = "";
    quantity = 1;
    price = 0;
    url = "";
    imageUrl = "";
    description = "";
    isVisible = false;

    errors = null;
  }

  async function handleSubmit(event: CustomButtonEvent) {
    event.preventDefault();

    const result = validator.giftForm({
      name,
      description,
      imageUrl,
      price,
      quantity,
      url,
    });

    if (!result.success) {
      errors = result.error.format();
    } else {
      await onSubmit({
        wishlistId,
        name,
        description,
        imageUrl,
        price,
        quantity,
        url,
      });

      clearForm();
    }
  }

  async function handleCancel(event: CustomButtonEvent) {
    event.preventDefault();

    clearForm();

    await onCancel();
  }

  onDestroy(() => {
    clearForm();
  });
</script>

<FormGift
  bind:name
  bind:quantity
  bind:price
  bind:url
  bind:imageUrl
  bind:description
  bind:isVisible
  {errors}
>
  <Cell span={12}>
    <Group style="width: 100%;">
      <Button
        style="width: 100%;"
        disabled={isValidDesableSubmit({
          name,
          quantity,
        })}
        variant="unelevated"
        class="button-shaped-notch"
        on:click={handleSubmit}
      >
        <Label>Salvar</Label>
      </Button>
      <Button
        style="width: 100%;"
        variant="outlined"
        class="button-shaped-notch"
        on:click={handleCancel}
      >
        <Label>Cancelar</Label>
      </Button>
    </Group>
  </Cell>
</FormGift>
