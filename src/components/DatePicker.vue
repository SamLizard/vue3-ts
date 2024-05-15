<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y max-width="290px" min-width="290px">
      <template #activator="{ props }">
        <v-text-field v-bind="{ ...$attrs, ...props }" readonly validate-on="input lazy"
          :model-value="computedDateFormatted" :rounded="rounded" :density="density" :variant="varient"
          hide-details="auto">
          <template #append-inner>
            <v-icon :color="iconColor">mdi-calendar</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-date-picker :model-value="date" @update:model-value="close($event)" :locale="$i18n.locale" lazy hide-header
        :min="min" :max="max" :allowed-dates="allowedDates" :show-adjacent-months="showAdjacentMonths"
        v-show="menu"></v-date-picker>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, computed } from 'vue';

defineOptions({
  inheritAttrs: false
})

const date = defineModel<Date>({
  default: new Date()
});

defineProps({
  showAdjacentMonths: {
    type: Boolean,
    default: true,
  },
  iconColor: {
    type: String,
    required: false,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  density: {
    validator: (value: any) => {
      return [null, 'default', 'comfortable', 'compact'].includes(value);
    },
    type: String as () => null | 'default' | 'comfortable' | 'compact',
    default: 'comfortable',
  },
  varient: {
    validator: (value: any) => {
      return ['filled', 'outlined', 'plain', 'underlined', 'solo', 'solo-inverted', 'solo-filled'].includes(value);
    },
    type: String as () => 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled',
    default: 'solo',
  },
  min: {
    type: String,
    required: false,
    // default: (new Date()).toISOString().substring(0, 10)
  },
  max: {
    type: String,
    required: false,
    // default: "2076-12-31", // use toISOString on js date
  },
  allowedDates: {
    type: Function,
    required: false,
  },
});


// let dateAsDate: Ref<Date> = ref(new Date());
// let date: Ref<Date> = ref(new Date());
// let dateFormatted: Ref<string | null> = ref() as Ref<string | null>;
let menu: Ref<boolean> = ref(false);

import { useI18n } from 'vue-i18n';
const i18n = useI18n();

const computedDateFormatted = computed((): string | null => {
  return date.value.toLocaleDateString(i18n.locale.value);
});

const close = async (newValue: Date) => {
  menu.value = false;
  date.value = newValue;
}

// const formatDate = (date: Date): string | null => {
//   if (!date) return null;

//   const [year, month, day] = date.split("-");
//   return `${day}/${month}/${year}`;
// };

// const emit = defineEmits<{ 'update:modelValue': [date: Date | null] }>();

// const close = (newValue: any, isMenuActive: Ref<boolean>) => {
//   // emit("update:modelValue", date.value);
//   // date.value = ;
//   isMenuActive.value = false;
//   // date.value = newValue;
// };

// watch(() => modelValue.value, (newVal: Date) => {
//   date.value = newVal;
//   // dateFormatted.value = formatDate(date.value);
// }, { immediate: true });
</script>
<style scoped lang="scss">
.v-text-field :deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
}

// .v-date-picker :deep(.v-date-picker-month__days) {
//   min-width: 290px;
// }
// .v-date-picker :deep(.v-date-picker-month__day) {
//   height: 32px;
//   width: 32px;
//   .v-btn {
//     --v-btn-height: 16px;
//     --v-btn-size: 0.75rem;
//   } 
//   .v-date-picker-month__weekday {
//     font-size: 0.75rem;
//   }
// }</style>