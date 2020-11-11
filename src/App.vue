<template>
  <v-app>
    <TopNav />
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import TopNav from "./components/TopNav";
export default {
  components: {
    TopNav,
  },
  mounted() {},
};
</script>
