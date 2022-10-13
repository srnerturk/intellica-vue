<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <h1 class="page-title">Edit Floor plans</h1>
    <form @submit.prevent="submit" class="add-tester bg-white rounded-lg mb-10 p-5 relative">
      <FormButton
        @click="addTestPoint"
        type="button"
        class="action-link absolute right-[20px] top-[8px]"
      >
        <span class="text-lg font-bold text-mifiblue">Add Test Point</span>
      </FormButton>
      <div class="header flex items-center space-x-2 mb-2">
        <div class="row-header bg-mifiblue p-2">
          <p class="text-white text-sm font-bold">Project Name: Project</p>
        </div>
        <div class="assigned flex space-x-2">
          <p class="text-sm font-bold">Assigned Testers:</p>
          <div class="testers flex space-x-1">
            <span :key="tester.id" v-for="tester in project.testers" class="text-sm">{{
              tester.email
            }}</span>
          </div>
        </div>
      </div>
      <div class="form flex flex-row">
        <div class="w-full flex flex-col items-center justify-center">
          <div
            v-if="currentPlan"
            class="floorplan flex items-center justify-center w-full p-5 bg-[#E4ECF5]"
          >
            <div class="image-contain w-[500px] h-[400px] relative">
              <img
                class="w-full h-[400px] object-contain"
                :src="`${cdnUrl}/${currentPlan.path}`"
                alt="floor"
              />
              <div class="points h-full w-[500px] absolute top-0 left-0">
                <vue-draggable-resizable
                  :w="35"
                  :h="35"
                  :parent="true"
                  @dragging="onDrag"
                  @dragstop="onDragStop(point.id)"
                  :x="point.x"
                  :y="point.y"
                  :key="index"
                  v-for="(point, index) in currentPlan.points"
                  class="point cursor-pointer font-bold absolute bg-[#E4ECF5] border-2 border-blue-500 w-[35px] h-[35px] rounded-full flex items-center justify-center"
                >
                  {{ index + 1 }}
                </vue-draggable-resizable>
              </div>
            </div>
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
                :key="item.id"
                v-for="item in project.plans"
                class="plan-list w-[90px] relative"
              >
                <img
                  :class="{ activeImage: item.id === currentPlan.id }"
                  class="w-full border-2 h-[70px] object-contain border-gray-100 hover:border-blue-500 cursor-pointer"
                  :src="`${cdnUrl}/${item.path}`"
                  alt="plan"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="device-add">
          <form class="devices p-5">
            <div class="name">
              <div class="form-g">
                <label for="city">Device Name</label>
                <input
                  v-model="form.deviceName"
                  type="text"
                  placeholder="Enter device name"
                  id="devicename"
                />
                <div class="error" v-if="!$v.form.deviceName.required">Field is required</div>
              </div>
            </div>
            <div class="__row">
              <h5 class="font-xs font-bold my-3">Device(Router)</h5>
              <div class="row flex space-x-2">
                <div class="form-g">
                  <label for="city">Make</label>
                  <input
                    v-model="form.routerMake"
                    type="text"
                    placeholder="Device Manufacturer"
                    id="devicemake"
                  />
                  <div class="error" v-if="!$v.form.routerMake.required">Field is required</div>
                </div>
                <div class="form-g">
                  <label for="city">Model</label>
                  <input
                    v-model="form.routerModel"
                    type="text"
                    placeholder="Device Model"
                    id="devicemake"
                  />
                  <div class="error" v-if="!$v.form.routerModel.required">Field is required</div>
                </div>
              </div>
              <div class="row flex space-x-2 mt-3">
                <div class="form-g">
                  <label for="city">Serial Number</label>
                  <input
                    v-model="form.routerSerial"
                    type="text"
                    placeholder="Device Serial Number"
                    id="deviceserial"
                  />
                  <div class="error" v-if="!$v.form.routerSerial.required">Field is required</div>
                </div>
                <div class="form-g">
                  <label for="city">IMEI Number</label>
                  <input
                    v-model="form.routerImei"
                    type="text"
                    placeholder="IMEI Number"
                    id="imei"
                  />
                </div>
              </div>
            </div>
            <div class="__row">
              <h5 class="font-xs font-bold my-3">Mobile Device(Phone)</h5>
              <div class="row flex space-x-2">
                <div class="form-g">
                  <label for="city">Make</label>
                  <input
                    v-model="form.mobileMake"
                    type="text"
                    placeholder="Device Manufacturer"
                    id="phonemake"
                  />
                </div>
                <div class="form-g">
                  <label for="city">Model</label>
                  <input
                    v-model="form.mobileModel"
                    type="text"
                    placeholder="Device Model"
                    id="devicemake"
                  />
                </div>
              </div>
              <div class="row flex space-x-2 mt-3">
                <div class="form-g">
                  <label for="city">IMEI Number</label>
                  <input
                    v-model="form.mobileImei"
                    type="text"
                    placeholder="IMEI Number"
                    id="imei"
                  />
                </div>
                <div class="form-g flex items-end justify-end">
                  <FormButton
                    @click="addDevice"
                    :disabled="$v.$invalid"
                    :loading="loading"
                    type="button"
                    class="action-link mt-5"
                  >
                    <span class="text-lg font-bold text-mifiblue">Add Device</span>
                  </FormButton>
                </div>
              </div>
            </div>
          </form>
          <div v-if="currentPlan" class="results max-h-[200px] overflow-y-scroll p-5">
            <device-component
              :deviceName="device.deviceName"
              :routerMake="device.routerMake"
              :routerModel="device.routerModel"
              :routerSerial="device.routerSerial"
              :routerImei="device.routerImei"
              :mobileMake="device.mobileMake"
              :mobileModel="device.mobileModel"
              :mobileImei="device.mobileImei"
              :createdat="device.createdAt"
              status="Online"
              :key="device.id"
              v-for="device in currentPlan.devices"
            >
            </device-component>
          </div>
        </div>
      </div>

      <div class="actions flex justify-end mt-6">
        <FormButton @click="update" :loading="loading" type="button" class="action-link">
          <span class="text-lg font-bold text-mifiblue">Save Changes</span>
        </FormButton>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import FormButton from "@/components/formButton/index.vue";
import DeviceComponent from "@/components/device/index.vue";

export default {
  name: "EditFloorPlanTester",
  components: {
    FormButton,
    DeviceComponent,
  },
  created() {
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
      this.project = {
        id: project.id,
        name: project.name,
        status: project.status,
        testers,
        plans: project.plans,
      };
      // eslint-disable-next-line prefer-destructuring
      this.currentPlan = this.project.plans[0];
    });
  },
  data() {
    return {
      cdnUrl: process.env.VUE_APP_IMAGE_CDN,
      loading: false,
      currentPlan: null,
      x: 0,
      y: 0,
      form: {
        deviceName: "",
        routerMake: "",
        routerModel: "",
        routerSerial: "",
        routerImei: "",
        mobileMake: "",
        mobileModel: "",
        mobileImei: "",
        floorPlanId: 0,
      },
      project: {
        plans: [],
        testers: [],
        id: 0,
        name: 0,
      },
    };
  },
  validations: {
    form: {
      deviceName: {
        required,
      },
      routerMake: {
        required,
      },
      routerModel: {
        required,
      },
      routerSerial: {
        required,
      },
    },
  },
  methods: {
    ...mapActions(["fetchProject", "updateTestPoint", "addNewDevice"]),
    addTestPoint() {
      this.currentPlan.points.push({
        x: Math.floor(Math.random() * 250),
        y: Math.floor(Math.random() * 250),
        id: this.currentPlan.points.length + 1,
        floorPlanId: this.currentPlan.id,
        isNew: true,
      });
    },
    onDrag(x, y) {
      this.x = x;
      this.y = y;
    },
    onDragStop(id) {
      const point = this.currentPlan.points.find((p) => p.id === id);
      point.x = this.x;
      point.y = this.y;
      console.log("stop", id, this.x, this.y);
    },
    changeImage(id) {
      const image = this.project.plans.find((item) => item.id === id);
      this.currentPlan = image;
    },
    getImageUrl(url) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(`@/assets/images/${url}`);
    },
    clearForm() {
      this.form = {
        deviceName: "",
        routerMake: "",
        routerModel: "",
        routerSerial: "",
        routerImei: "",
        mobileMake: "",
        mobileModel: "",
        mobileImei: "",
      };
    },
    addDevice() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$alertify.error("check form validations");
      } else {
        this.loading = true;
        this.form.floorPlanId = this.currentPlan.id;
        this.addNewDevice(this.form).then((r) => {
          if (r.status) {
            this.clearForm();
            this.$alertify.success("Device Added Successfuly.");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.$alertify.error(r.error || "error");
          }
          this.loading = false;
        });
      }
    },
    update() {
      this.loading = true;
      const newPoints = this.currentPlan.points.map((point) => {
        if (point.isNew) {
          return { ...point, id: 0 };
        }
        return point;
      });
      this.currentPlan.points = newPoints;
      this.updateTestPoint(this.currentPlan).then((r) => {
        this.loading = false;
        if (r.status) {
          this.$alertify.success("FloorPlan Updated Successfuly");
        } else {
          this.$alertify.error(r.error || "error");
        }
      });
    },
  },
};
</script>

<style>
.activeImage {
  border: 2px solid #1c2749;
}
</style>
