<template>
  <div class="page">
    <div class="page-title">Device Locations</div>
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
            <div class="device-title">
              <h5 class="text-xl font-bold" v-if="getDeviceByLocations.Devices">
                {{ getDeviceByLocations.location }} ({{
                  getDeviceByLocations.Devices.length
                }})
              </h5>
            </div>
            <div v-if="getDeviceByLocations" class="device-body">
              <div
                :key="index"
                v-for="(item, index) in getDeviceByLocations.Devices"
                class="device"
              >
                <div class="circle">
                  {{ index + 1 }}
                </div>
                <div class="content ml-5">
                  <h5 class="text-md font-bold">MAC:{{ item.mac }}</h5>
                  <span class="text-sm"
                    >Last Reported Date:{{ item.last_reported_date }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-side flex flex-col items-right">
        <h5 class="tex-md font-bold mb-5 text-right">
          Location: {{ pointedLocation }}
        </h5>
        <svg-map
          @click="changeLocation"
          v-model="location"
          @mouseover="pointLocation"
          :map="Usa"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { SvgMap } from "vue-svg-map";
import "vue-svg-map/dist/index.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import Usa from "@svg-maps/usa";

export default {
  name: "DeviceLocations",
  components: {
    SvgMap,
  },
  data() {
    return {
      Usa,
      location: "California",
      pointedLocation: "California",
    };
  },
  methods: {
    ...mapActions(["fetchDevicesByLocation"]),
    changeLocation(e) {
      this.location = e.target.getAttribute("name");
      this.fetchDevicesByLocation(this.location);
    },
    pointLocation(e) {
      this.pointedLocation = e.target.getAttribute("name");
    },
    addMarker(location, count) {
      const path = document.getElementsByName(location)[0];
      if (path) {
        console.log(path);
        const box = path.getBBox();

        const div = document.createElementNS(
          "http://www.w3.org/2000/svg",
          // eslint-disable-next-line comma-dangle
          "text"
        );
        div.classList.add("marker");
        div.setAttributeNS(null, "fill", "#fff");
        div.setAttributeNS(null, "height", "30");
        div.setAttributeNS(null, "width", "30");
        const text = document.createTextNode(count);
        div.setAttribute(
          "transform",
          // eslint-disable-next-line comma-dangle
          `translate(${box.x + box.width / 2 - 25} ${box.y + box.height / 2})`
        );
        div.appendChild(text);
        path.parentNode.insertBefore(div, path.nextSibling);
      }
    },
  },
  computed: {
    ...mapGetters(["getDeviceByLocations"]),
  },
  mounted() {
    this.addMarker(this.location, 5);
    this.addMarker("Oregon", 8);
    this.addMarker("Nevada", 3);
    this.addMarker("Colorado", 2);
    this.addMarker("Alaska", 3);
    return this.fetchDevicesByLocation(this.location);
  },
};
</script>

<style lang="scss">
.marker {
  font-size: 36px;
  width: 30px;
  background: #fff;
  height: 30px;
  border-radius: 30px;
  color: #fff;
  font-weight: bold;
  pointer-events: none;
}
.left-side {
  max-width: 340px;
  max-height: 540px;
  overflow-y: scroll;
}
.device-body {
  border-right: 1px solid #ededed;
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
