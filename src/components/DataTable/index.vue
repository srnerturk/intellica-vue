<template>
  <div class="table-content">
    <table class="table w-full hover:table-auto text-sm">
      <thead class="h-40 mb-20 w-full bg-bordergray">
        <tr class="h-40 rounded-t-lg">
          <th v-for="th in tableData.thead" :key="th" class="text-sm p-2">{{ th }}</th>
          <th class="rounded-tr-lg">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white top-5 relative">
        <tr class="hover:bg-gray-200 pointer" v-for="item in tableData.data" :key="item.id">
          <td
            class="border-b border-bordergray p-2 text-center"
            :key="key"
            v-for="(value, key) in item"
          >
            {{ value }}
          </td>
          <td class="border-b border-bordergray p-2 text-center actions space-x-2">
            <button @click.stop="goToMap(item.id)" v-if="map">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-map"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
            </button>
            <!-- <button v-if="detail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
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
            </button> -->
            <button @click.stop="onEdit(item.id)" v-if="editable" class="edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-edit"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button @click.stop="onRemove(item.id)" v-if="deletable" class="delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-trash-2"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="pageble"
      class="pager-actions bg-mifiblue w-full h-40 mt-10 flex justify-end items-center rounded-b-lg"
    >
      <span class="text-white text-sm result-text"
        >Showing {{ tableData.data.length }}
        record in
        {{ tableData.totalElements }} results</span
      >
      <select
        v-model="currentPage"
        @change="onPageChange"
        class="select-page min-w-[50px] text-center"
      >
        <option :key="n" v-for="n in tableData.pageCount" :value="n">{{ n }}</option>
      </select>
      <div class="arrows flex">
        <a @click="changePage(getPage - 1)">
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
        <a @click="changePage(getPage + 1)">
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
  name: "DataTable",
  props: {
    tableData: Object,
    editable: Boolean,
    deletable: Boolean,
    pageble: Boolean,
    detail: Boolean,
    map: Boolean,
    url: String,
  },
  data() {
    return {
      currentPage: this.$route.query.page,
    };
  },
  computed: {
    getPage() {
      return parseInt(this.$route.query.page, 0);
    },
  },
  methods: {
    onEdit(id) {
      this.$emit("onEdit", id);
    },
    onRemove(id) {
      this.$emit("onRemove", id);
    },
    goToMap(id) {
      this.$emit("goToMap", id);
    },
    onPageChange(e) {
      const page = parseInt(e.target.value, 0);
      this.$router.push({ name: this.url, query: { page } });
    },
    changePage(page) {
      if (page > 0 && page <= this.tableData.pageCount) {
        this.$router.push({ name: this.url, query: { page } });
      }
    },
  },
};
</script>

<style lang="scss">
.custom-gap {
  gap: 3rem;
}
.pointer {
  cursor: pointer;
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
.actions {
  button {
    margin: 5px;
    cursor: pointer;
  }
}
</style>
