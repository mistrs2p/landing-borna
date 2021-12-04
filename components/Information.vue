<template>
  <div class="information">
    <div class="header-text">
      <p class="header-text">
        می خوای از وضعیت بدنت با خبر بشی؟
      </p>
      <p class="header-text">
        همین الان فرم زیر رو پر کن!
      </p>
    </div>
    <div class="gender d-flex justify-content-between">
      <div class="d-table col-2">
        <p class="d-table-cell align-middle">
          جنسیت
        </p>
      </div>
      <div class="info-radio d-flex shadow">
        <input
          id="female"
          v-model="information.gender"
          name="gender"
          value="female"
          type="radio"
          class="d-none"
        >
        <label for="female" class="d-flex justify-content-between align-content-center">
          <span>خانم</span>
          <i class="icon-female" />
        </label>
      </div>
      <div class="info-radio d-flex shadow">
        <input
          id="male"
          v-model="information.gender"
          name="gender"
          value="male"
          type="radio"
          class="d-none"
        >
        <label for="male" class="d-flex justify-content-between">
          <span>آقا</span>
          <i class="icon-male" />
        </label>
      </div>
    </div>
    <div class="d-flex flex-column info">
      <div class="input">
        <input
          id="weight"
          v-model="information.weight"
          required
          class="form-control"
          :class="{'is-invalid': !validWeight(information.weight) && inputBlur.weightBlured }"
          maxlength="3"
          @keypress="validateNumber"
          @blur="inputBlur.weightBlured = true"
        >
        <label for="weight">وزن (کیلوگرم)</label>
        <div class="invalid-feedback">
          وزن بین 20 تا 200 کیلوگرم
        </div>
      </div>
      <div class="input">
        <input
          id="height"
          v-model="information.height"
          required
          class="form-control"
          :class="{'is-invalid': !validHeight(information.height) && inputBlur.heightBlured }"
          maxlength="3"
          @keypress="validateNumber"
          @blur="inputBlur.heightBlured = true"
        >
        <label for="height">قد (سانتی متر)</label>
        <div class="invalid-feedback">
          قد باید بین 100 تا 230 سانتیمتر باشد!
        </div>
      </div>
      <div class="input">
        <input
          id="age"
          v-model="information.age"
          required
          class="form-control"
          :class="{'is-invalid': !validAge(information.age) && inputBlur.ageBlured }"
          maxlength="2"
          @keypress="validateNumber"
          @blur="inputBlur.ageBlured = true"
        >
        <label for="age">سن (سال)</label>
        <div class="invalid-feedback">
          سن باید بین 20 تا 70 سال باشد!
        </div>
      </div>
      <div class="input">
        <input
          id="wrist"
          v-model="information.wrist"
          required
          class="form-control"
          :class="{'is-invalid': !validWrist(information.wrist) && inputBlur.wristBlured }"
          maxlength="2"
          @keypress="validateNumber"
          @blur="inputBlur.wristBlured = true"
        >
        <label for="wrist">دور مچ دست (سانتی متر)</label>
        <div class="invalid-feedback">
          دور مچ دست باید بین 5 تا 30 باشد!
        </div>
      </div>
      <div class="input">
        <input
          id="mobile-number"
          v-model="mobileNumber"
          required
          class="form-control"
          :class="{'is-invalid': !validMobile(mobileNumber) && inputBlur.mobileBlured }"
          placeholder="-----------"
          maxlength="11"
          @keypress="validateNumber"
          @keyup="zeroLead(mobileNumber)"
          @blur="inputBlur.mobileBlured = true"
        >
        <label for="mobile-number">شماره موبایل</label>
        <div class="invalid-feedback">
          شماره موبایل خود را به طور صحیح وارد کنید!
        </div>
      </div>
    </div>
    <Button @click.prevent="infoSubmit">
      ثبت و مشاهده گزارش
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Information',
  data () {
    return {
      information: {
        gender: 'female',
        weight: null,
        height: null,
        age: null,
        wrist: null,
        mobile: null,
        bmi: null
      },
      inputBlur: {
        genderBlured: false,
        weightBlured: false,
        heightBlured: false,
        ageBlured: false,
        wristBlured: false,
        mobileBlured: false
      },
      valid: false
    }
  },
  computed: {
    mobileNumber: {
      get () {
        return this.$store.getters['stepProgressBar/submitInformation'].mobile
      },
      set (value) {
        return this.$store.dispatch('stepProgressBar/updateMobile', value)
      }
    }
  },
  methods: {
    zeroLead (event) {
      if (event !== null) {
        const text = event.split('')
        if (text.length >= 2 && text[0] !== '0' && text[0] === '9') {
          text.unshift('0')
          this.mobileNumber = text.join('')
        }
      }
    },
    validateNumber (event) {
      const keyCode = event.keyCode
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault()
      }
    },
    validate () {
      const info = this.information
      if (this.validAge(info.age) && this.validWeight(info.weight) && this.validHeight(info.height) && this.validWrist(info.wrist) && this.validMobile(this.mobileNumber)) {
        this.information.mobile = this.mobileNumber
        this.valid = true
      }
    },
    validAge (age) {
      const regex = /^([2-6][0-9]|70)$/
      return regex.test(age)
    },
    validWeight (weight) {
      const regex = /^(2[0-9]|[3-9][0-9]|1[0-9]{2}|200)$/
      return regex.test(weight)
    },
    validHeight (height) {
      const regex = /^(10[0-9]|1[1-9][0-9]|2[0-2][0-9]|230)$/
      return regex.test(height)
    },
    validWrist (wrist) {
      const regex = /^([5-9]|[12][0-9]|30)$/
      return regex.test(wrist)
    },
    validMobile (mobile) {
      const regex = /[0][9][0-9][0-9]{8,8}$/g
      return regex.test(mobile)
    },
    infoSubmit () {
      this.inputBlur.genderBlured = true
      this.inputBlur.weightBlured = true
      this.inputBlur.heightBlured = true
      this.inputBlur.ageBlured = true
      this.inputBlur.wristBlured = true
      this.inputBlur.mobileBlured = true
      this.validate()
      if (this.valid) {
        // THIS IS WHERE YOU SUBMIT DATA TO SERVER
        const heightInMeter = this.information.height / 100
        const squaredHeight = Math.pow(heightInMeter, 2)
        this.bmi = Math.floor(this.information.weight / squaredHeight)
        this.$store.dispatch('stepProgressBar/submitInformation', this.information)
        this.$store.dispatch('stepProgressBar/bmiCalculate')
        this.$store.dispatch('stepProgressBar/setComponentName', 'PhysicalReport')
        this.valid = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .information {
    div.header-text {
      line-height: 0.5;
    }
    .gender {
      div {
        &:first-child {
          p {
            color: #835ec1;
          }
        }
      }
      .info-radio {
        background-color: #fff;
        display: block;
        margin: 10px 0;
        &, &>label {
          border-radius: 8px;
        }
        input {
          direction: ltr!important;;
        }
        label {
          padding: 5px;
          min-width: 100px;
          height: 40px;
          cursor: pointer;
          overflow: hidden;
          border: 1px solid #835ec1;
          position: relative;
          // text-align: center;
          transition: all .3s ease;
          & > * {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 15px;
          }
          span {
            padding: 5px;
            height: 100%;
            right: 0;
            line-height: 2;
            margin-right: 1em;
          }
          i {
            left: 0;
            padding: 2px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 1px solid #835ec1;
            color: #fff;
            background-color: #835ec1;
            transition: all .3s ease;
            margin-left: 0.5em;
            text-align: center;
            font-size: 18px;
          }
        }
        input:checked ~ label{
          color: #fff;
          background-color: #835ec1;
          border-color: #835ec1;
          i {
            color: #835ec1;
            background-color: #fff;
            border-color: #835ec1;
            transition: all .3s ease;
            &::before {
              visibility: visible;
            }
          }
        }
      }
    }
    .info {
      .input {
        position: relative;
        input {
          border-radius: 8px;
          margin-top: 10px;
          border: 1px solid #835ec1;
          text-align: center;
          transition: all .3s ease;
          &:focus {
            border-color: #835ec1;
            box-shadow: none;
          }
          &:focus + label, &:valid + label {
            color: #835ec1;
            font-size: 11px;
            top: 5%;
            background: rgba($color: #fff, $alpha: 1);
            border-radius: 10px;
            // -webkit-backdrop-filter: blur(10px);
            // backdrop-filter: blur(10px);
          }
        }
        label {
          position: absolute;
          cursor: text;
          z-index: 2;
          top: 18px;
          right: 10px;
          font-size: 12px;
          font-weight: bold;
          // background: rgba($color: #fff, $alpha: 0.8);
          padding: 0 10px;
          color: #999;
          transition: all .3s ease
        }
      }
      .info-submit {
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
  }
  .invalid-feedback {
    display: block!important;
    visibility: hidden!important;
    font-size: 10px;
    font-weight: 500;
  }
  .is-invalid~.invalid-feedback {
    visibility: visible!important;
  }
  .form-control.is-invalid {
    background-position: left calc(0.375em + 0.1875rem) center;
  }
  .genderActive {
    visibility: visible!important;
  }
</style>
