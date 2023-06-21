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
      :SelectedId="SelectedVisitId"
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
import { defineComponent, ref } from "vue";
import IVisit from "@/types/visit";
import OrderBy, { IOrder } from "@/types/OrderBy";
import VisitsList from "@/components/VisitsList.vue";
import HeadContainer from "@/components/HeadContainer.vue";
import ErrorBlock from "@/components/ErrorBlock.vue";
import LoaderGif from "@/components/LoaderGif.vue";
import ShowDialog from "@/components/ShowDialog.vue";
import TableHat from "@/components/TableHat.vue";
import * as VisitHooks from "@/hooks/visitApi";
import IDialog, { IDialogItem } from "@/types/Dialog";

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
      Visits: [] as IVisit[],
      SelectedVisitId: "",
      loadDate: { error: { show: false, message: "" }, loading: true },
      dialog: { show: false, dialogProps: { type: "type" } } as IDialog,
    };
  },
  setup() {
    const order = ref<IOrder>({ order: "name", reverse: true });

    const handleSorting = function (neworder: OrderBy) {
      if (order.value.order !== neworder) order.value.reverse = false;
      else order.value.reverse = !order.value.reverse;
      order.value.order = neworder;
    };
    //const state = reactive({name:"25" as string|number})
    //return {...toRefs(state)}
    return { handleSorting, order };
  },

  //
  methods: {
    async getVisits() {
      this.loadDate.error.show = false;
      this.loadDate.loading = true;
      try {
        const res = await VisitHooks.getVisitsHook();
        this.Visits = [...res];
        if (this.Visits.length>0)this.SelectedVisitId = this.Visits[0].visitId;
      } catch (error) {
        this.loadDate.error.show = true;
        this.loadDate.error.message =
          "Помилка загрузки даних. Спробуйте оновити сторінку";
      }
      this.loadDate.loading = false;
    },
    setSelectedVisitId(newId:string) {
      this.SelectedVisitId=newId;
    },

    onClickMenuButton: function (type: string) {
      this.dialog.dialogProps = { type: type };
      this.dialog.show = true;
    },
    onDialogChoice:  function (props: IDialogItem) {
      this.dialog.show = false;
      console.log(props.event);
      console.log(props.method);
      console.log( this.SelectedVisitId);
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
