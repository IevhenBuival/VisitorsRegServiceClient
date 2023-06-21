<template>
  <div class="container h-100 w-100 flex-fill flex-grow overflow-scroll">
    <div
      v-for="visit in OrderedVisits"
      :key="visit.visitId"
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
import { IOrder } from "../types/OrderBy";
import IVisit from "../types/visit";
import { computed, defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name: "VisitList",
  components: {},
  emits: ["reselectItem"],
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
    const onItemClick = (id: string) => {
      emit("reselectItem", id);
    };

    return { OrderedVisits, onItemClick };
  },
});
</script>

<style scoped></style>
