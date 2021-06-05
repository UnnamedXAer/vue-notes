<template>
  <main class="note-details container-md mt-4">
    <b-alert :show="error !== null" variant="danger">
      {{ error }}
    </b-alert>
    <b-alert :show="loading" variant="info">
      <b-spinner variant="info" small></b-spinner> loading...
    </b-alert>
    <b-container v-if="note">
      <h1>{{ note.title }}</h1>
      <section>
        <p>{{ note.status }}</p>
        <div>
          <p>
            <strong>Created at: </strong>{{ note.createdAt.toLocaleString()
            }}<br />
            <strong>Last modified at: </strong
            >{{ note.editedAt.toLocaleString() }}
          </p>
        </div>
      </section>
      <NoteImages v-if="note.pictures.length > 0" :pics="note.pictures"></NoteImages>
      <article class="__desc_wrapper mb-5">
        <div v-html="note.desc"></div>
      </article>
    </b-container>
  </main>
</template>

<script>
import NoteImages from "./NoteImages";
export default {
  components: {
    NoteImages,
  },
  computed: {
    note() {
      return this.$store.state.details.note;
    },
    loading() {
      return this.$store.state.details.loading;
    },
    error() {
      return this.$store.state.details.error;
    },
  },
  mounted() {
    const { noteId } = this.$router.currentRoute.params;
    this.$store.dispatch("fetchNoteDetails", noteId);
  },
};
</script>

<style>
.__desc_wrapper {
  border: 1px solid #ccc;
  padding: 1rem;
}
</style>