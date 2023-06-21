<template>
  <div class="container-fluid vh-100 w-100 d-flex flex-column">
    <HeadContainer v-on:onClickGo="onClickMenuButton" />

    <div class="container w-100 bg-danger flex-shrink-0">
      <TableHat :order="order" v-on:handleSorting="handleSorting" />
    </div>

    <LoaderGif v-if="loadDate.loading" />

    <ErrorBlock v-if="loadDate.error.show" :text="loadDate.error.message" />

    <VisitsList
      v-else
      :visits="Visits"
      :order="order"
      :handleSorting="handleSorting"
      :SelectedId="SelectedVisitId.id"
      v-on:reselectItem="setSelectedVisitId"
    />

    <ShowDialog
      v-if="dialog.show"
      v-on:onClickCallback="onDialogChoice"
      :dialogProps="dialog.dialogProps"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import IVisit, { IVisitBody } from "@/types/visit";
import OrderBy, { IOrder } from "@/types/OrderBy";
import VisitsList from "@/components/VisitsList.vue";
import HeadContainer from "@/components/HeadContainer.vue";
import ErrorBlock from "@/components/ErrorBlock.vue";
import LoaderGif from "@/components/LoaderGif.vue";
import ShowDialog from "@/components/ShowDialog.vue";
import TableHat from "@/components/TableHat.vue";
import * as VisitHooks from "@/hooks/visitApi";
import IDialog, { IDialogItem } from "@/types/Dialog";
import stringGuard from "@/modules/stringGuard";
import { findFirstFormSorted } from "./modules/findFirstFromSorted";

//getVisits();

export default defineComponent({
  name: "App",
  components: {
    VisitsList,
    HeadContainer,
    ErrorBlock,
    LoaderGif,
    ShowDialog,
    TableHat,
  },
  data() {
    return {
      firstInVisit: "",
      loadDate: { error: { show: false, message: "" }, loading: true },
      dialog: { show: false, dialogProps: { type: "type" } } as IDialog,
    };
  },
  setup() {
    const order = ref<IOrder>({ order: "name", reverse: true });
    const SelectedVisitId = reactive({ id: "" });
    const Visits = [] as IVisit[];

    const handleSorting = function (neworder: OrderBy) {
      if (order.value.order !== neworder) order.value.reverse = false;
      else order.value.reverse = !order.value.reverse;
      order.value.order = neworder;
    };
    return { Visits, handleSorting, order, SelectedVisitId };
  },

  //
  methods: {
    async CallerWrapper(method: string, props?: IDialogItem) {
      this.loadDate.error.show = false;
      this.loadDate.loading = true;
      try {
        if (method === "GetAll") {
          const res = await VisitHooks.getVisitsHook();
          this.Visits = [...res];
        } else if (method === "RemoveUser") {
          await VisitHooks.deleteVisitHook(this.SelectedVisitId.id);
          this.SelectedVisitId.id = "";
        } else if (props) {
          const body: IVisitBody = {
            name: stringGuard(props?.name),
            surname: stringGuard(props?.surname),
          };
          if (method === "AddUser") {
            const res = await VisitHooks.postVisitHook(body);
            this.SelectedVisitId.id = stringGuard(res.visitId);
          } else if (method === "EditUser") {
            await VisitHooks.putVisitHook(this.SelectedVisitId.id, body);
          }
        }
      } catch (error) {
        this.loadDate.error.show = true;
        let errormessage = "" + error;
        if (method === "GetAll") {
          errormessage =
            "Помилка завантаження даних. Спробуйте оновити сторінку";
        } else if (method === "AddUser") {
          errormessage =
            "Помилка створення візиту відвідувача. Спробуйте оновити сторінку";
        } else if (method === "RemoveUser") {
          errormessage =
            "Помилка видалення візиту відвідувача. Спробуйте оновити сторінку";
        } else if (method === "EditUser") {
          errormessage =
            "Помилка оновлення візиту відвідувача. Спробуйте оновити сторінку";
        }

        this.loadDate.error.message = errormessage;
      }
      this.loadDate.loading = false;
    },
    async getVisits() {
      await this.CallerWrapper("GetAll");
    },

    setSelectedVisitId(newId: string) {
      this.SelectedVisitId.id = newId;
      this.firstInVisit = newId;
    },

    onClickMenuButton: function (type: string) {
      this.dialog.dialogProps = { type: type };
      this.dialog.show = true;
    },
    onAsyncFunc: async function (props: IDialogItem) {
      try {
        if (props.event === "Ok" && props?.method) {
          await this.CallerWrapper(props?.method, props);
        }
      } catch (error) {
        console.error("unexpected error");
      }
    },
    onDialogChoice: async function (props: IDialogItem) {
      await this.onAsyncFunc(props);
      this.dialog.show = false;
    },
  },
  mounted() {
    this.getVisits().then(() => {
      this.SelectedVisitId.id =
        this.SelectedVisitId.id !== ""
          ? this.SelectedVisitId.id
          : findFirstFormSorted(this.Visits, this.order);
    });
  },
});
</script>

<style>
body {
  height: 100vh;
}
</style>
