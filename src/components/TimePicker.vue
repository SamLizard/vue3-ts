<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y max-width="290px" min-width="290px">
      <template #activator="{ props }">
        <v-text-field v-bind="{ ...$attrs, ...props }" readonly validate-on="input lazy" :model-value="time"
          :rounded="rounded" :density="density" :variant="varient" hide-details="auto">
          <template #append-inner>
            <v-icon :color="iconColor">mdi-clock-outline</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-time-picker :model-value="time" @update:model-value="close($event)" full-width :no-title="!withTitle"
        @change="close" @click:minute="close" :allowed-hours="allowedHours"
        :allowed-minutes="allowedMinutes"></v-time-picker>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, computed } from 'vue';

defineOptions({
  inheritAttrs: false
})

const time = defineModel<string>({
  default: '12:00'
});

const props = defineProps({
  withTitle: {
    type: Boolean,
    default: false,
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
    default: "00:00",
  },
  max: {
    type: String,
    required: false,
    default: "23:59",
  },
  every: {
    type: Number,
    required: false,
    default: 1,
  },
});


let menu: Ref<boolean> = ref(false);

const close = async (newValue: string) => {
  menu.value = false;
  time.value = newValue;
}

const allowedHours = (value: string): boolean => {
  if (authorizedMinutes.value.includes(0)) {
    return value >= props.min.substring(0, 2) && value <= props.max.substring(0, 2);
  }
  return value > props.min.substring(0, 2) && value < props.max.substring(0, 2);
}

const allowedMinutes = (value: number): boolean => {
  return authorizedMinutes.value.includes(value) &&
    (time.value.substring(0, 2) < props.max.substring(0, 2) || value <= parseInt(props.max.substring(3, 5))) &&
    (time.value.substring(0, 2) > props.min.substring(0, 2) || value >= parseInt(props.min.substring(3, 5)))
}

const authorizedMinutes = computed((): number[] => {
  const minMinutes = parseInt(props.min.substring(3, 5));
  return Array.from({ length: 60 / props.every }, (_, index) => (minMinutes + index * props.every) % 60);
});

</script>
<style scoped lang="scss">
.v-text-field :deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
}
</style>