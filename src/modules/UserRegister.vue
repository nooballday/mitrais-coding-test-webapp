<template>
  <div class="m-user-register" ref="registerView">
    <b-progress
      :class=" sending ? 'm-user-display' : 'm-user-hide' "
      :value="100"
      :max="100"
      animated
    ></b-progress>
    <div :class=" sending ? 'm-user-disable': 'm-user-enable'">
      <div class="m-user-register-form shadow p-3 bg-white rounded">
        <div class="title-register">Register</div>
        <hr />
        <b-form>
          <!-- no hp -->

          <b-form-group
            :state="phoneNumberState"
            id="field-set-pn"
            label="Phone number"
            label-for="r-mobile-number"
            :invalid-feedback="phoneNumberState? '' : 'Please input a valid indonesian phone number'"
          >
            <b-form-input
              title="hello"
              size="sm"
              id="r-mobile-number"
              v-model="nohp"
              :state="phoneNumberState"
              trim
            ></b-form-input>
          </b-form-group>

          <!-- firstname -->

          <b-form-group
            :state="firstNameState"
            id="field-set-firstname"
            label="First Name"
            label-for="r-first-name"
            :invalid-feedback="firstNameState ? '' : 'First name is required'"
          >
            <b-form-input
              :state="firstNameState"
              size="sm"
              id="r-first-name"
              v-model="firstName"
              trim
            ></b-form-input>
          </b-form-group>

          <!-- last name -->

          <b-form-group
            :state="lastNameState"
            id="field-set-lastname"
            label="Last Name"
            label-for="r-last-name"
            :invalid-feedback="lastNameState ? '' : 'Last name is required'"
          >
            <b-form-input :state="lastNameState" size="sm" id="r-last-name" v-model="lastName" trim></b-form-input>
          </b-form-group>

          <!-- select date -->

          <div class="label-form">Date of Birth</div>
          <div class="m-date-group" style="margin-top: 10px">
            <b-form-select class="date-picker" size="sm" :options="month" v-model="selected_month">
              <template slot="first">
                <option :value="null" disabled>Month</option>
              </template>
            </b-form-select>

            <b-form-select
              class="date-picker"
              size="sm"
              :options="date_number"
              v-model="selected_date"
            >
              <template slot="first">
                <option :value="null" disabled>Date</option>
              </template>
            </b-form-select>

            <b-form-select size="sm" :options="year" v-model="selected_year">
              <template slot="first">
                <option :value="null" disabled>Year</option>
              </template>
            </b-form-select>
          </div>

          <!-- Gender -->

          <div style="margin-top: 20px;">Gender</div>
          <b-form-select
            size="sm"
            :options="gender"
            v-model="selected_gender"
            style="margin-top: 10px"
          >
            <template slot="first">
              <option :value="null" disabled>Please Select Your Gender</option>
            </template>
          </b-form-select>

          <!-- email -->
          <b-form-group
            :state="emailState"
            id="field-set-email"
            label="Email"
            label-for="r-email"
            style="margin-top:20px;"
            :invalid-feedback="emailState ? '' : 'Valid email is required'"
          >
            <b-form-input :state="emailState" size="sm" id="r-email" v-model="email" trim></b-form-input>
          </b-form-group>

          <!-- button register -->
          <b-button v-on:click="submitForm" variant="primary" block class="r-btn-register">Register</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
import Validator from "../instruments/validator";
import RegisterIns from "../instruments/RegisterIns";
export default {
  name: "UserRegister",
  computed: {
    phoneNumberState() {
      return this.isPhoneNumberValid;
    },
    firstNameState() {
      return this.isFirstNameValid;
    },
    lastNameState() {
      return this.isLastNameValid;
    },
    emailState() {
      return this.isEmailValid;
    }
  },
  data() {
    const dateNumber = new Array(31).fill(0).map((n, i) => {
      return { value: i + 1, text: i + 1 };
    });
    const yearNumber = new Array(150)
      .fill(new Date().getFullYear())
      .map((y, i) => {
        return { value: y - i, text: y - i };
      });
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Month",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].map((m, i) => {
      return { value: i + 1, text: m };
    });
    const gender = [
      { value: "Male", text: "Male" },
      { Value: "Female", text: "Female" }
    ];
    return {
      sending: false,
      isPhoneNumberValid: null,
      isFirstNameValid: null,
      isLastNameValid: null,
      isEmailValid: null,
      date_number: dateNumber,
      month: month,
      year: yearNumber,
      gender: gender,
      selected_gender: null,
      selected_date: null,
      selected_month: null,
      selected_year: null,
      nohp: "",
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  methods: {
    makeToast(message) {
      this.$bvToast.toast(message, {
        title: "Error registering user!",
        variant: "primary",
        solid: true
      });
    },
    async submitForm(e) {
      this.isPhoneNumberValid = Validator.validatePhoneNumber(this.nohp);
      this.isFirstNameValid = this.firstName.length > 0;
      this.isLastNameValid = this.lastName.length > 0;
      this.isEmailValid = Validator.emailValidator(this.email);

      if (
        this.isPhoneNumberValid &&
        this.isFirstNameValid &&
        this.isLastNameValid &&
        this.isEmailValid
      ) {
        /**
         * send request to server
         */
        this.sending = true;

        /**
         * preparing request payload
         */
        const payload = {
          email: this.email,
          no_hp: this.nohp,
          first_name: this.firstName,
          last_name: this.lastName,
          date_of_birth:
            !this.selected_year || !this.selected_month || !this.selected_date
              ? null
              : `${this.selected_year}-${this.selected_month}-${this.selected_date}`,
          gender: this.selected_gender
        };

        const registerIns = new RegisterIns(payload);

        try {
          const resBody = await registerIns.saveData();
          const objResBody = JSON.parse(resBody);
          console.log(objResBody);
          if (objResBody.status) {
            /**
             * sucesss send data
             * move to login
             */
            this.$router.push("/login");
          }
          if (!objResBody.status) {
            /**
             * show error
             */
            this.makeToast(objResBody.error);
          }
          /**
           * activate the form
           */
          this.sending = false;
        } catch (error) {
          this.makeToast(error.message);
          /**
           * error,
           * toast error activate the form again
           */
          this.sending = false;
        }
      }
    }
  }
};
</script>
<style>
.m-user-register {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.m-user-register-form {
  margin: 3vh auto;
  width: 30vw;
}

.r-btn-register {
  margin-top: 30px;
}
.title-register {
  font-size: 30px;
}
.m-user-enable {
  opacity: 1;
}
.m-user-disable {
  opacity: 0.5;
  pointer-events: none;
}
.m-date-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.date-picker {
  margin-right: 2%;
}

.m-user-display {
  display: block;
}

.m-user-hide {
  display: none;
}

@media screen and (max-width: 720px) {
  .m-user-register-form {
    width: 95vw;
  }
}
</style>