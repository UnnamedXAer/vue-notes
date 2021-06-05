import { fetchNoteDetails } from "../api/notes";
const detailsStore = {
  state: () => ({
    note: null,
    error: null,
    loading: null,
    notesFetched: false
  }),
  mutations: {
    setDetailsError(state, err) {
      state.error = err;
    },
    setDetailsLoading(state, loading) {
      state.loading = loading;
    },
    setDetailsNotesFetched(state, fetched) {
      state.notesFetched = fetched;
    },
    setDetailsNote(state, note) {
      state.note = note;
    }
  },
  actions: {
    async fetchNoteDetails(ctx, id) {
      ctx.commit("setDetailsLoading", true);
      ctx.commit("setDetailsError", null);
      try {
        const data = await fetchNoteDetails(id);
        ctx.commit("setDetailsNote", data);
      } catch (err) {
        ctx.commit("setDetailsError", err.message);
      }
      ctx.commit("setDetailsLoading", false);
      ctx.commit("setDetailsNotesFetched", true);
    }
  }
};

export default detailsStore;
