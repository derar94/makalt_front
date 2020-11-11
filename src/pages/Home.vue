<template>
  <v-main>
    <!-- Loader -->
    <loader v-if="loading"></loader>
    <v-row>
      <v-col xl="3" lg="3">
        <v-btn>
          Here Goes Ads
        </v-btn>
      </v-col>
      <v-col xl="6" lg="6">
        <single-article
          v-for="(article, index) in homeData.data"
          :key="index"
          :data="article"
        >
        </single-article>
      </v-col>
      <v-col xl="3" lg="3">
        <v-btn>
          Here Goes Ads
        </v-btn>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "../components/loader";
import SingleArticle from "../components/SingleArticle";

export default {
  components: {
    Loader,
    SingleArticle,
  },
  mounted() {
    this.getHomeContent();
  },
  computed: {
    ...mapGetters({
      loading: "home/loading",
      homeData: "home/homeData",
    }),
  },
  methods: {
    ...mapActions({
      getHomeContent: "home/getHomeContent",
    }),
  },
};
</script>
