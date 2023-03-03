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
  },
  computed: {
    contacts() {
      console.log('index: computed?')
      return this.$store.state.contacts.data
    },
    emails() {
      return this.$store.state.emails
    },
    phones() {
      return this.$store.state.phones
    }
  },
  mounted: function() {
    console.log('index: mounted')
    this.$store.dispatch('getContacts')
    this.$store.subscribe((mutation) => {      
      if(mutation.type == '_setItemsState') {
        console.log('mutation subscribed')        
        if(mutation.payload.property === 'phones') {
          this.handleContactsObj()
        }
      }      
    })
  },
  methods: {
    handleContactsObj: function() {
      console.log('index: habdle objects')
      let temp = []
      let temp1 = []
      let obj = []
      for (let i = 0; i < this.contacts.length; i++) {
        ///console.log(contacts[i])
        let id = this.contacts[i]['id']
        let emails = this.emails.filter(function (el) {
          return el.id_user === id
        })
        let phones = this.phones.filter(function (el) {
          return el.id_user === id
        })
        Object.values(emails).forEach(item => {
          temp.push(item.email)
        })
        Object.values(phones).forEach(item => {
          temp1.push(item.phone)
        })
        let _obj = this.contacts[i]
        Object.assign(_obj, {'emails': temp})//step1
        Object.assign(_obj, {'phones': temp1})//step2
        obj.push(_obj)        
      }
      console.log('OBJ?', obj)
      this.$store.commit('setContacts', obj)
      console.log('done!')
      console.log('launching old dispatch getContacts...')
      //this.$store.dispatch('getContacts', this.searchParams)
      //this.$store.commit('data_loaded', true)
      console.log('done!')
    }
  }
}
</script>
