import IValuesWithKeys from "@/types/ValuesWithKeys";
import { computed } from "vue";

export default function useSubmitButtonState(
  data: IValuesWithKeys,
  errors: IValuesWithKeys
) {
  const isSignupButtonDisabled = computed(() => {
    let disabled = true;
    for (const prop in data) {
      if (!data[prop] || errors[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });

  return { isSignupButtonDisabled };
}
