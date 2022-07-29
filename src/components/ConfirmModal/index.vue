<template>
  <div class="confirm-modal">
    <div class="overlay fixed h-full w-full">
      <div class="modal p-3">
        <div class="body p-2">
          <p class="text-gray-700 text-sm">{{ text }}</p>
        </div>
        <div class="footer flex justify-between mt-5">
          <button @click="onConfirm" class="bg-mifiblue p-1.5 text-white text-sm font-bold flex-1">
            Yes
          </button>
          <button @click="onCancel" class="bg-gray-200 p-1.5 font-bold text-sm flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfirmModal",
  props: {
    text: String,
  },
  methods: {
    onConfirm() {
      this.$emit("onConfirm");
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>

<style lang="scss">
.confirm-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .overlay {
    top: 0;
    left: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  .modal {
    position: relative;
    z-index: 51;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
