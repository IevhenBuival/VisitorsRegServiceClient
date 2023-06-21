<template>
  <dialog ref="dialog" class="zindex-modal">
    <form metod="dialog">
      <div class="container d-flex  flex-column justify-content-between">
        <h4>{{ title }}</h4>
       <div v-if="dialogProps.type!=='RemoveUser'">
        <label class="form-label">
          Ім'я
        </label>
        
        <input type="text" class="form-control mb-2" placeholder="введіть ім'я"/>
        <label class="form-label">
          Фамілія
        </label>
        <input type="text" class="form-control" placeholder="введіть фамілію"/>
      </div>
        <br>

        <div class="w-100 d-flex flex-row  ">
          <div class="px-2 mw-50 flex-grow ">
          <button class="btn w-100 btn-secondary " type="submit" formmethod="dialog" @click="onSasbmitDialog">
            Підтвердити
          </button>
        </div>
          <div class="px-2 mw-50">
          <button
            class="w-100 btn btn-secondary "
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
import { defineComponent, ref, onMounted, PropType } from "vue";
import { IDialogItem, IDialogProps } from "@/types/Dialog";

export default defineComponent({
  name: "ShowDialog",
  emits: ["onClickCallback"],
  setup(_, { emit }) {
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
    return { dialog, onCloseDialog };
  },
  props: {
    dialogProps: {
      required: true,
      type: Object as PropType<IDialogProps>,
    },
  },
  methods: {
    onSasbmitDialog: function () {
      const DialogProps: IDialogItem = { event: "Ok" };
      this.$emit("onClickCallback", DialogProps);
    },
  },
  computed: {

title() {
  if (this.dialogProps.type === "EditUser")
    return "Редагування відвідувача";
  else if(this.dialogProps.type === "AddUser")  
  return "Створення відвідувача";
  return "Підтвердіть видалення відвідувача";
},},
});
</script>

<style scoped></style>
