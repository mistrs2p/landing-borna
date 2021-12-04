<template>
  <div class="goal d-flex flex-column justify-content-between">
    <div class="d-flex flex-column">
      <h4><span />هدفت از رژیم گرفتن چیه؟</h4>
      <div v-for="(item, index) in checkbox" :key="index" class="goal-checkbox">
        <input :id="item.id" :name="item.id" type="checkbox" class="d-none">
        <label :for="item.id">
          <i class="fa fa-check" />
          <span>{{ item.text }}</span>
        </label>
      </div>
    </div>
    <Button @click="userGoal">
      نمایش آمار
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Goal',
  data () {
    return {
      checkbox: [
        { text: 'سلامتی', id: 'healthy' },
        { text: 'جوان شدن', id: 'young' },
        { text: 'زیبایی', id: 'beauty' },
        { text: 'جلوگیری از خطر بیماری', id: 'healthcare' },
        { text: 'اعتماد به نفس', id: 'confidence' }
      ]
    }
  },
  methods: {
    userGoal () {
      this.$store.dispatch('stepProgressBar/setComponentName', 'StatisticalReport')
    }
  }
}
</script>

<style scoped lang="scss">
.goal {
  h4 {
    color: rgba($color: #000000, $alpha: 0.6);
    font-size: 16px;
    font-weight: 800;
    span {
      width: 20px;
      height: 12px;
      background: #000;
      border-radius: 10px;
      display: inline-block;
      margin-left: 5px;
    }
  }
  .goal-checkbox {
    background-color: #fff;
    display: block;
    // margin: px 0;
    position: relative;
    label {
      font-size: 14px;
      padding: 10px 30px;
      height: 40px;
      width: 100%;
      cursor: pointer;
      overflow: hidden;
      border-radius: 8px;
      margin-top: 20px;
      border: 1px solid rgba($color: #000000, $alpha: 0.7);
      // text-align: center;
      transition: all .3s ease;
      display: flex;
      i {
        width: 20px;
        height: 20px;
        padding: 3px;
        border-radius: 50%;
        border: 1px solid rgba($color: #000000, $alpha: 0.7);
        color: #5CB85C;
        background-color: #fff;
        margin-left: 1rem;
        transition: all .3s ease;
        font-size: 12px;
        font-weight: 500;
        &::before {
          visibility: hidden;
        }
      }
      span {
        font-size: 12px;
      }
    }
    input:checked ~ label{
      color: #5CB85C;
      border-color: #5CB85C;
      i {
        color: #fff;
        background-color: #5CB85C;
        border-color: #5CB85C;
        transition: all .3s ease;
        &::before {
          visibility: visible;
        }
      }
    }
  }
  .goal-submit {
    background-color: #5CB85C;
    margin-top: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
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
}

</style>
