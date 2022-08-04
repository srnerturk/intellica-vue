<!-- eslint-disable max-len -->
<template>
  <div
    class="login-wrapper w-full p-2 h-full fixed flex flex-col justify-center items-center bg-gray-200"
  >
    <div class="head w-full lg:w-[500px] mb-5 flex flex-row justify-between items-center">
      <img class="w-[140px]" src="@/assets/icons/logo.svg" alt="logo" />
      <h1 class="text-xl font-bold text-mifiblue">Register</h1>
    </div>
    <form
      @submit.prevent="onSubmit"
      class="login relative w-full lg:w-[500px] bg-gray-50 rounded-md flex items-center justify-center flex-col p-10 z-10"
    >
      <div class="form-element p-2 mb-1 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-user absolute top-4"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <input
          class="bg-transparent h-40 w-full border-b-2 border-b-gray-300 outline-0 focus:border-b-gray-500 pl-6"
          v-model="user.name"
          type="text"
          placeholder="Name"
        />
        <div class="error" v-if="!$v.user.name.required">Name is required</div>
      </div>
      <div class="form-element p-2 mb-1 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-user absolute top-4"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <input
          class="bg-transparent h-40 w-full border-b-2 border-b-gray-300 outline-0 focus:border-b-gray-500 pl-6"
          v-model="user.surname"
          type="text"
          placeholder="Surname"
        />
        <div class="error" v-if="!$v.user.surname.required">Surname is required</div>
      </div>
      <div class="form-element p-2 mb-1 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-mail absolute top-4"
        >
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          ></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <input
          class="border-0 bg-transparent h-40 w-full border-b-2 border-b-gray-300 outline-0 focus:border-b-gray-500 pl-6"
          v-model="user.email"
          type="email"
          placeholder="Email"
        />
        <div class="error" v-if="!$v.user.email.required">Email is required</div>
      </div>

      <div class="form-element p-2 mb-1 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-lock absolute top-4"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <input
          class="border-0 bg-transparent h-40 w-full border-b-2 border-b-gray-300 outline-0 focus:border-b-gray-500 pl-6"
          v-model="user.password"
          type="password"
          placeholder="Password"
        />
        <div class="error" v-if="!$v.user.password.minLength">
          passwords must be min 8 character
        </div>
        <div class="error" v-if="!$v.user.password.required">Password is required</div>
      </div>

      <div class="form-element p-2 mb-5 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-lock absolute top-4"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <input
          class="border-0 bg-transparent h-40 w-full border-b-2 border-b-gray-300 outline-0 focus:border-b-gray-500 pl-6"
          v-model="user.passwordRpt"
          type="password"
          placeholder="Re-enter Password"
        />
        <div class="error" v-if="!$v.user.passwordRpt.sameAs">passwords must be the same</div>
      </div>
      <div class="action p-2 flex items-center justify-center flex-col">
        <button
          :disabled="$v.$invalid"
          type="submit"
          class="bg-blue-800 text-amber-50 px-10 py-2 rounded-md text-sm font-bold register-btn"
        >
          Register
        </button>
        <router-link class="text-sm font-medium text-mifiblue mt-2 underline" to="/login"
          >go to login page</router-link
        >
        <p class="mt-2 error text-red-700 text-sm">{{ error }}</p>
      </div>
      <div v-if="loading" class="loading rotating absolute right-[10px] bottom-[10px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="#1C2749"
          stroke="#1C2749"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-loader"
        >
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordRpt: "",
      },
      error: "",
      loading: false,
    };
  },
  validations: {
    user: {
      name: {
        required,
      },
      surname: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      passwordRpt: {
        sameAs: sameAs("password"),
      },
    },
  },
  methods: {
    ...mapActions(["register"]),
    onSubmit() {
      console.log(this.$v);
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("error");
      } else {
        this.loading = true;
        this.register(this.user).then((r) => {
          console.log(r);
          if (r.status) {
            this.$router.push({ name: "Login" });
          } else {
            this.error = r.error;
          }
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style lang="css">
.form-element .error {
  color: #d1264d;
  font-size: 13px;
}
.register-btn[disabled] {
  cursor: not-allowed;
  background: gray;
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
</style>
