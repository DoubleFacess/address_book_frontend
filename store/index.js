import Vue from 'vue'

export const state = () => ({ 
                              
  contacts: {
    data: [],
    error: null,
    loading: false,
  }
  
})

export const getters = {
    _getter: state => items => state[items],
    getContacts: state => state.contacts.data,
    loadedData: state => state.loaded_data,
}

export const mutations = {
    _setItemsState(state, payload) {
        //console.log('mutation', payload)
        state[payload.property] = payload.with
    },
    //commit('setItemsState', {'property': 'item_images', 'with': data.data})  
    setItemsState(state, payload) {
        //console.log('payload', payload)
        payload.forEach(element => state.contacts.data.push(element))    
        //state.contacts_new.data.push(payload)
    },
    setContacts(state, payload) {
        state.contacts['data'] = payload
    },
    updateContactsObj(state, payload) {
        console.log('updating contacts...')
        //console.log('paylaod', payload)
        let temp = []
        let temp1 = []
        let contacts = payload.contacts
        let emails = payload.emails
        let phones = payload.phones    
        for (let i = 0; i < contacts.length; i++) {
          let id = contacts[i]['id']
          let  _emails = emails.filter(function (el) {
            return el.id_user === id
          })
          let _phones = phones.filter(function (el) {
            return el.id_user === id
          })
          Object.values(_emails).forEach(item => {
            temp.push(item.email)
          })
          Object.values(_phones).forEach(item => {
            temp1.push(item.phone)
          })
          let obj = contacts[i]
          obj = Object.assign({}, obj, {'emails': temp})//step1
          obj = Object.assign({}, obj, {'phones': temp1})//step2
          console.log('OBJ?', obj)
          state.contacts_new.data[i] = obj
          temp = []
          temp1 = []
        }      
      /* @@ end my code @@ */  
    }
}

export const actions = {
    /* @@ my actions @@*/
    getContacts({commit}) {
      //console.log('running $axios store action')    
      this.$axios.get('/api/view')
        .then((data) => {
          if(data.status === 200) {
            //commit('setItemsState', {palyload.with}data.data)
            commit('setItemsState', data.data)          
          }
        })
        .then(() => {
          this.$axios.get('/api/view_emails')
            .then((data) => {
              if(data.status === 200) {
                commit('_setItemsState', {'property': 'emails', 'with': data.data})
                //commit('setItemsState', data.data)
                //console.log('emails', data.data)
              }
            })
        })
        .then(() => {
          this.$axios.get('/api/view_phones')
            .then((data) => {
              if(data.status === 200) {
                commit('_setItemsState', {'property': 'phones', 'with': data.data})
                //commit('setItemsState', data.data)
                //console.log('phones', data.data)
              }
            })
        })
    }
}
                            