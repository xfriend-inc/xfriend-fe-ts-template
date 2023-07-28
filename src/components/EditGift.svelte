<script lang="ts">
  import Button, { Label, Group } from "@smui/button";
  import FormGift from "./FormGift.svelte";
  import type {
    CustomButtonEvent,
    GiftObjectType,
    GiftEditedObjectType,
  } from "$lib/types";
  import validator from "$lib/utilities/validator";
  import type { ZodFormattedError } from "zod";
  import { Cell } from "@smui/layout-grid";
  import { onDestroy } from "svelte";

  export let giftItem: GiftObjectType = {} as GiftObjectType;

  let name = giftItem.name || "";
  let quantity = giftItem.quantity || 1;
  let price = giftItem?.detailExtra?.price || 0;
  let url = giftItem?.detailExtra?.url || "";
  let imageUrl = giftItem?.detailExtra?.imageUrl || "";
  let description = giftItem?.detailExtra?.description || "";
  let isVisible = giftItem.isVisible || false;
  let errors: ZodFormattedError<GiftEditedObjectType> | null | undefined;
  let giftEdited: GiftEditedObjectType = {};

  export let onCancel = () => {};
  export let onSubmit = ({}: GiftEditedObjectType) => {};
  export let onExclude = ({}: GiftEditedObjectType) => {};

  function isValidDesableSubmit(edited: GiftEditedObjectType) {
    const validated: GiftEditedObjectType = {};

    if (edited.name && edited.name !== giftItem.name)
      validated.name = edited.name;
    if (
      edited.description &&
      edited.description !== giftItem.detailExtra.description
    )
      validated.description = edited.description;
    if (edited.price && edited.price !== giftItem.detailExtra.price)
      validated.price = edited.price;
    if (edited.quantity && edited.quantity !== giftItem.quantity)
      validated.quantity = edited.quantity;
    if (edited.url && edited.url !== giftItem.detailExtra.url)
      validated.url = edited.url;
    if (edited.imageUrl && edited.imageUrl !== giftItem.detailExtra.imageUrl)
      validated.imageUrl = edited.imageUrl;
    if (edited.isVisible !== giftItem.isVisible)
      validated.isVisible = edited.isVisible;

    const isDisable = Object.keys(validated).length === 0;

    if (!isDisable) {
      giftEdited = validated;
    }

    return isDisable;
  }

  function clearForm() {
    name = giftItem.name || "";
    quantity = giftItem.quantity || 0;
    price = giftItem?.detailExtra?.price || 0;
    url = giftItem?.detailExtra?.url || "";
    imageUrl = giftItem?.detailExtra?.imageUrl || "";
    description = giftItem?.detailExtra?.description || "";
    isVisible = giftItem.isVisible || false;

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
        ...giftEdited,
        price: Number(giftEdited.price),
        wishlistId: giftItem.wishlistId,
        giftId: giftItem.id,
      });

      clearForm();
    }
  }

  async function handleCancel() {
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
  <Cell align="bottom" span={12}>
    <Group  style="width: 100%;">

      <Button
      variant="unelevated"
      style="width: 100%;"
      disabled={isValidDesableSubmit({
        name,
        description,
        imageUrl,
        price,
        quantity,
        url,
        isVisible,
      })}
      class="button-shaped-notch"
      on:click={handleSubmit}
      >
      <Label>Salvar</Label>
    </Button>
    <Button
      style="width: 100%;"
      variant="outlined"
      disabled={isValidDesableSubmit({
        name,
        description,
        imageUrl,
        price,
        quantity,
        url,
        isVisible,
      })}
      class="button-shaped-notch"
      on:click={handleCancel}
    >
      <Label>Cancelar</Label>
    </Button>
    <Button
      style="width: 100%;"
      variant="outlined"
      class="button-shaped-notch"
      on:click={() =>
        onExclude({
          giftId: giftItem.id,
          wishlistId: giftItem.wishlistId,
        })}
    >
      <Label>Excluir</Label>
    </Button>
  </Group>
  </Cell>
</FormGift>
