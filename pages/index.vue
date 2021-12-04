<template>
  <div>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <div class="container borna mt-2 px-0">
      <div class="row justify-content-center mx-0">
        <div class="col-10">
          <StepProgressBar />
        </div>
        <div ref="components" class="col-10 section">
          <keep-alive>
            <component
              :is="componentName"
            />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userFormInformation: true
    }
  },
  computed: {
    componentName () {
      return this.$store.getters['stepProgressBar/componentName']
    }
  }
}
</script>
<style lang="scss">
  @import url('~static/style/main.scss');
  $borna: #835ec1;
</style>
