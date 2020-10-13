<template>
<b-modal id="modal" hide-footer hide-header centered ref="modal">
  <div class="py-3">
    <slot></slot>
  </div>
  <div class="mt-3">
    <b-button block @click="hideModal()">閉じる</b-button>
  </div>
</b-modal>
</template>

<script>
  export default {
    methods: {
      hideModal() {
        this.$refs['modal'].hide()
      }
    }
  }
</script>

<style>
</style>
