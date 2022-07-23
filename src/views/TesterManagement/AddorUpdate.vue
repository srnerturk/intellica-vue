<template>
  <div class="page">
    <h1 class="page-title">{{ !isEditMode ? "Add Tester" : "Edit Tester" }}</h1>
    <form @submit.prevent="submit" class="add-tester bg-white rounded-lg mb-10 p-5">
      <div class="rows flex flex-col">
        <div class="border border-bordergray mb-5">
          <div class="row-header bg-mifiblue p-2">
            <p class="text-white text-sm font-bold">Tester Info</p>
          </div>
          <div class="row-body p-5 flex flex-col space-y-10">
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="name">Name</label>
                <input v-model="form.name" type="text" placeholder="name" id="name" />
                <div class="error" v-if="!$v.form.name.required">Name is required</div>
              </div>
              <div class="form-g">
                <label for="surname">Surname</label>
                <input v-model="form.surname" type="text" placeholder="surname" id="surname" />
                <div class="error" v-if="!$v.form.surname.required">Surname is required</div>
              </div>
              <div v-if="isEditMode" class="form-g">
                <label for="surname">Password</label>
                <button type="button" class="bg-mifiblue text-white p-2 rounded text-sm">
                  Change Password
                </button>
              </div>
            </div>
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" placeholder="email address" id="email" />
                <div class="error" v-if="!$v.form.email.required">Email required</div>
              </div>
              <div class="form-g">
                <label for="phone">Phone</label>
                <input v-model="form.phone" type="phone" placeholder="Phone Number" id="phone" />
                <div class="error" v-if="!$v.form.phone.required">Phone is required</div>
              </div>
            </div>
          </div>
        </div>
        <div class="border border-bordergray">
          <div class="row-header bg-mifiblue p-2">
            <p class="text-white text-sm font-bold">Tester Location Info</p>
          </div>
          <div class="row-body flex flex-col p-5 space-y-10">
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="country">Country</label>
                <select v-model="form.country" id="country">
                  <option value="0">Select</option>
                </select>
                <div class="error" v-if="!$v.form.country.required">Country is required</div>
              </div>
              <div class="form-g">
                <label for="city">City</label>
                <select v-model="form.city" id="city">
                  <option value="0">Select</option>
                </select>
                <div class="error" v-if="!$v.form.city.required">City is required</div>
              </div>
            </div>
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="zipcode">Zipcode</label>
                <input v-model="form.zipcode" type="text" placeholder="Zip Code" id="zipcode" />
              </div>
              <div class="form-g">
                <label for="address">AddressLine</label>
                <textarea
                  v-model="form.address"
                  rows="5"
                  tplaceholder="Phone Number"
                  id="address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions flex justify-end mt-6">
        <button type="submit" class="action-link">
          <span class="text-lg font-bold text-mifiblue">{{
            !isEditMode ? "Create Tester" : "Save Changes"
          }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1C2749"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TestAddOrUpdate",
  created() {
    if (this.$route.params.method === "edit") {
      const { id } = this.$route.query;
      const tester = this.getTesters.filter((x) => x.id === id)[0];
      this.fetchTester(tester);
      this.form.name = tester.username;
    }
  },
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        zipcode: "",
        address: "",
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      surname: {
        required,
      },
      email: {
        required,
      },
      phone: {
        required,
      },
      country: {
        required,
      },
      city: {
        required,
      },
    },
  },
  methods: {
    ...mapActions(["fetchTester"]),
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("error");
      } else {
        alert("success");
      }
    },
  },
  computed: {
    ...mapGetters(["getTesters"]),
    isEditMode() {
      return this.$route.params.method === "edit";
    },
  },
};
</script>
