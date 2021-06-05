<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Your Notes</h1>
    <b-alert show v-if="notesError.length > 0" variant="danger"
      >Error: {{ notesError }}</b-alert
    >
    <section class="__notes_table_wrapper">
      <b-table
        stacked="lg"
        responsive
        id="notes-table"
        ref="notesTable"
        no-select-on-click
        selectable
        select-mode="single"
        :busy="isBusy"
        :items="notesProvider"
        :current-page="currentPage"
        :fields="fields"
      >
        <template #table-busy>
          <div class="text-center text-info my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(actions)="data">
          <b-button
            variant="outline-primary"
            @click="populateNoteToEdit(data.item.id)"
            style="cursor: pointer; margin-right: 1rem"
            size="sm"
          >
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button
            variant="outline-danger"
            @click="deleteNote(data.item.id)"
            size="sm"
          >
            <b-icon-trash></b-icon-trash>
          </b-button>
        </template>
      </b-table>
    </section>
    <b-pagination
      aria-controls="notes-table"
      v-model="currentPage"
      :total-rows="total"
      :per-page="pageSize"
      first-number
      last-number
      size="sm"
      align="right"
    ></b-pagination>
    <NoteForm
      :model="model"
      :loading="formLoading"
      :error="formError"
      v-on:save="onSave"
    ></NoteForm>
  </div>
</template>

<script>
import NoteForm from "./NoteForm";
import { fetchLoggedUserNotes } from "../api/notes";
import config from "../config/config";
import Note from "../models/note";
export default {
  components: {
    NoteForm,
  },
  data() {
    return {
      notesError: "",
      pageSize: config.notesManagerPageSize,
      currentPage: 1,
      isBusy: false,
      fields: ["title", "createdAt", "editedAt", "status", "actions"],
    };
  },
  computed: {
    total() {
      return this.$store.state.manager.total === -1
        ? 0
        : this.$store.state.manager.total;
    },
    notesLoading() {
      return this.$store.state.manager.notesLoading[this.currentPage - 1];
    },
    model() {
      return this.$store.state.manager.model;
    },
    formError() {
      return this.$store.state.manager.formError;
    },
    notes() {
      return this.$store.state.manager.notes;
    },
    formLoading() {
      return this.$store.state.manager.formLoading;
    },
  },

  watch: {
    notes() {
      this.$refs.notesTable.refresh();
    },
    model() {
      this.$refs.notesTable.clearSelected();
      const id = this.model.id;
      if (id) {
        const idx = this.notes[this.currentPage - 1].findIndex(
          (x) => x.id === id
        );
        if (idx > -1) {
          this.$refs.notesTable.selectRow(idx);
        }
      }
    },
  },
  beforeDestroy() {
    this.$store.commit("clearModel");
  },
  methods: {
    async notesProvider(ctx) {
      this.isBusy = true;

      const notes = await (async () => {
        const pageIdx = ctx.currentPage - 1;
        if (this.$store.state.manager.notes[pageIdx]) {
          return this.$store.state.manager.notes[pageIdx];
        }
        this.notesError = "";

        try {
          const data = await fetchLoggedUserNotes(
            this.$store.state.manager.loggedUserId,
            pageIdx
          );
          this.$store.commit("setNotes", {
            notes: data.notes,
            total: data.total,
            pageIdx,
          });
          return data.notes;
        } catch (err) {
          this.notesError = err.message;
          return [];
        }
      })();

      this.isBusy = false;
      return mapNotesToDisplay(notes);
    },
    populateNoteToEdit(id) {
      this.$store.commit(
        "setModel",
        this.$store.state.manager.notes[this.currentPage - 1].find(
          (x) => x.id === id
        )
      );
    },
    onSave(model) {
      this.saveNote(model);
    },
    async saveNote(model) {
      this.formLoading = true;
      if (model.id) {
        await this.$store.dispatch("updateNote", model);
      } else {
        this.currentPage = 1;
        await this.$store.dispatch("createNote", model);
      }
      this.formLoading = false;
    },
    async deleteNote(id) {
      if (confirm("Are you sure you want to delete this note?")) {
        await this.$store.dispatch("deleteNote", id);
      }
    },
  },
};

/**
 * @param {Array.<Note>} notes
 */
function mapNotesToDisplay(notes) {
  return notes.map((n) => ({
    id: n.id,
    title: n.title,
    status: n.status,
    createdAt: n.createdAt.toLocaleString(),
    editedAt: n.editedAt.toLocaleString(),
    actions: "",
  }));
}
</script>
<style>
#notes-table tr:not(:first-child):hover {
  background-color: #eee;
}

@media screen and (min-width: 992px) {
  .__notes_table_wrapper {
    min-height: 285px;
  }
}
</style>