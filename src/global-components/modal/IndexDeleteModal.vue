<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: Boolean
})

defineEmits(["delete", 'update:modelValue']);

let accounts = ref([]);


</script>

<template>
    <!-- BEGIN: Delete Confirmation Modal -->
    <Modal
      :show="modelValue"
      @hidden="$emit('update:modelValue', false)"
    >
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-slate-500 mt-2">
            Vuoi eliminare l'elemento ? <br />This process cannot
            be undone.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="$emit('update:modelValue', false)"
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-danger w-24" @click="$emit('delete')">Delete</button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->
  </template>
  
  
  