<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Noto Sans", sans-serif;
}
.page-title {
  font-size: 28px;
  color: #1c2749;
  font-weight: bold;
  margin-bottom: 5px;
}
.action-link {
  @apply flex space-x-2 p-2 rounded-lg items-center justify-center;
  transition: all 0.5s;
}
.action-link:hover {
  span {
    color: #fff;
  }
  svg {
    stroke: #fff;
  }

  background: #1c2749;
}
.form-element{
  input{
    @apply
    text-sm
  }
}
.form-g {
  font-family: "Noto Sans", sans-serif;
  display: flex;
  flex-direction: column;
  .error {
    color: red;
    font-size: 11px;
    padding-left: 2px;
    padding-top: 5px;
  }
  label {
    @apply text-sm font-bold mb-2;
  }
  input,
  select,
  textarea {
    @apply text-sm rounded pl-2 outline-none;
    background: #e4ecf5;
    min-width: 250px;
    height: 36px;
  }
  textarea {
    height: 75px;
  }
}
</style>
