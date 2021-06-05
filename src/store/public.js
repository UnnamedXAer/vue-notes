import { fetchPublicNotes } from "../api/notes";

const publicStore = {
  state: () => ({
    notes: [],
    notesFetched: false,
    currentPage: 1,
    total: -1,
    loading: false,
    error: null,
    searchValues: { title: "", sortDirection: "desc", status: "Active" },
    criteriaChanged: false
  }),
  getters: {
    publicNotes: state => {
      return state.notes[state.currentPage - 1];
    },
    publicPagination: state => ({
      currentPage: state.currentPage,
      total: state.total
    })
  },
  mutations: {
    setFormValue(state, { field, value }) {
      state.searchValues = { ...state.searchValues, [field]: value };
      state.criteriaChanged = true;
    },
    setNotes(state, { pageIdx, notes, total }) {
      if (state.criteriaChanged) {
        state.notes = [];
      }
      state.criteriaChanged = false;
      const updatedNotes = [...state.notes];
      updatedNotes[pageIdx] = notes;
      state.notes = updatedNotes;
      state.total = total;
    },
    setCurrentPage(state, value) {
      state.currentPage = value;
    },
    setError(state, msg) {
      state.error = msg;
    },
    setNotesFetched(state) {
      state.notesFetched = true;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async fetchPublicNotes(ctx) {
      const payload = {
        title: ctx.state.searchValues.title,
        sortDirection: ctx.state.searchValues.sortDirection,
        status: ctx.state.searchValues.status,
        pageIdx: ctx.state.currentPage - 1
      };

      ctx.commit("setLoading", true);
      ctx.commit("setError", null);
      try {
        const data = await fetchPublicNotes(payload);
        ctx.commit("setNotes", data);
      } catch (err) {
        ctx.commit("setError", err.message);
      }
      ctx.commit("setLoading", false);
      ctx.commit("setNotesFetched");
    }
  }
};

export default publicStore;
