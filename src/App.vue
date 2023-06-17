<template>
  <div class="app">
    <button @click="handleSorting('name')">name</button>
    <button @click="handleSorting('surname')">surname</button>
    <button @click="handleSorting('visitAt')">at</button>

    <VisitsList :visits="Visits" :order="order" />
    <TestComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IVisit from "@/types/Visit";
import OrderBy from "@/types/OrderBy";

import VisitsList from "./components/VisitsList.vue";
import TestComponent from "./components/TestComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    VisitsList,
    TestComponent,
  },
  setup() {
    const Visits = ref<IVisit[]>([
      { name: "klkl", surname: "atest", visitAt: "223", visitId: "" },
      { name: "ajkkhhjhhjh", surname: "test", visitAt: "255", visitId: "" },
    ]);

    const order = ref<OrderBy>("name");

    const handleSorting = function (neworder: OrderBy) {
      order.value = neworder;
    };
    //const state = reactive({name:"25" as string|number})
    //return {...toRefs(state)}
    //const state = reactive({name:"25" as string|number})
    // const name =  ref<number|string|IVisit>("jkkjkjkjkjkjk")
    return { Visits, handleSorting, order };
  },
  //
  //methods:{
  //  onMy(s:string){
  //      this.Visits=[{name:s,surname:"test",visitAt:"2",visitId:""}];
  //  },
  //},
});
</script>

<style>
</style>
