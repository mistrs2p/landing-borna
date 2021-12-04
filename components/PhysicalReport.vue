<template>
  <div class="physical">
    <p class="header-text">
      با توجه به شاخص BMI شما دارای {{ calculatedWeight }} کیلوگرم {{ calculatedWeightDetail }} هستید.
    </p>
    <div class="report d-flex justify-content-between">
      <div class="weight-degree col-7 d-flex flex-column align-items-start">
        <div
          v-for="(degree, i) in degrees"
          :key="i"
          :class="degree.class"
        >
          <div class="icon">
            <i :class="degree.icon" />
          </div>
          <div class="d-flex justify-content-between">
            <span>{{ degree.text }}</span>
            <span>{{ degree.bmi }}</span>
          </div>
        </div>
      </div>
      <div class="goal-info col-5 d-flex flex-column justify-content-between">
        <div class="goal-detail normalweight d-flex flex-column justify-content-center">
          <h4>وزن نرمال</h4>
          <p>{{ normalWeight }}</p>
        </div>
        <div class="goal-detail timetogoal d-flex flex-column justify-content-center">
          <h4>مدت زمان رسیدن به هدف</h4>
          <p>{{ Math.ceil(setGoalTime() / 30) }} ماه</p>
        </div>
      </div>
    </div>
    <p v-if="fat.hasFat" class="detail">
      وزن تو {{ weight }} کیلوگرم ({{ calculatedWeight }} کیلوگرم از وزنت چربیه)
    </p>
    <div class="physic-submit d-flex justify-content-around">
      <button class="btn stay">
        <span>بیخیال حال ندارم</span>
      </button>
      <Button @click="next">
        می خوام رژیم بگیرم
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhysicalReport',
  data () {
    return {
      degrees: [
        { class: 'highfat', bmi: '', text: 'چاقی مفرط', icon: 'icon-superfat' },
        { class: 'fat2', bmi: '', text: 'چاقی درجه 2', icon: 'icon-fat2' },
        { class: 'fat1', bmi: '', text: 'چاقی درجه 1', icon: 'icon-fat1' },
        { class: 'overweight', bmi: '', text: 'اضافه وزن', icon: 'icon-overweight' },
        { class: 'normal', bmi: '', text: 'نرمال', icon: 'icon-normal' },
        { class: 'underweight', bmi: '', text: 'کمبود وزن', icon: 'icon-normal' }
      ],
      age: null,
      height: null,
      weight: null,
      gender: null,
      coefficient: null,
      normalWeight: null,
      calculatedWeight: null,
      calculatedWeightDetail: null,
      fat: {
        text: 'چربیه',
        hasFat: false
      }
    }
  },
  computed: {
    information () {
      return this.$store.getters['stepProgressBar/submitInformation']
    }
  },
  activated () {
    const heightInMeter = this.information.height / 100
    const squaredHeight = Math.pow(heightInMeter, 2)
    const bmi = Math.floor(this.information.weight / squaredHeight)

    this.age = this.information.age
    this.height = this.information.height
    this.gender = this.information.gender
    this.weight = this.information.weight
    this.normalWeight = Math.floor(squaredHeight * (this.setWeightCoefficient(this.age, this.height, this.gender)))
    window.console.log('Coefficient: ', this.setWeightCoefficient(this.age, this.height, this.gender))
    window.console.log('BMI is: ', bmi)
    window.console.log('Normal Weight: ', this.normalWeight)
    if (this.weight > this.normalWeight) {
      this.calculatedWeight = this.weight - this.normalWeight
      this.calculatedWeightDetail = 'اضافه وزن'
      this.fat.hasFat = true
    } else {
      this.calculatedWeight = this.normalWeight - this.weight
      this.calculatedWeightDetail = 'کمبود وزن'
      this.fat.hasFat = false
    }

    if (bmi < 19) {
      this.degrees[5].bmi = 'BMI:' + bmi
    } else if (bmi >= 19 && bmi < 25) {
      this.degrees[4].bmi = 'BMI:' + bmi
    } else if (bmi >= 25 && bmi < 30) {
      this.degrees[3].bmi = 'BMI:' + bmi
    } else if (bmi >= 30 && bmi < 35) {
      this.degrees[2].bmi = 'BMI:' + bmi
    } else if (bmi >= 35 && bmi < 40) {
      this.degrees[1].bmi = 'BMI:' + bmi
    } else if (bmi >= 40) {
      this.degrees[0].bmi = 'BMI:' + bmi
    }
  },
  deactivated () {
    let i = 0
    for (i; i < this.degrees.length; i++) {
      this.degrees[i].bmi = null
    }
  },
  methods: {
    next () {
      this.$store.dispatch('stepProgressBar/setComponentName', 'Goal')
    },
    setWeightCoefficient (age, height, gender) {
      if (age < 16) {
        switch (age) {
          case ((age >= 10 && age < 12)) && height <= 165:
            this.coefficient = age + 8
            break
          case ((age >= 12 && age < 16)) && height <= 165:
            this.coefficient = age + 5
            break
          case ((age >= 10 && age < 16)) && height > 165:
            switch (gender) {
              case 'female':
                this.coefficient = 20.8
                break
              case 'male':
                this.coefficient = 23.3
                break
            }
            break
          default:
            this.coefficient = age + 8
            break
        }
      } else {
        switch (gender) {
          case 'female':
            switch (true) {
              case (age >= 16 && age < 31):
                this.coefficient = 20.8
                break
              case (age >= 31 && age < 40):
                this.coefficient = 22.5
                break
              case (age >= 40 && age < 45):
                this.coefficient = 24.1
                break
              case (age >= 45):
                this.coefficient = 25.4
                break
              default:
                this.coefficient = 0
                break
            }
            break
          case 'male':
            switch (true) {
              case (age >= 16 && age < 31):
                this.coefficient = 23.3
                break
              case (age >= 31 && age < 45):
                this.coefficient = 24.8
                break
              case (age >= 45):
                this.coefficient = 25
                break
              default:
                this.coefficient = 0
                break
            }
            break
          default:
            this.coefficient = 0
            break
        }
      }
      return this.coefficient
    },
    setGoalTime () {
      const weightDifference = Math.abs(this.weight - this.normalWeight)
      let time1 = null
      let time2 = null
      let time3 = null
      // Calculate time1
      if (this.weight > 100) {
        time1 = (this.weight - 100) / 4
      } else if (this.weight < 100 && this.normalWeight > 100) {
        time1 = weightDifference / 4
      }
      // Calculate time2
      if (this.weight > 100 && this.normalWeight <= 70) {
        time2 = (100 - 70) / 3.5
      } else if (this.weight > 100 && this.normalWeight > 70) {
        time2 = (this.normalWeight - 70) / 3.5
      } else if (this.weight <= 100 && this.weight > 70 && this.normalWeight > 70) {
        time2 = (weightDifference / 3.5)
      } else if (this.weight <= 100 && this.weight > 70 && this.normalWeight <= 70) {
        time2 = (this.weight - 70) / 3.5
      }
      // Calculate time3
      if (this.normalWeight > 70) {
        time3 = 0
      } else if (this.weight <= 70) {
        time3 = weightDifference / 3
      } else if (this.weight > 70) {
        time3 = (70 - this.normalWeight) / 3
      }

      const goalTime = Math.floor((time1 + time2 + time3) * 30)
      return goalTime
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    text-align: center;
  }
  .physical {
    p.header-text {
      font-weight: 500;
      font-size: 14px;
      text-align: center;
    }
    .report {
      .weight-degree {
        & > div {
          height: 40px;
          position: relative;
          display: flex;
          margin: 5px;
          border-radius: 8px;
          overflow: hidden;
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
          &.highfat {
            background-color: #FF3A61;
          }
          &.fat1 {
            background-color: #FF7224;
          }
          &.fat2 {
            background-color: #FFDD00;
          }
          &.overweight {
            background-color: #BDD302;
          }
          &.normal {
            background-color: #01C114;
          }
          &.underweight {
            background-color: #D142F5;
          }
          span {
            color: #fff;
            font-size: 13px;
            line-height: 3;
            &:first-child {
              width: 65px;
            }
            &:last-child {
              margin-right: 6px;
              padding-left: 3px;
              overflow: visible;
              // font-size: 10px;
            }
          }
          div.icon {
            border-radius: 100% 0 0 100%;
            width: 25px;
            background-color: rgba($color: #fff, $alpha: 0.3);
            margin-left: 5px;
            line-height: 2.5;
            position: relative;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            i{
              font-size: 2rem;
              color: #fff;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .goal-info {
        div.goal-detail {
          height: 45%;
          border-radius: 8px;
          border: 1px solid rgba($color: #000000, $alpha: 0.4);
          padding: 5px;
          h4 {
            text-align: center;
            word-wrap: break-word;
            color: rgba($color: #000000, $alpha: 0.4);
            font-size: 16px;
            font-weight: 800;
          }
          p {
            text-align: center;
            font-size: 28px;
          }
        }
      }
    }
    .detail {
      margin-top: 20px;
    }
    .physic-submit {
      button {
        margin-top: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        min-width: 30%;
        & > * {
          font-size: 13px;
          font-weight: 400;
        }
        &.stay {
          background-color: rgba($color: #000000, $alpha: 0.2);
          margin-left: 1rem;
        }
        &.next {
          background-color: #5CB85C;
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
    }
  }
</style>
