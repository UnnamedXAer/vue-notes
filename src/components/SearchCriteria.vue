<template>
  <form class="container-sm mb-4 __container" @submit.prevent="submitHandler">
    <b-row>
      <b-col>
        <!-- we could do auto search on onchange event -->
        <b-form-group
          label="Title"
          label-for="Title-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="mb-1"
        >
          <b-input-group size="sm">
            <b-form-input
              id="title-input"
              v-model="title"
              type="search"
              placeholder="Type here"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!title" @click="title = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          label="Satus"
          label-for="status-select"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-select
            id="status-select"
            v-model="status"
            :options="['Active', 'Inactive', 'ALL']"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <b-alert
              style="margin-top: 1rem"
              show
              v-if="error !== null"
              variant="danger"
              >{{ error }}</b-alert
            >
          </b-col>
        </b-row>
        <b-button
          type="submit"
          variant="success"
          class="m-3"
          :disabled="loading"
        >
          <b-spinner v-show="loading" small type="grow"></b-spinner>
          Search
        </b-button>
      </b-col>
    </b-row>
    <hr />
  </form>
</template>

<script>
const comp = {
  computed: {
    loading() {
      return this.$store.state.public.loading;
    },
    error() {
      return this.$store.state.public.error;
    },
  },
  methods: {
    submitHandler() {
      this.$emit("search");
    },
  },
};

for (const prop of ["title", "sortDirection", "status"]) {
  comp.computed[prop] = {
    get() {
      return this.$store.state.public.searchValues[prop];
    },
    set(value) {
      this.$store.commit("setFormValue", { field: prop, value });
    },
  };
}

export default comp;
</script>

<style>
.__container {
  max-width: 700px !important;
}
</style>