<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const router = useRouter();
import axios from "axios";
import AccountForm from "./_AccountForm.vue";

</script>

<template>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Aggiungi Account</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-6">
        <account-form></account-form>
      </div>
    </div>
  </template>
  
 
  