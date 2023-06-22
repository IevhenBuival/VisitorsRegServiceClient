<template>
  <div class="row border bg-dark text-white font-weight-bold text-center">
    <TableHatCell
      :order="order"
      :title="'name'"
      v-on:handleSorting="handleSorting"
    />
    <TableHatCell
      :order="order"
      :title="'surname'"
      v-on:handleSorting="handleSorting"
    />
    <TableHatCell
      :order="order"
      :title="'visitAt'"
      v-on:handleSorting="handleSorting"
    />
  </div>
</template>

<script lang="ts">
import { IOrder } from "@/types/OrderBy";
import { defineComponent, PropType } from "vue";
import TableHatCell from "@/components/VisitTable/TableHatCell.vue";
export default defineComponent({
  name: "VisitList",
  components: {
    TableHatCell,
  },
  props: {
    order: {
      required: true,
      type: Object as PropType<IOrder>,
    },
  },
  emits: ["handleSorting"],

  methods: {
    handleSorting: function (type: string) {
      this.$emit("handleSorting", type);
    },
  },
});
</script>

<style scoped></style>
