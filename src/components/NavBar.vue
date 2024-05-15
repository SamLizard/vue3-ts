<!-- <template>
  <v-app-bar class="navbar">
    <div class="nabar-content">
      <div class="title">
        <strong>{{$t('title')}}</strong>
      </div>
      <div class="links">
        <v-btn v-for="route in router.getRoutes()" 
              :key="route.path"
              :color="route.path === router.currentRoute.value.path ? 'primary' : ''" :to="route.path">
          {{ $t(`routes.${route.name?.toString()}`) }}
        </v-btn>
         // v-show="showRoute(route)"
      </div>
    </div>
  </v-app-bar>
</template> -->
<!-- <template>
 <v-app-bar app color="#f2f2f2">
   <v-toolbar-title>
     <strong>{{ $t("title") }}</strong>
   </v-toolbar-title>
   <v-spacer></v-spacer>
   <v-btn
     v-for="route in router.getRoutes()"
     :key="route.path"
     :color="route.path === router.currentRoute.value.path ? 'primary' : ''"
     :to="route.path"
     >
     v-show="showRoute(route)"
     {{ $t("routes." + route.name?.toString()) }}
   </v-btn>
 </v-app-bar>
</template> -->


<!-- <script setup lang="ts">
// add log in, routes (logout and info) only for logged in users
// info - add swal, personalDetails
// i18n for all the names (btn - $t("route." + route.name))

// import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n';
import router from '../router/router';
import { onMounted } from 'vue';
const i18n = useI18n();
onMounted(() => {
  i18n.locale.value = 'he';
  console.log(i18n.messages.value)
});
// import { computed } from 'vue/dist/vue.js';
// const userStore = useUserStore();

// const props = defineProps({
//   personalDetails: Object
// });

// const isLoggedIn = computed((): boolean => {
//   return userStore.userId !== undefined;
// })

// const showRoute = (route): boolean => {
//   return this.isLoggedIn ? !allowedRoutes.includes(route.name) || route.name === "home" : allowedRoutes.includes(route.name);
// }

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: #f2f2f2; /*#f8f9fa;*/
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.title {
  flex: 2;
}

.links {
  flex: 8;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  padding-left: 20px;
}

.user-info {
  flex: 3;
  display: flex;
  justify-content: space-evenly;
}

.user,
.information,
.logout,
.language-selection {
  display: flex;
  align-items: center;
  max-width: 200px;
}

.language-selection.ltr {
  margin-left: auto;
}

.language-selection.rtl {
  margin-right: auto;
}

.user {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

button.active {
  color: blue;
}
</style> -->





<template>
  <v-app-bar app color="#f2f2f2" :align="$vuetify.locale.isRtl ? 'right' : 'left'" class="navbar" flat>
    <v-toolbar-title>
      <strong>{{ $t("title") }}</strong>
    </v-toolbar-title>
    <!-- <v-spacer></v-spacer> -->
    <div class="route-links-container">
      <v-btn v-for="route in router.getRoutes()" v-show="showRoute(route)" :key="route.path"
        :color="route.path === router.currentRoute.value.path ? 'primary' : ''" :to="route.path" variant="elevated"
        active-class="no-active" flex-grow>
        {{ $t("routes." + route.name?.toString()) }}
      </v-btn>
    </div>
    <v-spacer v-for="i in 3" :key="i"></v-spacer>
    <!-- <div v-if="isLoggedIn" class="user-info">
      <div class="user">
        <v-icon>mdi-account</v-icon>
        {{ $t("salutation") }} {{ userStore.userId }}
      </div>
      <div class="information">
        <v-icon @click="showUserInfo">mdi-information</v-icon>
      </div>
      <language-selection class="language-selection" :class="isLoggedIn ? '' : this.$vuetify.rtl ? 'rtl' : 'ltr'" />
      <div v-if="isLoggedIn" class="logout" @click="$emit('logout')">
        <v-icon :title="$t('logout')">mdi-logout</v-icon>
      </div>
    </div> -->
    <div>
      <v-toolbar-items>
        <div class="d-flex align-center" v-if="isLoggedIn">
          <v-icon class="mx-1">mdi-account</v-icon>
          {{ $t("salutation") }} {{ userStore.userId }}
        </div>
        <div class="d-flex align-center mx-3" v-if="isLoggedIn">
          <v-icon @click="showUserInfo">mdi-information</v-icon>
        </div>
        <language-selection :class="isLoggedIn ? '' : $vuetify.locale.isRtl ? 'rtl' : 'ltr'" />
        <div class="d-flex align-center mx-3" v-if="isLoggedIn">
          <v-icon @click="$emit('logout')">mdi-logout</v-icon>
        </div>
      </v-toolbar-items>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import LanguageSelection from './LanguageSelection.vue';

const router = useRouter();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import Swal from 'sweetalert2'

type details = {
  name: string,
  phone: string,
}

const props = defineProps<{ personalDetails: details }>();

const allowedRoutes = ['home', 'login', 'register'];

const isLoggedIn = computed(() => userStore.userId !== undefined);

const showRoute = (route: any): boolean => {
  return isLoggedIn.value
    ? !allowedRoutes.includes(route.name) || route.name === 'home'
    : allowedRoutes.includes(route.name);
};

const encodeHTML = (str: string): string => {
  var elem = document.createElement("div");
  elem.innerText = str;
  return elem.innerHTML;
};

const showUserInfo = () => {
  let details = "";
  Object.entries(props.personalDetails).forEach(([key, value]) => {
    details += t("details." + key) + ": " + encodeHTML(value as string) + "<br />";
  });
  Swal.fire({
    title: t("details.title"),
    html: '<pre class="swal2-modal">' + details + '</pre>',
    icon: "info",
    confirmButtonText: t("ok"),
  });
};
</script>
<style scoped>
.navbar {
  background-color: #f2f2f2;
  /*#f8f9fa;*/
}

.route-links-container {
  display: flex;
  justify-content: space-evenly;
  flex-grow: 0.5 !important;
  min-width: 10% !important;
  max-width: 40% !important;
}

.v-toolbar-title {
  flex-grow: 0.8;
  flex-shrink: 0.8;
  min-width: max-content !important;
}
</style>