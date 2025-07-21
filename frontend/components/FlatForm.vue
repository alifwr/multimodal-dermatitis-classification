<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(value: string): boolean {
      return [
          'text',
          'number',
          'checkbox',
          'radio'
      ].includes(value)
    }
  },
  label: {
    type: String,
    required: true
  },
  isMultiline: {
    type: Boolean,
    required: false,
    default: false
  },
  options: {
    name: Array<String|number>,
    required: false
  },
  modelValue: {
    type: [String, Array],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const isValidType = (type: String) => {
  return type=='number' || type=='text' || type=='radio';
}

const isCheckboxChecked = (value: string) => {
  return props.modelValue.includes(value);
}

const handleChange = (event: any) => {
  emit('update:modelValue', event.target.value)
}

const handleCheckboxChange = (event: any) => {
  const { value, checked } = event.target
  let newValue = [...props.modelValue]

  if (checked) {
    if (!newValue.includes(value)) {
      newValue.push(value)
    }
  } else {
    newValue = newValue.filter(item => item !== value)
  }

  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <label class="text-xl font-opensans font-bold">
      {{label}}
    </label>

    <input v-if="!isMultiline && (type==='text' || type==='number')"
           :type="type"
           class="w-1/2 px-5 py-3 mt-4 rounded-[20px] bg-transparent border border-black"
           @change="handleChange"
    />
    <textarea
        v-else-if="isMultiline && type==='text'"
        class="w-3/4 min-h-24 px-5 py-3 mt-4 rounded-[20px] bg-transparent border border-black"
        @change="handleChange"
    />
    <div v-if="type==='radio' || type==='checkbox'" class="mt-2">
      <label
          v-for="option in options"
          :key="option"
          class="flex gap-2 items-start mb-4"
      >
        <input
            v-if="type==='checkbox'"
            :type="type"
            :value="option"
            :checked="isCheckboxChecked(option)"
            @change="handleCheckboxChange"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0 mt-0.5"
        />
        <input
            v-else
            :type="type"
            :value="option"
            :checked="modelValue === option"
            @change="handleChange"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0 mt-0.5"
        />
        <span class="text-xl font-opensans text-left">{{option}}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>