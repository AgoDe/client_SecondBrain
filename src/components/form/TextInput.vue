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
        <label :for="modelValue" class="form-label flex justify-between">
            {{title}}
            <span v-if="validator.$errors.length" class="text-red-700">
                {{ validator.$errors[0].$message }}
            </span>
        </label>
        <input
            :id="modelValue"
            type="text"
            class="form-control w-full"
            :placeholder="title"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            :class="{
            'border-red-700': validator.$errors.length
            }"
            @blur="validator.$touch"
        />
    </div>
</template>
  
  