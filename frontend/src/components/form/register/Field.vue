<template>
    <div class="py-8 px-16">
        <label :for="id" class="text-sm text-gray-600">{{ label }}</label>
        <input
            :id="id"
            v-model="inputValue"
            :type="type"
            :disabled="disabled"
            :class="['mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500', customClass]"
            @input="updateValue"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType, ref, watch } from 'vue';

    export default defineComponent({
        name: 'FormField',
        props: {
            modelValue: {
                type: String as PropType<string>,
                required: true
            },
            type: {
                type: String as PropType<string>,
                default: 'text'
            },
            label: {
                type: String as PropType<string>,
                required: true
            },
            id: {
                type: String as PropType<string>,
                required: true
            },
            disabled: {
                type: Boolean as PropType<boolean>,
                default: false
            },
            customClass: {
                type: String as PropType<string>,
                default: ''
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const inputValue = ref(props.modelValue);

            watch(inputValue, (newValue) => {
                emit('update:modelValue', newValue);
            });

            watch(() => props.modelValue, (newValue) => {
                inputValue.value = newValue;
            });

            const updateValue = (event: Event) => {
                const target = event.target as HTMLInputElement;
                inputValue.value = target.value;
            };

            return {
                inputValue,
                updateValue
            };
        }
    });
</script>
