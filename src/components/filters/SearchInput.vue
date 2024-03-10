<script setup>
const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="w-56 relative text-slate-500">
        <input type="text" class="form-control w-56 box pr-10" placeholder="Cerca..." :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
    </div>
</template>