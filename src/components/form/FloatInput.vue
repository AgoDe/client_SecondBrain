<script setup>

  const props = defineProps({
      modelValue: String,
      validator : Object,
      title: String
  });
  const emit = defineEmits(["update:modelValue"]);
  
</script>
<template>
    <div class="mb-3">
        <label for="initialBalance" class="form-label flex justify-between">
            {{ title }}
            <span v-if="validator.$errors.length" class="text-red-700">
                {{ validator.$errors[0].$message }}
            </span>
        </label>
        <div class="input-group" :class="{'border rounded-md border-red-700': validator.$errors.length }">
            <div id="modelValue" class="input-group-text">€</div>
            <input
                :id="modelValue"
                type="number"
                class="form-control"
                :placeholder="title"
                :value="props.modelValue"
                @input="emit('update:modelValue', $event.target.value)"
                :aria-describedby="modelValue"
                @blur="validator.$touch"
            />
        </div>
    </div>
</template>
  
  