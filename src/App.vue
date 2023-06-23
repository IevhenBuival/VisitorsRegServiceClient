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
      :forDeleteId="SelectedVisitId.forDelete"
      :AddScroll="AddScroll"
      v-on:reselectItem="setSelectedVisitId"
      v-on:offAddScroll="offAddScroll"
    />

    <ShowDialog
      v-if="dialog.show"
      v-on:onClickCallback="onDialogChoice"
      :dialogProps="dialog.dialogProps"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import IVisit, { IVisitBody } from "@/types/visit";
import OrderBy, { IOrder } from "@/types/OrderBy";
import VisitsList from "@/components/VisitTable/VisitsList.vue";
import HeadContainer from "@/components/VisitTable/HeadButtonsContainer.vue";
import ErrorBlock from "@/components/ErrorBlock.vue";
import LoaderGif from "@/components/LoaderGif.vue";
import ShowDialog from "@/components/DialogForm/ShowDialog.vue";
import TableHat from "@/components/VisitTable/TableHat.vue";
import * as VisitHooks from "@/hooks/visitApi";
import IDialog, { IDialogItem, IDialogProps } from "@/types/Dialog";
import stringGuard from "@/modules/stringGuard";
import { findFirstFormSorted } from "./modules/findFirstFromSorted";


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
      loadDate: { error: { show: false, message: "" }, loading: true },
      dialog: { show: false, dialogProps: { type: "type" } } as IDialog,
    };
  },
  setup() {
    const order = ref<IOrder>({ order: "name", reverse: false });
    const SelectedVisitId = reactive({ id: "", forDelete: "" });
    const Visits = [] as IVisit[];
    const AddScroll = ref(false);

    //order state handling 
    const handleSorting = function (neworder: OrderBy) {
      if (order.value.order !== neworder) order.value.reverse = false;
      else order.value.reverse = !order.value.reverse;
      order.value.order = neworder;
      AddScroll.value =  true;
    };
    return { Visits, handleSorting, order, SelectedVisitId,AddScroll };
  },

  // Wrapper to work whith hook
  methods: {
    async CallerWrapper(method: string, props?: IDialogItem) {
      this.loadDate.error.show = false;
      this.loadDate.loading = true;
      try {
        if (method === "GetAll") {
          const res = await VisitHooks.getVisitsHook();
          this.Visits = [...res];
        } else if (method === "RemoveItem") {
          await VisitHooks.deleteVisitHook(this.SelectedVisitId.id);

          this.SelectedVisitId.id = this.SelectedVisitId.forDelete;
          this.SelectedVisitId.forDelete = "";
          this.AddScroll=true;
          
        } else if (props) {
          const body: IVisitBody = {
            name: stringGuard(props?.name),
            surname: stringGuard(props?.surname),
          };
          if (method === "AddItem") {
            const res = await VisitHooks.postVisitHook(body);
            this.SelectedVisitId.id = stringGuard(res.visitId);
            this.SelectedVisitId.forDelete = "";
            this.AddScroll = true;
          } else if (method === "EditItem") {
            await VisitHooks.putVisitHook(this.SelectedVisitId.id, body);
          }
        }
      } catch (error) {
        this.loadDate.error.show = true;
        let errormessage = "" + error;
        if (method === "GetAll") {
          errormessage =
            "Помилка завантаження даних. Спробуйте оновити сторінку";
        } else if (method === "AddItem") {
          errormessage =
            "Помилка створення візиту відвідувача. Спробуйте оновити сторінку";
        } else if (method === "RemoveItem") {
          errormessage =
            "Помилка видалення візиту відвідувача. Спробуйте оновити сторінку";
        } else if (method === "EditItem") {
          errormessage =
            "Помилка оновлення візиту відвідувача. Спробуйте оновити сторінку";
        }

        this.loadDate.error.message = errormessage;
      }
      this.loadDate.loading = false;
    },
    //Refresh visitors data from DB
    async getVisits() {
      await this.CallerWrapper("GetAll").then(() => {
        this.SelectedVisitId.id =
          this.SelectedVisitId.id !== ""
            ? this.SelectedVisitId.id
            : findFirstFormSorted(this.Visits, this.order);
      });
    },
    //Call DB Changing by Metod
    onDBChangeUpdate: async function (props: IDialogItem) {
      try {
        if (props?.method)
          await this.CallerWrapper(props?.method, props);
          await this.getVisits();
       
      } catch (error) {
        console.error("unexpected error");
      }
    },
    //Dialog ok cancel event
    onDialogChoice: async function (props: IDialogItem) {
      if (props.event === "Ok")
      await this.onDBChangeUpdate(props);
      this.dialog.show = false;
    },
    //visitor selector
    setSelectedVisitId(newId: string, forDelete:string) {
      this.SelectedVisitId.id = newId;
      this.SelectedVisitId.forDelete = forDelete;
    },
    //callback for from VisitsList 
    offAddScroll(){
      this.AddScroll=false;
    },

    //initial dialog modal form
    onClickMenuButton: function (type: string) {
      const props: IDialogProps = { type: type };
      if (type !== "AddItem") {
        const currentVisit = this.Visits.find((i) => i.visitId === this.SelectedVisitId.id);
        if (currentVisit) {
          props.name = currentVisit.name;
          props.surname = currentVisit.surname;
        }
      }
      this.dialog.dialogProps = props;
      this.dialog.show = true;
    },

  },
  mounted() {
    this.getVisits();
  },
});
</script>

<style>
body {
  height: 100vh;
}
</style>
