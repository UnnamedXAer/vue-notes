<template>
  <b-container class="container-lg mt-4">
    <SearchCriteria v-on:search="search"></SearchCriteria>
    <b-pagination
      v-model="currentPage"
      :total-rows="total"
      :per-page="pageSize"
      first-number
      last-number
      size="sm"
      align="right"
    ></b-pagination>
    <NotesList :notes="notes" :notesFetched="notesFetched"></NotesList>
  </b-container>
</template>

<script>
import config from "../config/config";
import NotesList from "./NotesList.vue";
import SearchCriteria from "./SearchCriteria.vue";
export default {
  data() {
    return { pageSize: config.publicPageSize };
  },
  components: { NotesList, SearchCriteria },
  watch: {
    currentPage() {
      if (!this.$store.getters.publicNotes) {
        this.search();
      }
    },
  },
  mounted() {
    if (!this.$store.state.public.notesFetched) {
      this.search();
    }
  },
  computed: {
    notes() {
      const notes = this.$store.getters.publicNotes;
      if (!notes) {
        return [];
      }
      return notes;
    },
    currentPage: {
      get() {
        return this.$store.state.public.currentPage;
      },
      set(value) {
        this.$store.commit("setCurrentPage", value);
      },
    },
    total() {
      return this.$store.state.public.total;
    },
    notesFetched() {
      return this.$store.state.public.notesFetched;
    },
  },
  methods: {
    search() {
      this.$store.dispatch("fetchPublicNotes");
    },
  },
};
</script>