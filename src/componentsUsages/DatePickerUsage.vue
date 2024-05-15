<template>
  <v-container>
    <v-row>
      <v-col cols="4" lg="3">
        <date-picker v-model="date" :allowedDates="isAllowedDate" :rules="requiredFieldRule" iconColor="#53A5EB"
          :language="$i18n.locale" varient="outlined" density="compact" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRules } from '../composables/rules';
const { requiredFieldRule } = useRules();
import { type Ref, ref } from "vue";
import DatePicker from "../components/DatePicker.vue";

type weekDay = {
  'SUN'?: number,
  'MON'?: number,
  'TUE'?: number,
  'WED'?: number,
  'THU'?: number,
  'FRY'?: number,
  'SAT'?: number
}

// const allowedDaysInWeek = { 'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRY': 5, 'SAT': 6 };
const allowedDaysInWeek: weekDay = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4 };

let date: Ref<Date> = ref(new Date());

const isAllowedDate = (dateString: string) => {
  const date: Date = new Date(dateString);
  const dayOfWeek: number = date.getDay();

  return Object.values(allowedDaysInWeek).includes(dayOfWeek);
}
</script>
