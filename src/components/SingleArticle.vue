<template>
  <v-col>
    <v-card class="mb-4">
      <v-img src="https://cdn.hipwallpaper.com/i/11/31/H9PqCK.jpg"></v-img>
      <v-card-title>{{ data.title }}</v-card-title>
      <v-card-text>
        <div class="d-flex align-center pb-4">
          <v-avatar class="ml-2">
            <v-img
              src="https://randomuser.me/api/portraits/women/80.jpg"
            ></v-img>
          </v-avatar>
          <div class=" d-flex flex-column">
            <span class="title">{{ data.user.name }}</span>
            <span>{{ data.user.email }}</span>
          </div>
        </div>

        <div>
          {{data.body.substring(0,200)}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group>
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text>
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["data"],
};
</script>
