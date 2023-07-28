<script lang="ts">
  import Dialog, { Content, Header, Title } from "@smui/dialog";
  export let open: boolean;
  export let title: string;
</script>

<Dialog
  bind:open
  fullscreen
  aria-labelledby="fullscreen-title"
  aria-describedby="fullscreen-content"
  ><Header>
    <Title id="simple-title">{title}</Title>
  </Header>
  <Content id="simple-content">
    <slot />
  </Content>
</Dialog>
