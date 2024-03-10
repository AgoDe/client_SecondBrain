<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import axios from "axios";
import AccountForm from "./_AccountForm.vue";

const slug = router.currentRoute.value.params.slug
let account = ref();
let loading = ref(true);
  const fetchAccount = () => {
      const url = `/Account/${slug}`;
      axios.get(url).then((response) => {
          console.log(response.data);
          account.value = response.data.result;
      }).finally(() => {
          loading.value = false
      })
  }
  
  fetchAccount();
</script>

<template>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Modifica Account</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-6">
        <account-form :slug="slug"></account-form>
      </div>
    </div>
  </template>
  
 
  