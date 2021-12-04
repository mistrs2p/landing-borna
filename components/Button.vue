<template>
  <button class="btn shadow" v-on="$listeners">
    <span>
      <slot />
    </span>
    <i class="fa fa-check" />
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  button {
    background-color: #5CB85C;
    margin-top: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    width: 100%;
    & > * {
      font-size: 13px;
      font-weight: 400;
    }
    span {
      color: #fff;
      margin-left: 1rem;
    }
    i {
      padding: 5px;
      border-radius: 50%;
      color: #5CB85C;
      background-color: #fff;
    }
  }
</style>
