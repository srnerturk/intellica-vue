<template>
  <div class="device mt-2  rounded-md border border-gray-200 p-2 flex flex-col space-y-2">
    <div class="top flex justify-between">
      <h5 class=" font-bold text-xl">{{ deviceName }}</h5>
      <span class="status text-sm text-green-500">{{ status }}</span>
      <span class="createdat text-sm text-gray-500">{{ createdat }}</span>
    </div>
    <div class="items flex justify-between items-center">
      <div class="main-div">
      <h5 class="font-bold text-sm">Router</h5>
      <div class="row">
        <div class="col text-sm font-bold text-gray-500">Make: {{ routerMake }}</div>
        <div class="col text-sm font-bold text-gray-500">Serial Number: {{ routerSerial }}</div>
      </div>
      <div class="row">
        <div class="col text-sm font-bold text-gray-500">Model: {{ routerModel }}</div>
        <div class="col text-sm font-bold text-gray-500">IMEI: {{ routerImei }}</div>
      </div>
    </div>
    <div class="main-div">
      <h5 class="font-bold text-sm">Phone</h5>
      <div class="row">
        <div class="col text-sm font-bold text-gray-500">Make: {{ mobileMake }}</div>
        <div class="col text-sm font-bold text-gray-500">IMEI: {{ mobileImei }}</div>
      </div>
      <div class="row">
        <div class="col text-sm font-bold text-gray-500">Model: {{ mobileModel }}</div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Device",
  props: {
    status: String,
    deviceName: String,
    routerMake: String,
    routerModel: String,
    routerSerial: String,
    routerImei: String,
    mobileMake: String,
    mobileModel: String,
    mobileImei: String,
    createdat: String,
  },
};
</script>
