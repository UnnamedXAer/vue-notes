<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" class="__navbar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Vue Notes</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/notes-manager">Notes Manager</b-nav-item>
          <b-nav-item href="#" @click.prevent="login" v-if="!true"
            >Login</b-nav-item
          >
          <b-nav-item href="#" @click.prevent="logout" v-else
            >Logout</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
.__navbar {
  padding-left: 1rem;
}
</style>