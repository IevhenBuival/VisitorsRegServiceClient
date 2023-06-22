<template>
  <div class="container flex bg-white flex-shrink-0">
    <div class="row">
      <HeadButton
        :icon="'AddItem'"
        v-on:onClickButton="onClick"
        :title="'Додати відвідувача'"
      />
      <HeadButton
        :icon="'RemoveItem'"
        v-on:onClickButton="onClick"
        :title="'Видалити відвідувача'"
      />
      <HeadButton
        :icon="'EditItem'"
        v-on:onClickButton="onClick"
        :title="'Змінити відвідувача'"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeadButton from "@/components/VisitTable/HeadButton.vue";

export default defineComponent({
  components: {
    HeadButton,
  },
  emits: ["onClickGo"],

  methods: {
    onClick: function (type: string) {
      this.$emit("onClickGo", type);
    },
  },
});
</script>

<style scoped></style>
