<template>
  <div class="container flex bg-white flex-shrink-0">
    <div class="row">
      <HeadButtons
        :icon="'AddItem'"
        v-on:onClickButton="onClick"
        :title="'Додати відвідувача'"
      />
      <HeadButtons
        :icon="'RemoveItem'"
        v-on:onClickButton="onClick"
        :title="'Видалити відвідувача'"
      />
      <HeadButtons
        :icon="'EditItem'"
        v-on:onClickButton="onClick"
        :title="'Змінити відвідувача'"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeadButtons from "../components/HeadButtons.vue";

export default defineComponent({
  components: {
    HeadButtons,
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
