<template>
  <div class="diet">
    <div class="d-flex flex-column info">
      <div class="input">
        <input
          id="firstName"
          v-model="information.firstName"
          required
          class="form-control"
          :class="{'is-invalid': !validName(information.firstName) && inputBlur.firstNameBlured }"
          maxlength="20"
          @blur="inputBlur.firstNameBlured = true"
        >
        <label for="firstName">نام</label>
        <div class="invalid-feedback">
          نام خود را به درستی وارد کنید!
        </div>
      </div>
      <div class="input">
        <input
          id="lastName"
          v-model="information.lastName"
          required
          class="form-control"
          :class="{'is-invalid': !validName(information.lastName) && inputBlur.lastNameBlured }"
          maxlength="20"
          @blur="inputBlur.lastNameBlured = true"
        >
        <label for="lastName">نام خانوادگی</label>
        <div class="invalid-feedback">
          نام خانوادگی خود را به درستی وارد کنید!
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
    <div class="orders d-flex flex-row justify-content-around mt-3">
      <div class="order maraton">
        <div class="detail shadow">
          <h3>ماراتن لاغری گروهی</h3>
          <div class="d-flex flex-row justify-content-between price mb-2">
            <div class="option">
              <h3>325</h3>
              <p>هزار تومان</p>
            </div>
            <div class="option">
              <h3 class="off">
                390
              </h3>
              <p>هزار تومان</p>
            </div>
          </div>
          <div>
            <p>خصوصیت اول</p>
            <p>بهترین روش لاغری</p>
            <p>سه ماه رژیم منظم</p>
            <p>پشتیبانی گروهی</p>
            <p>امکان بازگشت وجه</p>
          </div>
          <button class="btn" @click="buy">
            پرداخت
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column mt-3">
      <p>لاغری گروهی خیلی خوبه بخریدش بهترینه درجه یکه</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetDiet',
  data () {
    return {
      valid: false,
      information: {
        firstName: null,
        lastName: null
      },
      inputBlur: {
        firstNameBlured: false,
        lastNameBlured: false,
        mobileBlured: false
      }
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
    validName (name) {
      const regex = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F ]{3,20}$/
      return regex.test(name)
    },
    validMobile (mobile) {
      const regex = /[0][9][0-9][0-9]{8,8}$/g
      return regex.test(mobile)
    },
    validateNumber (event) {
      const keyCode = event.keyCode
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault()
      }
    },
    validate () {
      const info = this.information
      if (this.validName(info.firstName) && this.validName(info.lastName) && this.validMobile(this.mobileNumber)) {
        this.valid = true
      }
    },
    buy () {
      this.inputBlur.firstNameBlured = true
      this.inputBlur.lastNameBlured = true
      this.inputBlur.mobileBlured = true
      this.validate()
      if (this.valid) {
        this.$store.dispatch('stepProgressBar/submitName', this.information)
        window.console.log('Product bought!!!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .diet {
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
    }
    .orders {
      .order {
        width: 50%;
        .detail {
          padding: 10px 5px;
          border: 2px solid #fff;
          border-radius: 12px;
          background-color: #1bc47d;
          color: #fff;
          text-align: center;
          // box-shadow: 0 10px 20px rgba(160, 144, 144, 0.19), 0 6px 6px rgba(0,0,0,0.23);
          h3 {
            font-size: 16px;
            margin-bottom: 0;
          }
          .price {
            .option {
              line-height: 0;
              p {
                font-size: 12px;
              }
              h3 {
                font-weight: 300;
                font-size: 28px;
                &.off{
                  text-decoration: line-through;
                }
                // font-style: italic;
              }
            }
          }
          button {
            color: #1bc47d;
            padding: 0 30px;
            height: 24px;
            border-radius: 12px;
            font-size: 13px;
            background-color: #f5f5f5;
            box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
            font-weight: 600;
            &:hover {
              background-color: #e1e1e1;
            }
            // margin: 0 0.4rem;
          }
        }
      }
    }
    p{
      text-align: center;
      font-weight: 500;
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
</style>
