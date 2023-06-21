<template>
      <div class="col-4 d-flex justify-content-baseline border text-break" @click="onClick(title)">
        <div class="flex-fill flex-grow d-flex justify-content-center align-items-center">
        <h5 v-if="title==='name'" >
            ім'я<wbr>
        </h5>
        <h5 v-else-if="title==='surname'" >
            пріз<wbr>вище<wbr>
        </h5>
        <h5 v-else >
            час<wbr> ство<wbr>рення<wbr>
        </h5>
        
        </div>
        <div v-if="order.order === title" class="d-flex w-10 justify-content-center align-items-center">
        <ArrowSvg  :reverse="order.reverse" />
        </div>  
      </div>    
</template>

<script lang="ts">
import { IOrder } from "../types/OrderBy";
import {  defineComponent, PropType } from "vue";
import ArrowSvg from "@/components/svg/ArrowSvg.vue";
export default defineComponent({
  name: "VisitList",
  components: {
    ArrowSvg,
  },
  emits: ["handleSorting"],
  props: {
    order: {
      required: true,
      type: Object as PropType<IOrder>,
    },
    title: {
        required: true,
        type: String,
    },

  },
  methods: {
    onClick: function (type:string) {
      this.$emit("handleSorting", type);
    },
  },
});
</script>

<style scoped>
</style>
