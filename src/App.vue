<template>
    <div class="calculator">
        <input
            type="text"
            v-model="operation_display"
            class="operation_display"
            disabled
        />

        <input
            type="text"
            v-model="display"
            class="display"
            placeholder="0"
            disabled
        />

        <div class="buttons">
            <button
                v-for="btn in buttons"
                :key="btn.value"
                @click="update(btn)"
                :class="`button button_${
                    btn.type || 'default'
                }`"
            >
                <span class="inner_text">
                    {{ btn.value }}
                </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    setup() {
        const operation_display = ref('');
        const display = ref('');
        const currentNumber = ref('');
        const previousNumber = ref('');
        const currentOperator = ref('');
        const isOperator = ref(false);
        const result = ref(0);
        const buttons = [
            { value: 'AC', type: 'clear' },
            { value: '√', type: 'operator' },
            { value: '%', type: 'operator' },
            { value: '/', type: 'operator' },

            { value: '7' },
            { value: '8' },
            { value: '9' },
            { value: '×', type: 'operator' },

            { value: '4' },
            { value: '5' },
            { value: '6' },
            { value: '-', type: 'operator' },

            { value: '1' },
            { value: '2' },
            { value: '3' },
            { value: '+', type: 'operator' },

            { value: '00' },
            { value: '0' },
            { value: ',' },
            { value: '=', type: 'result' }
        ];

        const update = (value: any) => {
            if (value.type === 'clear') {
                display.value = '';
                operation_display.value = '';
                currentNumber.value = '';
                previousNumber.value = '';
                currentOperator.value = '';
                result.value = 0;
                return;
            }

            if (display.value.length > 10) {
                return;
            }

            if (value.type === 'result') {
                if (
                    previousNumber.value &&
                    display.value &&
                    currentOperator.value
                ) {
                    calculate();
                    display.value = result.value
                        .toString()
                        .replace('.', ',');
                    if (display.value.length > 10) {
                        display.value = Number(
                            display.value
                        )
                            .toPrecision(8)
                            .replace('e+', 'e')
                            .replace('.', ',');
                    }

                    isOperator.value = false;
                    currentOperator.value = '';
                    return;
                }
                return;
            }

            if (value.type === 'operator') {
                if (!display.value) {
                    return;
                }

                if (value.value === '√') {
                    display.value = Math.sqrt(
                        Number(display.value)
                    )
                        .toPrecision(10)
                        .replace('.', ',');

                    return;
                }

                if (value.value === '%') {
                    if (
                        !isOperator.value &&
                        !currentOperator.value
                    ) {
                        display.value = (
                            Number(display.value) / 100
                        )
                            .toString()
                            .replace('.', ',');
                    } else {
                        display.value = (
                            (parseFloat(
                                previousNumber.value
                            ) /
                                100) *
                            parseFloat(display.value)
                        )
                            .toString()
                            .replace('.', ',');
                        operation_display.value += '%';
                    }

                    return;
                }

                isOperator.value = true;

                if (currentOperator.value) {
                    calculate();
                    display.value = result.value
                        .toPrecision(8)
                        .replace('e+', 'e');
                }

                currentOperator.value = value.value;
                previousNumber.value = display.value;

                operation_display.value += value.value;
                return;
            }

            if (isOperator.value) {
                display.value = '';
                isOperator.value = false;
            }
            display.value += value.value;
            operation_display.value += value.value;
        };

        const calculate = () => {
            const num1 = parseFloat(
                previousNumber.value.replace(',', '.')
            );
            const num2 = parseFloat(
                display.value.replace(',', '.')
            );

            switch (currentOperator.value) {
                case '+':
                    result.value = num1 + num2;
                    break;
                case '-':
                    result.value = num1 - num2;
                    break;
                case '×':
                    result.value = num1 * num2;
                    break;
                case '/':
                    result.value = num1 / num2;
                    break;
                default:
                    return;
            }
        };

        return {
            operation_display,
            display,
            buttons,
            update
        };
    }
};
</script>
