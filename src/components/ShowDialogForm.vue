<template>
  <section class="signup-view">
    <form @submit.prevent class="ui form" novalidate>
      <ShowDialogInput :label="'Ім\'я'" :name="'name'" v-model="dialog.name" />
      <ShowDialogInput
        :label="'surname'"
        :name="'surname'"
        v-model="dialog.surname"
      />
      <button
        :disabled="isSignupButtonDisabled"
        class="ui button red fluid big"
        @click="signUpButtonPressed"
      >
        OK
      </button>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import ShowDialogInput from "@/components/ShowDialogInput.vue";
import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";

export default defineComponent({
  components: {
    ShowDialogInput,
  },
  setup() {
    let dialog = reactive({
      name: "",
      surname: "",
    });
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(dialog, errors);

    const signUpButtonPressed = () => {
      console.log(dialog);
    };
    return { dialog, isSignupButtonDisabled, signUpButtonPressed };
  },
});
</script>
<style scoped>
.signup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form {
  width: 450px;
}
</style>
