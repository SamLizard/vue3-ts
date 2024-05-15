<template>
  <div>
    <date-picker-usage />
    <time-picker-usage />
    <language-selection />
    <!-- <popup-structure ref="testPopup" :title="$t('popup')" :proceed="proceed">
      <template v-slot:content>
        <div class="mb-5">
          <v-icon class="my-5" size="5rem">add</v-icon>
        </div>
      </template>
    </popup-structure> -->
    <!-- <v-btn @click="$refs.testPopup.show()" :title="$t('regularPopup')">{{$t("show")}}</v-btn> -->
    <v-btn @click="openSweetalert" :title="$t('sweetalertPopup')">{{$t("show")}}</v-btn>
  </div>
</template>

<script setup lang="ts">
import DatePickerUsage from "../componentsUsages/DatePickerUsage.vue";
import TimePickerUsage from "../componentsUsages/TimePickerUsage.vue";
import LanguageSelection from "../components/LanguageSelection.vue";
// import PopupStructure from "../components/PopupStructure.vue";

// const proceed = () => {
//     alert("You made it!");
// };

import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const openSweetalert = () => {
  Swal.fire({
      title: t("confirmationQuestion"),
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t("proceed")}`,
      cancelButtonText: `${t("cancel")}`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t("deleted") + "!",
          text: t("deletedItemMessage", {itemName: t("item.file")}),
          icon: "success",
          confirmButtonText: t("ok"),
        });
      }
    });
  };
</script>
