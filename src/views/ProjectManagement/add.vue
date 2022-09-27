<template>
  <div class="page">
    <h1 class="page-title">Add New Project</h1>
    <form class="add-tester bg-white rounded-lg mb-10 p-5">
      <div class="rows flex flex-col">
        <div class="border border-bordergray mb-5">
          <div class="row-header bg-mifiblue p-2">
            <p class="text-white text-sm font-bold">Project Details</p>
          </div>
          <div class="row-body p-5 flex flex-col space-y-10">
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="name">Project Name</label>
                <input v-model="form.name" type="text" placeholder="name" id="name" />
                <div class="error" v-if="!$v.form.name.required">Name is required</div>
              </div>
            </div>
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="name">Status</label>
                <select v-model="form.status">
                  <option value="Not Started">Not Started</option>
                  <option value="On Going">On Going</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="border border-bordergray">
          <div class="row-header bg-mifiblue p-2">
            <p class="text-white text-sm font-bold">Add Tester</p>
          </div>
          <div class="testers p-5 border border-gray-100">
            <p class="font-bold text-sm">Selected Testers</p>
            <span class="text-xs font-light text-gray-700 mb-2" v-if="form.testers.length === 0"
              >you have not selected any testers</span
            >
            <ul>
              <li
                class="flex space-x-2 items-center"
                :key="index"
                v-for="(tester, index) in form.testers"
              >
                <span class="text-sm text-gray-700 font-light">{{ tester.email }}</span>
                <button @click="removeTester(tester)" class="action-link" type="button">
                  <span class="text-sm">Remove</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="row-body flex flex-col p-5 space-y-10">
            <div class="row flex space-x-5">
              <div class="form-g">
                <label for="country">Tester Name</label>
                <span class="text-xs font-light text-gray-500 mb-2">Pick and Add Tester</span>
                <select @change="addTester($event)" v-model="tester" id="tester-pick">
                  <option value="">Select</option>
                  <option
                    :key="tester.id"
                    v-for="tester in testerList"
                    :data-email="tester.email"
                    :value="tester.id"
                  >
                    {{ tester.name }} {{ tester.surname }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions flex justify-end mt-6">
        <FormButton
          :disabled="$v.$invalid"
          @click="addProject"
          :loading="loading"
          type="button"
          class="action-link"
        >
          <span class="text-lg font-bold text-mifiblue">Create Project</span>
        </FormButton>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import FormButton from "@/components/formButton/index.vue";

export default {
  name: "AddProject",
  components: {
    FormButton,
  },
  mounted() {
    this.fetchTesterList().then((r) => {
      r.forEach((tester) => {
        const user = {
          id: tester.id,
          name: tester.name,
          surname: tester.surname,
          email: tester.email,
        };
        this.testerList.push(user);
      });
    });
  },
  data() {
    return {
      loading: false,
      testerList: [],
      tester: "",
      form: {
        name: "",
        status: "Not Started",
        testers: [],
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  methods: {
    ...mapActions(["fetchTesterList", "addNewProject"]),
    addTester(e) {
      const { email } = e.target.selectedOptions[0].dataset;
      const val = e.target.value;
      if (this.form.testers.includes(val) || val === "") {
        return;
      }
      this.form.testers.push({ testerId: parseInt(val, 0), email });
    },
    removeTester(tester) {
      this.form.testers = this.form.testers.filter((t) => t !== tester);
    },
    addProject() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$alertify.error("check form validations");
      } else {
        this.loading = true;
        this.addNewProject(this.form).then((r) => {
          if (r.status) {
            this.$alertify.success("Project Created Successfuly, Page Redirecting Project List");
            setTimeout(() => {
              this.$router.push("/projects");
            }, 2000);
          } else {
            this.$alertify.error(r.error || "error");
          }
          this.loading = false;
        });
      }
    },
  },
};
</script>
