import { useI18n } from 'vue-i18n';

interface ruleFunction {
  (v: string): string | boolean,
}

interface ruleCustomFieldname {
  (field: string): Array<ruleFunction>,
}

export function useRules() {
  const { t } = useI18n();

  const requiredFieldRule: Array<ruleFunction> = [
    (v: string): string | boolean => {
      return !!v || t("fieldRequired") as string;
    },
  ];

  const usernameLengthRules: Array<ruleFunction> = [
    (v: string): string | boolean => (v && v.length >= 3 && v.length <= 16) || t("usernameLengthMessage") as string,
  ];

  const passwordLengthRules: Array<ruleFunction> = [
    (v: string): string | boolean => (v && v.length >= 8 && v.length <= 64) || t("passwordLengthMessage") as string,
  ];

  const phoneRules: Array<ruleFunction> = [
    (v: string): string | boolean => (v && /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(v)) || t("phoneIncorrectMessage") as string,
  ];

  const alphanumericRule: ruleCustomFieldname = (field: string = "default") => [
    (v: string): string | boolean => (/^\w+$/).test(v) || t("noAlphanumericMessage", { fieldName: t("field." + field) }) as string,
  ];

  const oneLetterRule: ruleCustomFieldname = (field = "default") => [
    (v: string): string | boolean => (/[a-zA-Z]/).test(v) || t("noLetterMessage", { fieldName: t("field." + field) }) as string,
  ];

  const uppercaseRule: ruleCustomFieldname = (field = "default") => [
    (v: string): string | boolean => (/[A-Z]/).test(v) || t("noUpperCaseMessage", { fieldName: t("field." + field) }) as string,
  ];

  const lowercaseRule: ruleCustomFieldname = (field = "default") => [
    (v: string): string | boolean => (/[a-z]/).test(v) || t("noLowerCaseMessage", { fieldName: t("field." + field) }) as string,
  ];

  const digitRule: ruleCustomFieldname = (field = "default") => [
    (v: string): string | boolean => (/[0-9]/).test(v) || t("noDigitMessage", { fieldName: t("field." + field) }) as string,
  ];

  const specialCharRule: ruleCustomFieldname = (field = "default") => [
    (v: string): string | boolean => (/[^a-zA-Z0-9]/).test(v) || t("noSpecialCharMessage", { fieldName: t("field." + field) }) as string,
  ];

  return {
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
  }
}