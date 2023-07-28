<script lang="ts">
  import Textfield from "@smui/textfield";
  import type { ZodFormattedError } from "zod";
  import type { GiftEditedObjectType } from "$lib/types";
  import LayoutGrid, { Cell, InnerGrid } from "@smui/layout-grid";
  import FormField from "@smui/form-field";
  import Switch from "@smui/switch";

  export let name: string;
  export let quantity: number;
  export let price: number;
  export let url: string;
  export let imageUrl: string;
  export let description: string;
  export let isVisible: boolean | undefined;

  export let errors: ZodFormattedError<GiftEditedObjectType> | null | undefined;
</script>

<InnerGrid style="width: 100%;">
  <Cell span={7} style="display: flex; height: 100%; width: 100%;">
    <InnerGrid>
      <Cell span={12}>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          class="shaped-filled"
          variant="filled"
          bind:value={name}
          label="Nome"
        />
        {#if errors && errors.name}
          <p class="error-message">
            {errors.name?._errors}
          </p>
        {/if}
      </Cell>
      <Cell span={5}>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          class="shaped-filled"
          type="number"
          variant="filled"
          bind:value={quantity}
          label="Qntd"
          suffix="unit."
          input$pattern="\d+"
        />
        {#if errors && errors.quantity}
          <p class="error-message">
            {errors.quantity?._errors}
          </p>
        {/if}
      </Cell>
      <Cell span={5}>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          class="shaped-filled"
          variant="filled"
          type="number"
          bind:value={price}
          label="Preço"
          prefix="R$"
          input$pattern={"\\d+(\\.\\d{2})?"}
        />
        {#if errors && errors.price}
          <p class="error-message">
            {errors.price?._errors}
          </p>
        {/if}
      </Cell>
      <Cell span={12}>
        <FormField>
          <small slot="label"> Ative para mostrar na lista pública</small>
          <Switch bind:checked={isVisible} />
        </FormField>
      </Cell>
      <Cell span={6}>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          class="shaped-filled"
          variant="filled"
          bind:value={imageUrl}
          label="URL Imagem"
          input$pattern="\d+"
        />
        {#if errors && errors.imageUrl}
          <p class="error-message">
            {errors.imageUrl?._errors}
          </p>
        {/if}
      </Cell>
      <Cell span={6}>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          class="shaped-filled"
          variant="filled"
          bind:value={url}
          label="Indique uma loja"
          input$pattern="\d+"
        />
        {#if errors && errors.url}
          <p class="error-message">
            {errors.url?._errors}
          </p>
        {/if}
      </Cell>
      <Cell span={12}>
        <Textfield
          style="width: 100%;"
          helperLine$style="width: 100%;"
          bind:value={description}
          label="Quer descrever algo de especial para esse presente?"
        />
        {#if errors && errors.description}
          <p class="error-message">
            {errors.description?._errors}
          </p>
        {/if}
      </Cell>
    </InnerGrid>
  </Cell>
  <Cell span={5} style="display: flex; height: 100%; width: 100%;">
    <Cell
      style="display: flex; justify-content:center; align-items:center; width: 100%;"
      span={12}
    >
      <img src={imageUrl} alt="" height="200" />
    </Cell>
  </Cell>
  <slot />
</InnerGrid>

<style>
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
