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
              </div>
            </div>
            <div class="border border-bordergray">
              <div class="row-header bg-mifiblue p-2">
                <p class="text-white text-sm font-bold">Add Tester</p>
              </div>
              <div class="testers p-5 border border-gray-100">
                <p class="font-bold text-sm">Selected Testers</p>
                <span class="text-xs font-light text-gray-700 mb-2" v-if="testers.length === 0"
                  >you have not selected any testers</span
                >
                <ul>
                  <li
                    class="flex space-x-2 items-center"
                    :key="index"
                    v-for="(tester, index) in testers"
                  >
                    <span class="text-sm text-gray-700 font-light">{{ tester }}</span>
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
                    <select @change="addTester($event)" v-model="form.tester" id="country">
                      <option value="">Select</option>
                      <option value="Serhan Erturk">Serhan Erturk</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Adam Simpson">Adam Simpson</option>
                      <option value="Micheal Jackson">Micheal Jackson</option>
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
            <p class="text-gray-300 text-lg font-bold mb-2 text-center">No Floor plan for preview</p>
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
                :key="item.id"
                v-for="item in plans"
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
                  :src="item.image"
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
        <button type="submit" class="action-link">
          <span class="text-lg font-bold text-mifiblue">Save Project</span>
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "EditProject",
  created() {
    // this.currentPlan = this.getImageUrl(this.plans[0].image);
  },
  data() {
    return {
      currentPlan: null,
      plans: [],
      testers: [],
      form: {
        name: "",
        tester: "",
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
    addFile() {
      this.$refs.file.click();
    },
    getFile(e) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const image = {
        id: this.plans.length + 1,
        name: file.name,
        image: url,
      };
      this.currentPlan = url;
      this.plans.push(image);
    },
    changeImage(id) {
      const image = this.plans.find((item) => item.id === id);
      this.currentPlan = image.image;
    },
    removeImage(id) {
      const index = this.plans.findIndex((item) => item.id === id);
      this.plans.splice(index, 1);
      if (this.plans.length > 0) {
        this.currentPlan = this.plans[0].image;
      } else {
        this.currentPlan = null;
      }
    },
    getImageUrl(url) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(`@/assets/images/${url}`);
    },
    addTester(e) {
      const val = e.target.value;
      this.tester = val;
      if (this.testers.includes(val) || val === "") {
        return;
      }
      this.testers.push(val);
    },
    removeTester(tester) {
      this.testers = this.testers.filter((t) => t !== tester);
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("error");
      } else {
        alert("success");
      }
    },
  },
};
</script>
