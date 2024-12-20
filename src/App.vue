<template>
  <v-app>
    <v-navigation-drawer
      app
      color="blue-grey lighten-5"
      :temporary="$vuetify.breakpoint.smAndDown"
      class="top-nav"
    >
      <v-list>
        <v-list-item v-for="(item, index) in navItems" :key="index">
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.link" class="nav-link">
                {{ item.title }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navItems = ref([
  { title: "One", link: "/one", icon: "mdi-home" },
  { title: "Two", link: "/two", icon: "mdi-folder" },
]);
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-link:hover {
  color: #1976d2;
  text-decoration: underline;
}

.v-list-item {
  transition: background-color 0.3s;
}

.v-list-item:hover {
  background-color: #e3f2fd;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.v-main {
  margin-top: 64px;
}

@media (max-width: 600px) {
  .v-container {
    padding: 8px;
  }

  .v-list-item-title {
    font-size: 14px;
  }
}
</style>
