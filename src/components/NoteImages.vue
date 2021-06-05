<template>
  <b-container class="container-sm mb-5 mt-3">
    <b-carousel
      id="details_note__carousel"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      controls
    >
      <b-carousel-slide v-for="pic in pics" v-bind:key="pic.id">
        <template v-slot:img>
          <img
            class="d-block class-name"
            style="margin-left: auto; margin-right: auto"
            height="480"
            :src="pic.data"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  props: {
    pics: Array,
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>