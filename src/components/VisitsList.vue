<template>
  <div>
    <p>jkjkjk</p>
    <p>{{ visits }}</p>
    <ul>
      <li v-for="visit in OrderedVisits" :key="visit.visitId">
        <h2>{{ visit.name }}</h2>
        <h2>{{ visit.surname }}</h2>
        <h3>{{ visit.visitAt }}</h3>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import OrderBy from "../types/OrderBy";
import IVisit from "../types/Visit";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    visits: {
      required: true,
      type: Array as PropType<IVisit[]>,
    },
    order: {
      required: true,
      type: String as PropType<OrderBy>,
    },
  },
  setup(props) {
    const OrderedVisits = computed(():IVisit[] =>
      [...props.visits].sort((a: IVisit, b: IVisit):number =>
        a[props.order] > b[props.order] ? 1 : -1
      )
    );
    return { OrderedVisits };
  },
});
</script>

<style scoped>
</style>