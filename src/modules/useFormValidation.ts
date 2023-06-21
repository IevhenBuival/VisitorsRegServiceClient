import { reactive } from "@vue/reactivity";
import useValidators from "@/modules/validators";
import IValuesWithKeys from "@/types/ValuesWithKeys";
const { isEmpty, isNumber, isSpecial } = useValidators();

const errors = reactive({} as IValuesWithKeys);
export default function useFormValidation() {
  const validateNameField = (fieldName: string, fieldValue: string | null) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isNumber(fieldName, fieldValue) + isSpecial(fieldName, fieldValue);
  };
  return { errors, validateNameField };
}
