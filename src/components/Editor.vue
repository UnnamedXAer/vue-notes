<template>
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  />
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    "quill-editor": quillEditor,
  },
  props: {
    parentContent: String,
  },
  data() {
    return {
      content: "",
      editorOption: {
        debug: "error",
        placeholder: "Compose an epic...",
      },
    };
  },
  watch: {
    parentContent(newVal, oldVal) {
      this.content = newVal;
    },
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.content = html;
      this.$emit("descChanged", html);
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>
<style >
.ql-editor {
  min-height: 5rem;
}
</style>