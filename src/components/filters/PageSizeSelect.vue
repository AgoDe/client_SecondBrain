<script setup>
import { integer } from '@vuelidate/validators';

const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <select class="w-20 form-select box mt-3 sm:mt-0" :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)">
        <option value="3">3</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
    </select>
</template>