<template>
  <div class="borna-progress-bar my-3">
    <ul class="d-flex justify-content-between">
      <li
        v-for="(step, i) in steps"
        :key="i"
        :class="stepClass(i)"
        @click="toggleStep(i)"
      >
        <span class="step-text">
          {{ step.label }}
        </span>
        <span class="step-number">
          {{ i + 1 }}
        </span>
        <span class="fa fa-check" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StepProgressBar',
  data () {
    return {
    }
  },
  computed: {
    toggleStepActive () {
      return this.$store.getters['stepProgressBar/toggleStepActive']
    },
    steps () {
      return this.$store.getters['stepProgressBar/steps']
    },
    componentIndex () {
      return this.$store.getters['stepProgressBar/componentIndex']
    }
  },
  watch: {
    // componentIndex () {
    //   this.$store.dispatch('stepProgressBar/changeToggle', this.componentIndex)
    // }
  },
  mounted () {
  },
  methods: {
    toggleStep (i) {
      if (i > this.componentIndex || i === this.componentIndex) {
        this.$store.dispatch('stepProgressBar/setComponentIndex', this.componentIndex)
      } else if (i < this.componentIndex) {
        this.$store.dispatch('stepProgressBar/setComponentIndex', i)
      }
    },
    stepClass (i) {
      let result = `progress__step progress__step--${i + 1}`
      if (this.toggleStepActive === i) {
        return (result += ' progress__step--active')
      }
      if (i < this.toggleStepActive) {
        return (result += ' progress__step--complete')
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
  @use "sass:math";
  $height: 20px;
  $space: 10px;
  .borna-progress-bar {
    ul {
      list-style: none;
      font-size: 10px;
      font-weight: 600;
      position: relative;
      padding: 0;
      &::before {
        content: '';
        width: 100%;
        position: absolute;
        border-top: 2px dotted #835ec1;;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        z-index: 0;
      }
      li.progress__step {
        cursor: pointer;
        min-width: $height;
        height: $height;
        padding: 3px;
        border: 1px solid #835ec1;
        color: #835ec1;
        margin: 0 ($space - 2px);
        border-radius: math.div($height,2);
        position: relative;
        z-index: 10;
        background-color: #fff;
        text-align: center;
        transition: all 0.1s ease-in;
        span {
          font-size: 10px;
        }
        &.progress__step--active {
          color: #fff;
          background-color: #63547c;
          padding: 3px 10px;
          .step-text {
            display: block;
          }
          .step-number {
            display: none;
          }
        }
        &.progress__step--complete {
          color: #fff;
          background-color: #835ec1;
          .fa.fa-check {
            display: block;
          }
          .step-text {
            display: none;
          }
          .step-number {
            display: none;
          }
        }
        &:before {
          font-family: "Font Awesome 5 Pro";
          content: "\f536";
          display: inline-block;
          vertical-align: middle;
          font-weight: 500;
          font-size: 10px;
          position: absolute;
          color: #835ec1;;
          width: 10px;
          right: -9px;
          top: 53%;
          transform: translateY(-51%);
        }
        &:first-child {
          margin-right: 0;
          &::before {
            display: none;
            border: none;
          }
        }
        &:last-child {
          margin-left: 0;
          padding: 3px 10px;
          .step-text {
            display: block;
          }
          .step-number {
            display: none;
          }
          &::after {
            display: none;
            border: none;
          }
        }
        span {
          // display: block;
          min-width: 10px;
          min-height: 10px;
          text-align: center;
        }
      }
    }
    .step-text {
      display: none;
    }
    .step-number {
      // display: none;
      position: absolute;
      font-weight: 600;
      font-size: 12px!important;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .fa.fa-check {
      display: none;
    }
  }
</style>
