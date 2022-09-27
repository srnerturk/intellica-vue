<template>
  <div class="page">
    <h1 class="page-title">{{ !isEditMode ? "Add Tester" : "Edit Tester" }}</h1>
    <form class="add-tester bg-white rounded-lg mb-10 p-5">
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
                <select v-model="form.address.country" id="country">
                  <option value="0">Select</option>
                  <option value="Turkey">Turkey</option>
                </select>
                <div class="error" v-if="!$v.form.address.country.required">
                  Country is required
                </div>
              </div>
              <div class="form-g">
                <label for="city">City</label>
                <input v-model="form.address.city" type="text" placeholder="City" id="city" />
                <div class="error" v-if="!$v.form.address.city.required">City is required</div>
              </div>

              <div class="form-g">
                <label for="state">State</label>
                <input v-model="form.address.state" type="text" placeholder="State" id="state" />
                <div class="error" v-if="!$v.form.address.state.required">State is required</div>
              </div>
            </div>
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="zipcode">Zipcode</label>
                <input
                  v-model="form.address.zipCode"
                  type="text"
                  placeholder="Zip Code"
                  id="zipcode"
                />
                <div class="error" v-if="!$v.form.address.zipCode.required">
                  Zip Code is required
                </div>
              </div>
              <div class="form-g">
                <label for="address">AddressLine</label>
                <textarea
                  v-model="form.address.detail"
                  rows="5"
                  tplaceholder="Phone Number"
                  id="address"
                />
                <div class="error" v-if="!$v.form.address.detail.required">
                  Address is required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions flex justify-end mt-6">
        <FormButton
          :disabled="$v.$invalid"
          @click="saveChanges"
          :loading="loading"
          type="button"
          class="action-link"
          v-if="isEditMode"
        >
          <span class="text-lg font-bold text-mifiblue">Save Changes</span>
        </FormButton>
        <FormButton
          :disabled="$v.$invalid"
          @click="createTester"
          :loading="loading"
          type="button"
          class="action-link"
          v-else
        >
          <span class="text-lg font-bold text-mifiblue">Create Tester</span>
        </FormButton>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import FormButton from "@/components/formButton/index.vue";

export default {
  name: "TestAddOrUpdate",
  components: {
    FormButton,
  },
  created() {
    if (this.$route.params.method === "edit") {
      const { id } = this.$route.query;
      this.fetchTester(id).then((tester) => {
        this.form = {
          id: tester.id,
          name: tester.name,
          surname: tester.surname,
          email: tester.email,
          phone: tester.phone,
          address: {
            country: tester.address.country,
            city: tester.address.city,
            zipCode: tester.address.zipCode,
            detail: tester.address.detail,
            state: tester.address.state,
          },
        };
      });
    }
  },
  data() {
    return {
      loading: false,
      form: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: {
          country: "",
          city: "",
          zipCode: "",
          detail: "",
          state: "",
        },
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
      address: {
        country: {
          required,
        },
        city: {
          required,
        },
        state: {
          required,
        },
        zipCode: {
          required,
        },
        detail: {
          required,
        },
      },
    },
  },
  methods: {
    ...mapActions(["fetchTester", "addNewTester", "updateTester"]),
    clearForm() {
      this.form = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: {
          country: "",
          city: "",
          zipCode: "",
          detail: "",
          state: "",
        },
      };
    },
    createTester() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$alertify.error("check form validations");
      } else {
        this.loading = true;
        this.addNewTester(this.form).then((r) => {
          if (r.status) {
            this.$alertify.success("Tester Created Successfuly, Page Redirecting Tester List");
            setTimeout(() => {
              this.clearForm();
              this.$router.push("/testers");
            }, 2000);
          } else {
            this.$alertify.error(r.error || "error");
          }
          this.loading = false;
        });
      }
    },
    saveChanges() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$alertify.error("check form validations");
      } else {
        this.loading = true;
        this.updateTester(this.form).then((r) => {
          if (r.status) {
            this.$alertify.success("Tester Updated Successfuly, Page Redirecting Tester List");
            setTimeout(() => {
              this.clearForm();
              this.$router.push("/testers");
            }, 2000);
          } else {
            this.$alertify.error(r.error || "error");
          }
          this.loading = false;
        });
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
