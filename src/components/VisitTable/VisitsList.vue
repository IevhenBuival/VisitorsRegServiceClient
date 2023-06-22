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
  emits: ["reselectItem","offAddScroll"],
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
    forDeleteId:{
      required:true,
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
    const UpdateforDelete=(id: string)=>{
      let fordelete = "";
      let currentid = "";
      if (id === "") {
        if (OrderedVisits.value.length>=2) {
        currentid = OrderedVisits.value[0].visitId;
        fordelete=OrderedVisits.value[1].visitId;
      }else if (OrderedVisits.value.length===1){
        currentid = OrderedVisits.value[0].visitId;
        fordelete="";
      }else {
        currentid = OrderedVisits.value[0].visitId;
        fordelete = OrderedVisits.value[1].visitId;
      }}else currentid=id;
      const index = OrderedVisits.value.findIndex(item => item.visitId===currentid);
      
      if (OrderedVisits.value.length>=2) {
        const newindex=((index-1)>0)?index-1:0;
        fordelete=OrderedVisits.value[newindex].visitId;
      }
      
       
      
      emit("reselectItem", currentid,fordelete);
    }
    const onItemClick = (id: string) => {
      UpdateforDelete(id);
      emit("offAddScroll");
    };

    return { OrderedVisits, onItemClick,UpdateforDelete };
  },
  updated() {
  this.$nextTick(function () {
    if (this.forDeleteId===""){
      this.UpdateforDelete(this.SelectedId);
    }


     if (this.AddScroll)
    { const targetId = this.SelectedId;
    const scrollToElement = () =>  {

    const el = document.getElementById(targetId);
    if (el) {
        el.scrollIntoView();
      }
    }
   
    scrollToElement();
   
  }
  
    
  })
  },
});
</script>

<style scoped></style>
