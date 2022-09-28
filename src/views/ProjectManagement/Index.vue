<template>
  <div class="page">
    <confirm-modal
      @onCancel="onCancel"
      @onConfirm="onConfirm"
      v-if="modalIsOpen"
      text="Are you sure you want to delete?"
    />
    <h1 class="page-title">Project Management</h1>
    <div class="tester-list bg-white rounded-lg mb-10 p-5">
      <div class="tester-header flex justify-between">
        <div class="left">
          <div class="search-box py-2">
            <p class="font-bold text-sm">Search Project</p>
            <div class="search flex h-[40px] items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                class="min-w-[250px] text-sm pl-2 h-[25px] outline-none"
                type="text"
                placeholder="id username or location"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <router-link class="action-link" :to="{ name: 'ProjectAdd' }">
            <span class="text-lg font-bold text-mifiblue">Add New Project</span>
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
          </router-link>
        </div>
      </div>
      <data-table
        @onEdit="editProject"
        @onRemove="removeProject"
        @goToMap="goToMap"
        :pageble="true"
        :editable="true"
        :map="true"
        :detail="true"
        :deletable="true"
        :tableData="projects"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ConfirmModal from "@/components/ConfirmModal/index.vue";
import DataTable from "@/components/DataTable/index.vue";

export default {
  name: "ProjectList",
  components: {
    DataTable,
    ConfirmModal,
  },
  data() {
    return {
      modalIsOpen: false,
      removedId: 0,
      projects: {
        thead: ["Project ID", "Project Name", "Test Status", "Total Floorplan", "Date of Creation"],
        data: [],
        totalElements: 0,
        pageCount: 0,
        pageSize: 0,
      },
    };
  },
  methods: {
    ...mapActions(["fetchProjectList", "deleteTester"]),
    editProject(id) {
      this.$router.push({ name: "ProjectEdit", query: { id } });
    },
    goToMap(id) {
      this.$router.push({ name: "EditFloorPlan", query: { id } });
    },
    removeProject(id) {
      this.modalIsOpen = true;
      this.removedId = id;
    },
    onCancel() {
      this.modalIsOpen = false;
    },
    onConfirm() {
      this.deleteTester(this.removedId).then(() => {
        this.modalIsOpen = false;
        this.listProjects();
      });
    },
    listProjects() {
      this.fetchProjectList().then((r) => {
        const projects = [];
        r.forEach((project) => {
          const user = {
            id: project.id,
            name: project.name,
            status: project.status,
            floorPlanCount: 0,
            created_at: project.createdAt,
          };
          projects.push(user);
        });
        this.projects.data = projects;
        this.projects.totalElements = r.totalElements;
        this.projects.pageCount = r.totalPages;
        this.projects.pageSize = r.size;
      });
    },
  },
  mounted() {
    this.listProjects();
  },
};
</script>
