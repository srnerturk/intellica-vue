<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <h1 class="page-title">Edit Floor plans</h1>
    <form @submit.prevent="submit" class="add-tester bg-white rounded-lg mb-10 p-5 relative">
      <button
        @click="addTestPoint"
        type="button"
        class="action-link absolute right-[20px] top-[8px]"
      >
        <span class="text-lg font-bold text-mifiblue">Add Test Point</span>
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
      <div class="header flex items-center space-x-2 mb-2">
        <div class="row-header bg-mifiblue p-2">
          <p class="text-white text-sm font-bold">Project Name: Project</p>
        </div>
        <div class="assigned flex space-x-2">
          <p class="text-sm font-bold">Assigned Testers:</p>
          <div class="testers flex space-x-1">
            <span class="text-sm">Serhan</span>
            <span class="text-sm">Hasan</span>
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
              <img class="w-full h-[400px] object-contain" :src="currentPlan.image" alt="floor" />
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
                  {{ point.id }}
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
                v-for="item in plans"
                class="plan-list w-[90px] relative"
              >
                <img
                  :class="{ activeImage: item.id === currentPlan.id }"
                  class="w-full border-2 h-[70px] object-contain border-gray-100 hover:border-blue-500 cursor-pointer"
                  :src="item.image"
                  alt="plan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions flex justify-end mt-6">
        <button type="submit" class="action-link">
          <span class="text-lg font-bold text-mifiblue">Save Changes</span>
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
export default {
  name: "EditFloorPlan",
  created() {
    // eslint-disable-next-line prefer-destructuring
    this.currentPlan = this.plans[0];
  },
  data() {
    return {
      currentPlan: null,
      x: 0,
      y: 0,
      plans: [
        {
          id: 0,
          // eslint-disable-next-line global-require
          image: require("@/assets/images/floor1.png"),
          points: [],
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          image: require("@/assets/images/floor1.png"),
          points: [],
        },
      ],
    };
  },
  methods: {
    addTestPoint() {
      this.currentPlan.points.push({
        x: Math.floor(Math.random() * 250),
        y: Math.floor(Math.random() * 250),
        id: this.currentPlan.points.length + 1,
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
      const image = this.plans.find((item) => item.id === id);
      this.currentPlan = image;
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
      console.log("plans", this.plans);
    },
  },
};
</script>

<style>
.activeImage {
  border: 2px solid #1c2749;
}
</style>
