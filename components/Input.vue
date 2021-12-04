<template>
  <input
    id="weight"
    v-model="information.weight"
    required
    class="form-control"
    :class="{'is-invalid': !validWeight(information.weight) && inputBlur.weightBlured }"
    @keypress="validateNumber"
    @blur="inputBlur.weightBlured = true"
  >
</template>

<script>
export default {

}
</script>

<style>

</style>
