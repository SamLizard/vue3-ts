<template>
  <v-sheet class="d-flex justify-center">
    <v-row>
      <v-col cols="12" sm="8" md="4" offset="0" offset-sm="2" offset-md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{ $t("routes.register") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon class="mx-4">mdi-account-plus</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="userDetails.username"
                :rules="[requiredFieldRule, usernameLengthRules, alphanumericRule('username'), oneLetterRule('username')].flat()"
                :label="$t('username')" required prepend-inner-icon="mdi-account-outline"
                variant="underlined"></v-text-field>
              <v-text-field v-model="userDetails.phone" :rules="[requiredFieldRule, phoneRules].flat()"
                :label="$t('phone')" required prepend-inner-icon="mdi-cellphone" variant="underlined"></v-text-field>
              <v-text-field v-model="userDetails.password"
                :rules="[requiredFieldRule, passwordLengthRules, uppercaseRule('password'), lowercaseRule('password'), digitRule('password'), specialCharRule('password')].flat()"
                :label="$t('password')" required :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline" variant="underlined"></v-text-field>
              <v-card-actions>
                <v-row>
                  <v-col cols="12">
                    <v-btn type="submit" :disabled="!valid" color="primary" variant="elevated" @click="submitForm"
                      :loading="loading">
                      {{ $t("routes.register") }}
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn small variant="text" class="lowercase" color="primary" to="login">
                      {{ $t("loginQuestion") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import router from '@/router/router';
import { useRules } from '../composables/rules';
const {
  requiredFieldRule,
  usernameLengthRules,
  passwordLengthRules,
  phoneRules,
  alphanumericRule,
  oneLetterRule,
  uppercaseRule,
  lowercaseRule,
  digitRule,
  specialCharRule,
} = useRules();
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const t = i18n.t;
import { ref, watch, type Ref } from 'vue';
import type { VForm } from 'vuetify/components';

let showPassword: Ref<boolean> = ref(false);
let valid: Ref<boolean> = ref(false);

type details = {
  name: string,
  phone: string,
}

type registerDetails = {
  username: string,
  password: string,
  phone: string,
}

let userDetails: Ref<registerDetails> = ref({ username: "", password: "", phone: "" });
let loading: Ref<boolean> = ref(false);

const form = ref<VForm | null>(null);
import { sleep } from '@/composables/utils';

const submitForm = async () => {
  if ((await form.value!.validate()).valid) {
    loading.value = false;
    const registerRequest = registerUser();
    const timeout = sleep(100)
      .then(() => {
        loading.value = true
      });
    await Promise.all([registerRequest, timeout]);
    loading.value = false;
  }
}


const emit = defineEmits<{ connected: [personalDetails: details] }>();

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

import Swal from 'sweetalert2';
import { register } from '../DL/DL';

const registerUser = async () => {
  try {
    const personalDetails: details = await register(userDetails.value.username, userDetails.value.password, userDetails.value.phone);
    if (Object.keys(personalDetails).length > 0) {
      userStore.changeUserId(userDetails.value.username);
      emit("connected", personalDetails);
      router.push("home");
    } else {
      throw new Error();
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: t("registerFailed"),
      showCloseButton: true,
      confirmButtonText: t("ok"),
    });
  }
}

watch(() => i18n.locale.value, async () => {
  if (Object.entries(form.value?.errors || {}).length > 0) {
    await form.value?.validate();
  }
});
</script>
<style scoped>
.lowercase {
  font-size: 0.8rem;
  text-transform: none;
}
</style>
