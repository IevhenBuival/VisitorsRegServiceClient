<template>
  <dialog ref="dialog" class="zindex-modal">
    <form class="ui form" novalidate novalidatemetod="dialog" @submit.prevent>
      <div class="container d-flex flex-column justify-content-between">
        <h4>{{ title }}</h4>
        <div v-if="dialogProps.type !== 'RemoveItem'">
          <ShowDialogInput
            :label="'Ім\'я'"
            :name="'name'"
            v-model="dialogData.name"
          />
          <ShowDialogInput
            :label="'surname'"
            :name="'surname'"
            v-model="dialogData.surname"
          />
        </div>
        <br />

        <div class="w-100 d-flex flex-row">
          <div class="px-2 mw-50 flex-grow">
            <button
              class="ui btn w-100 btn-secondary"
              title="Заповніть всі поля введення"
              type="button"
              :disabled="isSignupButtonDisabled"
              formmethod="dialog"
              @click="onSasbmitDialog"
            >
              Підтвердити
            </button>
          </div>
          <div class="px-2 mw-50">
            <button
              class="w-100 btn btn-secondary"
              type="button"
              formmethod="dialog"
              @click.prevent="onCloseDialog"
            >
              Відміна
            </button>
          </div>
        </div>
      </div>
    </form>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, reactive } from "vue";
import { IDialogItem, IDialogProps } from "@/types/Dialog";
import ShowDialogInput from "@/components/ShowDialogInput.vue";
import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";
export default defineComponent({
  name: "ShowDialog",
  components: { ShowDialogInput },
  emits: ["onClickCallback"],
  setup(props, { emit }) {
    let dialogData = reactive({
      name: "",
      surname: "",
    });
    if (props.dialogProps.type === "RemoveItem") {
      //setup hidden fields fore remove button
      dialogData.name = "1";
      dialogData.surname = "1";
    }
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(dialogData, errors);

    const dialog = ref<HTMLDialogElement | null>(null);
    function onCloseDialog() {
      if (dialog.value) dialog.value.close();
      const DialogProps: IDialogItem = { event: "Cancel" };
      emit("onClickCallback", DialogProps);
    }
    onMounted(() => {
      if (dialog.value) {
        dialog.value.showModal();
        dialog.value.addEventListener("click", (e) => {
          const dialogDimensions = dialog.value?.getBoundingClientRect();
          if (
            dialogDimensions !== undefined &&
            (e.clientX < +dialogDimensions?.left ||
              e.clientX > +dialogDimensions?.right ||
              e.clientY < +dialogDimensions?.top ||
              e.clientY > +dialogDimensions?.bottom)
          ) {
            onCloseDialog();
          }
        });
      }
    });

    return { dialog, dialogData, onCloseDialog, isSignupButtonDisabled };
  },

  props: {
    dialogProps: {
      required: true,
      type: Object as PropType<IDialogProps>,
    },
  },
  methods: {
    onSasbmitDialog: function () {
      const DialogProps: IDialogItem = {
        event: "Ok",
        method: this.dialogProps.type,
        name: this.dialogData.name,
        surname: this.dialogData.surname,
      };

      this.$emit("onClickCallback", DialogProps);
    },
  },
  computed: {
    title() {
      if (this.dialogProps.type === "EditItem")
        return "Редагування відвідувача";
      else if (this.dialogProps.type === "AddItem")
        return "Створення відвідувача";
      return "Підтвердіть видалення відвідувача";
    },
  },
});
</script>

<style scoped></style>
