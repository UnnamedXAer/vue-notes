<template>
  <b-card :title="model.id ? 'Edit Note ID#' + model.id : 'New Note'">
    <form @submit.prevent="saveNote" @reset.prevent="resetForm">
      <b-form-group label="Title">
        <b-form-input
          type="text"
          v-model="model.title"
          placeholder="Note title"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Desc">
        <Editor
          :parentContent="model.desc"
          v-on:descChanged="descChangeHandler"
        ></Editor>
      </b-form-group>
      <b-form-group label="Status">
        <b-form-select v-model="model.status" class="mb-3">
          <b-form-select-option value="Active">Active</b-form-select-option>
          <b-form-select-option value="Inactive">Inactive</b-form-select-option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Add Files">
        <b-form-file
          id="uplod-file"
          ref="file"
          size="lg"
          accept="image/*"
          v-model="newFiles"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          multiple
        ></b-form-file>
      </b-form-group>
      <b-form-group label="Files" v-if="model.pictures.length > 0">
        <FilesPreview
          :pictures="model.pictures"
          v-on:remove="removeFile"
        ></FilesPreview>
      </b-form-group>
      <div class="__files_upload_underline"></div>
      <div>
        <b-alert v-if="error.length > 0" variant="danger">{{ error }}</b-alert>
      </div>
      <div>
        <b-btn type="submit" variant="success">
          <b-spinner v-if="loading" small type="grow"></b-spinner> Save
          Note</b-btn
        >
        <b-btn type="reset" variant="warning">
          <b-spinner v-if="loading" small type="grow"></b-spinner>Clear
          Form</b-btn
        >
      </div>
    </form>
  </b-card>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Editor from "./Editor";
import FilesPreview from "./FilesPreview";
import { fileToBase64 } from "../helpers/helpers";
export default {
  components: {
    Editor,
    FilesPreview,
  },
  data() {
    return { newFiles: [], descriptio: "" };
  },
  props: {
    model: Object,
    error: String,
    loading: Boolean,
  },
  watch: {
    async newFiles() {
      if (this.newFiles.length === 0) {
        return;
      }
      try {
        const filesData = await Promise.all(
          this.newFiles.map((f) => fileToBase64(f))
        );

        this.model.pictures = this.model.pictures.concat(
          filesData.map((f) => ({ data: f, id: uuidv4() }))
        );
      } catch (err) {
        console.log(err);
        this.$store.commit("setFormError", "Failed to load image.");
      }
      this.newFiles = [];
    },
  },
  mounted() {
    //fixig bug in styles
    this.$refs.file.$el.firstChild.style.display = "none";
  },
  methods: {
    removeFile(id) {
      const ok = confirm("Are you sure you want to delete this image?");
      if (!ok) {
        return;
      }
      this.$store.commit("modelChange", {
        prop: "pictures",
        value: this.model.pictures.filter((p) => p.id !== id),
      });
    },
    descChangeHandler(value) {
      this.$store.commit("modelChange", {
        prop: "desc",
        value,
      });
      //   this.model.desc = value;
    },
    saveNote() {
      this.$emit("save", this.model);
    },
    resetForm() {
      this.$store.commit("clearModel");
    },
  },
};
</script>

<style>
.__files_upload_underline {
  border-bottom: 1px solid #666;
  margin: 1rem;
}
.form-group .custom-file-label {
  cursor: pointer;
}
</style>