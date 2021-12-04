<template>
  <div class="statistical-report">
    <p>تا الان 965 نفر از هم سنو سالای تو، با دکتر کرمانی به تناسب اندام رسیدن</p>
    <Flickity class="main-carousel" :options="flickityOptions">
      <div class="carousel-cell" />
      <div class="carousel-cell" />
      <div class="carousel-cell" />
      <div class="carousel-cell" />
      <div class="carousel-cell" />
    </Flickity>
    <div class="textbox d-flex flex-column mt-2">
      <div class="text">
        <h4>بیماری های ناشی از چاقی</h4>
        <p>چاقی دلیل اکثر بیماری هاست و باعث میشه تو مراحل مختلف زندگیت به مشکل بخوری مثلا دیابت یکی از بیماری هاییست که بین چا ها رواج داره</p>
      </div>
      <div class="text">
        <h4>بیماری های ناشی از چاقی</h4>
        <p>چاقی دلیل اکثر بیماری هاست و باعث میشه تو مراحل مختلف زندگیت به مشکل بخوری مثلا دیابت یکی از بیماری هاییست که بین چا ها رواج داره</p>
      </div>
      <div class="text">
        <h4>بیماری های ناشی از چاقی</h4>
        <p>چاقی دلیل اکثر بیماری هاست و باعث میشه تو مراحل مختلف زندگیت به مشکل بخوری مثلا دیابت یکی از بیماری هاییست که بین چا ها رواج داره</p>
      </div>
      <div class="text">
        <h4>بیماری های ناشی از چاقی</h4>
        <p>چاقی دلیل اکثر بیماری هاست و باعث میشه تو مراحل مختلف زندگیت به مشکل بخوری مثلا دیابت یکی از بیماری هاییست که بین چا ها رواج داره</p>
      </div>
      <div class="text">
        <h4>بیماری های ناشی از چاقی</h4>
        <p>چاقی دلیل اکثر بیماری هاست و باعث میشه تو مراحل مختلف زندگیت به مشکل بخوری مثلا دیابت یکی از بیماری هاییست که بین چا ها رواج داره</p>
      </div>
    </div>
    <Button @click="userStatistic">
      تایید و مرحله بعد
    </Button>
  </div>
</template>

<script>
export default {
  name: 'StatisticalReport',
  components: {
  },
  data () {
    return {
      flickityOptions: {
        prevNextButtons: true,
        pageDots: false,
        wrapAround: true,
        groupCells: 1,
        autoPlay: true,
        rightToLeft: true,
        arrowShape: 'M 0 50 L 40 20 L 40 40 L 80 40 L 80 60 L 40 60 L 40 80 Z'
      }
    }
  },
  computed: {
  },
  methods: {
    userStatistic () {
      this.$store.dispatch('stepProgressBar/setComponentName', 'GetDiet')
    }
  }
}
</script>

<style lang="scss" scoped>
  .statistical-report {
    .textbox {
      max-height: 250px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #b9b1b1;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      .text {
        padding: 15px 10px 15px 0;
        h4 {
          font-size: 16px;
        }
        p {
          text-align: right;
          font-size: 14px;
        }
      }
    }
    .statistical-submit {
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

  .flickity {
    // background: #EEE;
  }

  .main-carousel {
    margin: 0 20px;
    .flickity-viewport {
      .flickity-slider {
        .carousel-cell {
          width: 50%;
          height: 150px;
          margin-right: 10px;
          background: #8C8;
          counter-increment: gallery-cell;
          &::after {
            display: block;
            text-align: center;
            content: counter(gallery-cell);
            line-height: 150px;
            font-size: 80px;
            color: white;
          }
        }
      }
    }
    .flickity-button {
      &.flickity-prev-next-button {
        padding: 50px;
        &.previous {
          left: -45px!important;
        }
        &.next {
          right: -45px!important;
        }
      }
    }
  }

</style>
