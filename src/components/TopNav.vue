<template>
  <div>
    <v-app-bar flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>مقالات برمجة</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="changeTheme()">
        <v-icon>{{$vuetify.theme.dark ? 'mdi-flashlight' : 'mdi-flashlight-off'}}</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app right>
        <nav-auth-panel></nav-auth-panel>
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item :to="'/'" link>
            <v-list-item-title>الرئيسية</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>المقالات</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>الاسئلة</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/add'" link>
            <v-list-item-title>إضافة مقالة</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import NavAuthPanel from "./NavAuthPanel";
export default {
  components: {
      NavAuthPanel
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },

  },
};
</script>
