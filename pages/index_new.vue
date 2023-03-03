<!-- Please remove this file from your project -->
<template>
  <div>
    <headerComponent />
    <mainComponent />
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
}
</script>


<script>

import headerComponent from '~/components/_header.vue'
import mainComponent from '~/components/main.vue'
import testComponent from '~/components/test1.vue'


export default {
  name: 'IndexPage',
  components: {
    headerComponent,
    mainComponent,
    testComponent
  }
}
</script>
