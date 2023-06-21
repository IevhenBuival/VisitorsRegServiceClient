<template>
    <div class="d-flex justify-content-center align-items-center">
    
                  <img src="@/components/pics/loader.gif" alt="">
             
            </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style scoped>
.loading__block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 165px;
  /* image */
}

.Loading__img_wrapper {
  /* Group */
  display: block;
  min-width: 165px;
  min-height: 165px;
  animation: rotating 6s linear infinite;

  /*background: #3bde7c;*/
}

@keyframes rotating {
  from {
      transform: translate(-50px,0);
  }

  to {
      transform: translate(50px,0);
  }
}
</style>