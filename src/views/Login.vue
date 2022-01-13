<template>
  <div
    class="
      login-wrapper
      w-full
      h-full
      fixed
      flex
      justify-center
      items-center
      bg-gray-200
    "
  >
    <div
      class="
        login
        w-500
        h-300
        bg-gray-50
        rounded-md
        flex
        items-center
        justify-center
        flex-col
        p-10
        z-10
      "
    >
      <div class="form-element p-2 mb-1 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-user absolute top-3"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <input
          class="
            bg-transparent
            h-40
            w-full
            border-b-2 border-b-gray-300
            outline-0
            focus:border-b-gray-500
            pl-7
          "
          v-model="user.username"
          type="text"
          placeholder="username"
        />
      </div>
      <div class="form-element p-2 mb-5 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#212C55"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-lock absolute top-3"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <input
          class="
            border-0
            bg-transparent
            h-40
            w-full
            border-b-2 border-b-gray-300
            outline-0
            focus:border-b-gray-500
            pl-7
          "
          v-model="user.password"
          type="password"
          placeholder="password"
        />
      </div>
      <div class="action p-2 flex items-center justify-center">
        <button
          @click="signIn"
          class="bg-blue-800 text-amber-50 px-10 py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "admin",
        password: "password",
      },
    };
  },
  methods: {
    signIn() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
