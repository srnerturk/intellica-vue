<template>
  <div class="page">
    <div class="page-title">Plan Sketches</div>
    <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-5">
      <div class="left-side">
        <div class="search-bar flex flex-col">
          <label class="text-sm font-bold mb-2">Search For Device</label>
          <input
            class="border rounded-md pl-2 outline-none h-40"
            type="text"
            placeholder="mac address,SSID,MSISDN"
          />
          <div class="device-section mt-5">
            <div v-if="getSketchesByDevice" class="device-body">
              <div
                :key="index"
                v-for="(item, index) in getSketchesByDevice.steps"
                class="device"
              >
                <div class="circle">
                  {{ index + 1 }}
                </div>
                <div class="content ml-5">
                  <h5 class="text-md font-bold">{{ item.action }}</h5>
                  <span class="text-sm"
                    >Last Reported Date:{{ item.date }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-side flex flex-col items-right">
        <canvas style="position: absolute" ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PlanSketches",
  methods: {
    ...mapActions(["fetchSketch"]),
    getBoundingRect(data) {
      let left = Infinity;
      let right = -Infinity;
      let top = Infinity;
      let bottom = -Infinity;

      // eslint-disable-next-line no-restricted-syntax
      for (const { latitude, longitude } of data) {
        if (left > latitude) left = latitude;
        if (top > longitude) top = longitude;
        if (right < latitude) right = latitude;
        if (bottom < longitude) bottom = longitude;
      }
      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
      };
    },
    draw(ctx, data) {
      let oldCircleX = 0;
      let OldCircleY = 0;
      this.canvasContext.imageSmoothingEnabled = false;
      const { canvas } = this;
      const boundingRect = this.getBoundingRect(data);
      const scale = Math.min(canvas.width - 30, canvas.height - 30);
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const { latitude, longitude } of data) {
        index += 1;
        const x = ((latitude - boundingRect.x) / boundingRect.width) * scale;
        const y = ((longitude - boundingRect.y) / boundingRect.height) * scale;

        // ctx.fillRect(x - 5, y - 5, 10, 10);
        if (oldCircleX > 0 && OldCircleY > 0) {
          ctx.beginPath();
          this.canvasContext.strokeStyle = "#EDEDED";
          this.canvasContext.fillStyle = "#EDEDED";
          this.canvasContext.lineWidth = 2;
          ctx.moveTo(oldCircleX, OldCircleY);
          ctx.lineTo(x + 10, y + 10);
          ctx.stroke();
        }
        ctx.beginPath();
        this.canvasContext.strokeStyle = "green";
        this.canvasContext.fillStyle = "#003300";
        ctx.arc(x + 10, y + 10, 8, 0, 2 * Math.PI);
        oldCircleX = x + 10;
        OldCircleY = y + 10;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        this.canvasContext.font = "18px Arial";
        this.canvasContext.fillStyle = "green";
        this.canvasContext.textAlign = "center";
        ctx.fillText(index, x + 24, y + 30);
        ctx.fill();
        ctx.stroke();
      }
    },
    setRatio() {
      const w = 500;
      const h = 350;
      const ratio = 1;
      console.log("ratio", ratio);
      const cv = this.canvas;
      cv.width = w * ratio;
      cv.height = h * ratio;
      cv.style.width = `${w + 50}px`;
      cv.style.height = `${h + 50}px`;
      cv.getContext("2d").scale(ratio, ratio);
    },
  },
  mounted() {
    if (this.currentDevice > 0) {
      this.setRatio();
      this.fetchSketch(this.currentDevice);
      this.draw(this.canvasContext, this.steps);
    }
  },
  data() {
    return {
      steps: [
        { city: "NYC", longitude: -73.935242, latitude: 40.73061 },
        { city: "NYC", longitude: -74.044502, latitude: 40.689247 },
        { city: "NYC", longitude: -74.020219, latitude: 40.578912 },
        { city: "NYC", longitude: -73.992833, latitude: 40.634345 },
        { city: "NYC", longitude: -73.992833, latitude: 40.694345 },
        // { city: "NYC", longitude: -74.120332, latitude: 40.484633 },
      ],
    };
  },
  computed: {
    ...mapGetters(["getSketchesByDevice"]),
    currentDevice() {
      return this.$route.params.device || 0;
    },
    canvasContext() {
      return this.$refs.canvas.getContext("2d");
    },
    canvas() {
      return this.$refs.canvas;
    },
  },
};
</script>

<style lang="scss">
.left-side {
  max-width: 340px;
  max-height: 540px;
  overflow-y: scroll;
}
canvas {
  padding: 10px;
}
.device {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  .circle {
    background: #1c2749;
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
