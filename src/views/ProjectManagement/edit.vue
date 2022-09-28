<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <h1 class="page-title">Edit Project</h1>
    <form @submit.prevent="submit" class="add-tester bg-white rounded-lg mb-10 p-5">
      <div class="form flex flex-row">
        <div class="left-side flex-[0.6]">
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
                    <select @change="addTester($event)" v-model="tester" id="country">
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
        </div>
        <div class="right-side flex-[0.4] p-5">
          <div v-if="currentPlan" class="floorplan">
            <img class="w-full max-h-[250px] object-contain" :src="currentPlan" alt="floor" />
          </div>
          <div v-else class="floorplan">
            <p class="text-gray-300 text-lg font-bold mb-2 text-center">
              No Floor plan for preview
            </p>
            <img
              class="w-full max-h-[250px] object-contain"
              src="https://via.placeholder.com/350x250"
              alt="floor"
            />
          </div>
          <div class="plans mt-5">
            <div class="flex space-x-2 overflow-x-auto">
              <div
                @click="changeImage(item.id)"
                :key="item.key"
                v-for="item in form.plans"
                class="plan-list w-[90px] relative"
              >
                <button
                  @click.stop="removeImage(item.id)"
                  type="button"
                  class="remove absolute right-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <img
                  class="w-full border-2 h-[70px] object-contain border-gray-100 hover:border-blue-500 cursor-pointer"
                  :src="`${cdnUrl}/${item.path}`"
                  alt="plan"
                />
              </div>
              <input
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                @change="getFile"
                ref="file"
                type="file"
                hidden
              />
              <button
                @click="addFile"
                type="button"
                class="button add-new bg-gray-200 p-5 h-[70px] rounded flex items-center justify-center"
              >
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
          </div>
        </div>
      </div>

      <div class="actions flex justify-end mt-6">
        <FormButton
          :disabled="$v.$invalid"
          @click="update"
          :loading="loading"
          type="button"
          class="action-link"
        >
          <span class="text-lg font-bold text-mifiblue">Update Project</span>
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
  name: "EditProject",
  components: {
    FormButton,
  },
  async mounted() {
    await this.getTesters();
    const { id } = this.$route.query;
    this.fetchProject(id).then((project) => {
      const testers = [];
      if (project.testers.length > 0) {
        project.testers.forEach((t) => {
          const user = {
            testerId: t.tester.id,
            email: t.tester.email,
          };
          testers.push(user);
        });
      }
      this.form = {
        id: project.id,
        name: project.name,
        status: project.status,
        testers,
        plans: project.plans,
      };
    });
    // this.currentPlan = this.getImageUrl(this.plans[0].image)
  },
  data() {
    return {
      cdnUrl: process.env.VUE_APP_IMAGE_CDN,
      currentPlan: null,
      loading: false,
      testerList: [],
      tester: "",
      form: {
        id: 0,
        name: "",
        status: "Not Started",
        testers: [],
        plans: [],
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
    ...mapActions(["fetchProject", "fetchTesterList", "updateProject", "addFloorPlan"]),
    addFile() {
      this.$refs.file.click();
    },
    async getTesters() {
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
    getFile(e) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("projectId", this.form.id);
      formData.append("file", file);
      this.loading = true;
      this.addFloorPlan(formData).then((response) => {
        const image = {
          id: this.form.plans.length + 1,
          name: response.path,
          path: response.path,
          image: url,
          projectId: this.form.id,
        };
        this.currentPlan = url;
        this.form.plans.push(image);
        this.loading = false;
      });
    },
    changeImage(id) {
      const image = this.form.plans.find((item) => item.id === id);
      console.log(image);
      this.currentPlan = `${this.cdnUrl}/${image.path}`;
    },
    removeImage(id) {
      const index = this.form.plans.findIndex((item) => item.key === id);
      this.form.plans.splice(index, 1);
      if (this.form.plans.length > 0) {
        this.currentPlan = this.form.plans[0].image;
      } else {
        this.currentPlan = null;
      }
    },
    getImageUrl(url) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(`@/assets/images/${url}`);
    },
    addTester(e) {
      const { email } = e.target.selectedOptions[0].dataset;
      const val = parseInt(e.target.value, 0);
      if (this.form.testers.filter((x) => x.testerId === val).length > 0 || Number.isNaN(val)) {
        return;
      }
      this.form.testers.push({ testerId: val, email });
    },
    removeTester(tester) {
      this.form.testers = this.form.testers.filter((t) => t !== tester);
    },
    update() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$alertify.error("check form validations");
      } else {
        this.loading = true;
        this.updateProject(this.form).then((r) => {
          if (r.status) {
            this.$alertify.success("Project Updated Successfuly, Page Redirecting Project List");
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
