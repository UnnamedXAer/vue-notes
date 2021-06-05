<template>
  <div
    class="d-flex flex-row justify-content-start align-items-center flex-wrap"
  >
    <div v-for="pic in pictures" :key="pic.id" class="pic-wrapper">
      <b-img
        @click="remove(pic.id)"
        class="pic"
        thumbnail
        fluid
        :src="
          pic.data.startsWith('data:image')
            ? pic.data
            : 'data:image/png;base64,' + pic.data
        "
        alt="Image"
      ></b-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pictures: Array,
  },
  methods: {
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style>
.pic {
  min-height: 6rem;
  max-height: 9rem;
  max-width: 7rem;
}
.pic-wrapper {
  margin: 0.7rem;
}
</style>