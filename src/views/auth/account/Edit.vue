<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import axios from "axios";
import AccountForm from "./_AccountForm.vue";

const slug = router.currentRoute.value.params.slug
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
  
 
  