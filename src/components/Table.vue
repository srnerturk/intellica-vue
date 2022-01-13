<template>
  <div class="table-content">
    <div class="t-header bg-white rounded-lg p-5">
      <div class="grid grid-cols-3 custom-gap">
        <input
          class="border rounded-md pl-5 outline-none"
          type="text"
          placeholder="mac address,SSID,MSISDN"
        />
        <div class="filter-bar">
          <div class="grid grid-cols-4 list-filter-items">
            <button class="active">Today</button>
            <button>Last Week</button>
            <button>Last Month</button>
            <button>New</button>
          </div>
        </div>
        <div class="list-type flex items-center justify-end">
          <a class="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#e3801e"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-grid"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="table w-full hover:table-auto">
      <thead class="h-40 mb-20 w-full bg-bordergray">
        <tr>
          <th></th>
          <th>Mac Address</th>
          <th>MSISDN</th>
          <th>SSID</th>
          <th>Last Reported Date</th>
          <th>Last Reported Channel</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white top-5 relative">
        <tr class="hover:bg-gray-200" v-for="item in tableData" :key="item.id">
          <td class="border border-bordergray p-1 text-center">
            <input type="checkbox" />
          </td>
          <td class="border border-bordergray p-1 text-center">
            {{ item.mac }}
          </td>
          <td class="border border-bordergray p-1 text-center">
            {{ item.msi }}
          </td>
          <td class="border border-bordergray p-1 text-center">
            {{ item.ssid }}
          </td>
          <td class="border border-bordergray p-1 text-center">
            {{ item.last_reported_date }}
          </td>
          <td class="border border-bordergray p-1 text-center">
            {{ item.last_reported_channel }}
          </td>
          <td class="border border-bordergray p-1 text-center">
            <div class="actions grid grid-cols-3">
              <a>
                <img src="@/assets/icons/info.svg" />
              </a>
              <a>
                <img src="@/assets/icons/edit.svg" />
              </a>
              <a>
                <img src="@/assets/icons/trash.svg" />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </div>

    <div
      class="
        pager-actions
        bg-mifiblue
        w-full
        h-40
        mt-5
        flex
        justify-end
        items-center
      "
    >
      <span class="text-white result-text">Showing 10 of 100 result</span>
      <select class="select-page">
        <option value="1">1</option>
        <option value="1">2</option>
      </select>
      <div class="arrows flex">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-right"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomTable",
  props: {
    tableData: Array,
  },
};
</script>

<style lang="scss">
.custom-gap {
  gap: 3rem;
}
.list-filter-items {
  button {
    font-weight: bold;
    font-size: 14px;
    height: 34px;
    margin: 5px;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid #e3801e;
      color: #e3801e;
    }
  }
  .active {
    line-height: 24px;
    border-bottom: 2px solid #e3801e;
  }
}
.pager-actions {
  * {
    margin: 0px 5px;
  }
  .result-text {
    font-size: 13px;
  }
  .arrows {
    a {
      cursor: pointer;
      margin: 5px;
    }
  }
}
.list-type {
  a {
    margin: 5px;
    cursor: pointer;
  }
  .active {
    svg {
      stroke: #e3801e;
    }
  }
}
</style>
