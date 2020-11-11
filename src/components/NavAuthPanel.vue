<template>
  <div>
    <v-list v-if="authenticated">
      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      -->

      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn  icon v-bind="attrs" v-on="on" class="mx-2">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link>
            <v-list-item-title @click="signOut()"
              >تسجيل الخروج</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-avatar>
        <v-img src="https://randomuser.me/api/portraits/women/80.jpg"></v-img>
      </v-avatar>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-if="!authenticated" class="d-flex justify-center py-4">
      <v-btn color="success" :to="'/login'" nav>Login</v-btn>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  watch: {
    authenticated: function() {
      if (this.authenticated) {
        this.$router.replace({ name: "Home" });
      }
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      signOut: "auth/signOut",
    }),
  },
};
</script>
