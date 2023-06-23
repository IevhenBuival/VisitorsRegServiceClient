<template>
  <div class="container h-100 w-100 flex-fill flex-grow overflow-scroll">
    <div
      v-for="visit in OrderedVisits"
      :key="visit.visitId"
      :id="visit.visitId"
      class="row"
      v-bind:class="visit.visitId !== SelectedId ? 'bg-white' : 'bg-secondary'"
      @click="onItemClick(visit.visitId)"
    >
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
      type: String,
    },
    forDeleteId: {
      required: true,
      type: String,
    },
    AddScroll: {
      required: true,
      type: Boolean,
    },
  },

  setup(props, { emit }) {
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
    //For Delete update props
    const UpdateforDelete = (id: string) => {
      let beenCurrentNext = "";
      let currentNow = "";
      //empty currentid
      if (id === "") {
        if (OrderedVisits.value.length >= 2) {
          currentNow = OrderedVisits.value[0].visitId;
          beenCurrentNext = OrderedVisits.value[1].visitId;
        } else if (OrderedVisits.value.length === 1) {
          currentNow = OrderedVisits.value[0].visitId;
          beenCurrentNext = "";
        } else {
          currentNow = "";
          beenCurrentNext = "";
        }
      } else currentNow = id;
      const index = OrderedVisits.value.findIndex(
        (item) => item.visitId === currentNow
      );

      if (OrderedVisits.value.length >= 2) {
        const newindex = index - 1 > 0 ? index - 1 : 0;
        beenCurrentNext = OrderedVisits.value[newindex].visitId;
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
      if (this.forDeleteId === "") {
        this.UpdateforDelete(this.SelectedId);
      }
      //scroll after create
      if (this.AddScroll) {
        const targetId = this.SelectedId;
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
