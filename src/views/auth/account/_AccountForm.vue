<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const router = useRouter();
import axios from "axios";
import TextInput from "../../../components/form/TextInput.vue";
import FloatInput from "../../../components/form/FloatInput.vue";
import { useAccountsStore } from "../../../stores/accountsStore";

const accountsStore = useAccountsStore();

const props = defineProps({
  slug: {
    type: String,
  }
})
let account = ref();
let loading = ref(true);
  
const rules = computed(() => {
  return {
    name:{
      required: helpers.withMessage("Il nome è obbligatorio", required),
    },
    initialBalance: {
      required: helpers.withMessage("Il saldo iniziale è obbligatorio", required),
    }
  }
});

let form = ref({
    id: account?.id ?? null,
    name: account?.name ?? null,
    initialBalance: account?.initialBalance ?? null
});

const v$ = useValidate(rules, accountsStore.account);

async function submit() {
  
  console.log("submit");
  const validation = await v$.value.$validate();

  if (!validation) {
    // notify user form is invalid
    return
  }

  if (props.slug) 
  {
    console.log("update");
    accountsStore.updateAccount();
    // axios.put(`/Account/${form.value.id}`, form.value).then((response) => {
    //   router.push({ name: "account.index" });
    //})
  }
  else 
  {
    console.log("create");
    accountsStore.createAccount();
    // axios.post("/Account", form.value).then((response) => {
    //   router.push({ name: "account.index" });
    // }).catch((error) => {
    //   console.log(error);
    // })
  }
};

const fetchAccount = () => {

if (!props.slug) {
  account.value = null
  loading.value = false
  return             
}
const url = `/Account/${props.slug}`;
axios.get(url).then((response) => {
    console.log(response.data);
    account.value = response.data.result;
    form.value.id = account.value.id
    form.value.name = account.value.name
    form.value.initialBalance = account.value.initialBalance
}).finally(() => {
    loading.value = false
})
}

accountsStore.clearAccount();
if (props.slug) {
  console.log('update')
  accountsStore.fetchAccount(props.slug);
} 
else 
{
  console.log('create')
}
</script>

<template>
  <form id="accountForm" @submit.prevent="submit()" method="post" class="intro-y box p-5" >
      <div v-show="!accountsStore.getIsLoading">

        <input type="hidden" v-model="accountsStore.account.id">
        <TextInput v-model="accountsStore.account.name" :validator="v$.name" title="Nome" />
        <FloatInput v-model="accountsStore.account.initialBalance" :validator="v$.initialBalance" title="Saldo iniziale" />
        
      </div>
      <div class="text-right mt-5" >
        <router-link :to="{ name: 'account.index' }" class="btn btn-outline-secondary w-24 mr-1">
          Indietro
        </router-link>
        <button type="submit" class="btn btn-primary w-24" v-show="!accountsStore.getIsLoading">
          {{ props.slug ? 'Modifica' : 'Aggiungi' }}
        </button>
      </div>
  </form>
</template>
  
 
  