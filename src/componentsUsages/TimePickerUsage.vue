<template>
  <v-container>
    <v-row>
      <v-col cols="4" lg="3">
        <time-picker
          v-model="time"
          :time="time"
          :rules="requiredFieldRule"
          iconColor="#53A5EB"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TimePicker from "../components/TimePicker.vue";
import { useRules } from '../composables/rules';
const { requiredFieldRule } = useRules();

import { ref, type Ref } from "vue";

const time: Ref<string> = ref('13:00');
</script>
