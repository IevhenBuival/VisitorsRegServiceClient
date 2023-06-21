<template>
  <div class="my-3">
    <label class="form-label">{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      autocomplete="off"
      v-model="input"
      class="form-control"
      :class="{ 'is-invalid': errors[name] }"
      title="{{errors[name]}}"
      @keyup="validateInput"
      @input="updateValue($event)"
      required
    />
    <div class="invalid-feedback" v-if="errors[name]">
      {{ errors[name] }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";

export default defineComponent({
  name: "ShowDialogInput",
  emits: ["update:modelValue"],
  props: {
    name: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    modelValue: {
      repuired: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    let input = ref(null);
    const { validateNameField, errors } = useFormValidation();
    const validateInput = () => {
      validateNameField(props.name, input.value);
    };
    const placeholder = "Заповніть " + props.label.toLocaleLowerCase();
    const updateValue = (e: Event) => {
      emit("update:modelValue", (e.target as HTMLInputElement).value);
    };

    return { placeholder, input, errors, validateInput, updateValue };
  },
});
</script>

<style scoped></style>
