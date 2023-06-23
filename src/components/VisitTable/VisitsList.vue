<template>
  <div class="container h-100 w-100 flex-fill flex-grow overflow-scroll">
    <div v-for="visit in OrderedVisits" :key="visit.visitId" :id="visit.visitId" class="row" v-bind:class="visit.visitId !== SelectedId.id ? 'bg-white' : 'bg-secondary'
      " @click="onItemClick(visit.visitId)">
      <div class="col-4 border text-break">
        {{ visit.name }}
      </div>
      <div class="col-4 border text-break">
        {{ visit.surname }}
      </div>
      <div class="col-4 border text-break">
        {{ visit.visitAt }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IOrder } from "@/types/OrderBy";
import { ISelector } from "@/types/Selector";
import IVisit from "@/types/visit";
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  name: "VisitList",
  components: {},
  emits: ["reselectItem", "offAddScroll"],
  props: {
    visits: {
      required: true,
      type: Array as PropType<IVisit[]>,
    },
    order: {
      required: true,
      type: Object as PropType<IOrder>,
    },
    SelectedId: {
      required: true,
      type: Object as PropType<ISelector>,
    },
    AddScroll: {
      required: true,
      type: Boolean,
    },
  },

  setup(props, { emit }) {

    //sort data according order
    const OrderedVisits = computed((): IVisit[] =>
      [...props.visits].sort((a: IVisit, b: IVisit): number =>
        a[props.order.order] > b[props.order.order]
          ? props.order.reverse
            ? -1
            : 1
          : props.order.reverse
            ? 1
            : -1
      )
    );
    //Define undoId for delete event
    const UpdateforDelete = (id: string) => {
      let beenCurrentNext = "";
      let currentNow = id;
      const arrLenth = OrderedVisits.value.length;
      //empty currentid
      if (id === "" && arrLenth > 0) {
        currentNow = OrderedVisits.value[0].visitId;
      }
      const index = OrderedVisits.value.findIndex(
        (item) => item.visitId === currentNow
      );
      if (index === 0) {
        if (arrLenth >= 2) beenCurrentNext = OrderedVisits.value[1].visitId;
      } else if (index > 0) {
        beenCurrentNext = OrderedVisits.value[index - 1].visitId;
      }
      emit("reselectItem", currentNow, beenCurrentNext);
    };

    const onItemClick = (id: string) => {
      UpdateforDelete(id);
      emit("offAddScroll");
    };

    return { OrderedVisits, onItemClick, UpdateforDelete };
  },

  updated() {
    this.$nextTick(function () {
      //watch for actual props for delete

      if (this.SelectedId.undoId === "" || this.SelectedId.id === "") {
        this.UpdateforDelete(this.SelectedId.id);
      }
      //scroll after create
      if (this.AddScroll) {
        const targetId = this.SelectedId.id;
        const scrollToElement = () => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView();
          }
        };
        scrollToElement();
      }
    });
  },
});
</script>

<style scoped></style>
