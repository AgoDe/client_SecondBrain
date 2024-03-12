<script setup>
const props = defineProps({
    modelValue: Object,
    isLoading: Boolean
})

let emit = defineEmits(['update:modelValue', 'pageSelection']);
const pageSelection = (value) => {
  emit('pageSelection', value);
}
</script>

<template>
 <nav class="w-full sm:w-auto sm:mr-auto">
    <ul class="pagination">
        <li class="page-item" >
        <span class="page-link" @click="emit('pageSelection', modelValue.pageNumber - 1)">
        <ChevronsLeftIcon class="w-4 h-4" />
        </span>
    </li>
    
    <li class="page-item" :class="modelValue.pageNumber == i ? 'active' : ''" v-for="i in modelValue.totalPages" :key="i"  >
        <span class="page-link" @click="emit('pageSelection', i)">
            {{i}}
        </span>
    </li>
    
    <li class="page-item">
        <span class="page-link" @click="emit('pageSelection', modelValue.pageNumber + 1)">
            <ChevronsRightIcon class="w-4 h-4" />
        </span>
    </li>
    </ul>
</nav>
</template>