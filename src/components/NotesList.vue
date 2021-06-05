<template>
  <section>
    <b-container fluid class="d-flex justify-content-center flex-row flex-wrap">
      <b-alert :show="notesFetched && notes.length === 0" variant="info"
        >Nothing to show</b-alert
      >

      <b-card
        v-for="note in notes"
        :key="note.id"
        :title="note.title"
        :img-src="
          note.pictures.length > 0
            ? note.pictures[0].data
            : 'https://picsum.photos/200/300?grayscale&blur'
        "
        :img-alt="note.title"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2 __card"
      >
        <b-card-text>
          <p>
            Created at: <small>{{ note.createdAt.toLocaleString() }}</small>
          </p>
          <p>
            Status <small>{{ note.status }}</small>
          </p>
        </b-card-text>

        <b-button href="#" variant="primary" @click="noteClickHandler(note.id)"
          >Open</b-button
        >
      </b-card>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    notes: Array,
    notesFetched: Boolean,
  },
  methods: {
    noteClickHandler(id) {
      this.$router.push({
        name: "NoteDetails",
        params: {
          noteId: id,
        },
      });
    },
  },
};
</script>

<style>
.__card img {
  max-height: 15rem;
}
.__card {
  margin: 1rem 1.5rem;
}
.__card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
</style>