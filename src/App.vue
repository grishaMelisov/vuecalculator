<template>
    <div class="wrapper">
        <div class="calculator">
            <input
                type="text"
                v-model="small_display"
                class="small_display"
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
                    @click="clickHandler(btn)"
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
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    setup() {
        const small_display = ref('');
        const display = ref('');

        const operator = ref('');
        const prevNumber = ref('');
        const result = ref(null) as any;

        const needNewNumber = ref(false);
        const isCalculated = ref(false);

        const buttons = [
            { value: 'AC', type: 'clear' },
            { value: '√', type: 'spec' },
            { value: '%', type: 'spec' },
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

            { value: '00', type: 'spec' },
            { value: '0', type: 'spec' },
            { value: ',', type: 'spec' },
            { value: '=', type: 'result' }
        ];

        const clickHandler = (btn: any) => {
            switch (btn.type) {
                case 'clear':
                    display.value = '';
                    small_display.value = '';
                    prevNumber.value = '';
                    operator.value = '';
                    result.value = null;
                    needNewNumber.value = false;
                    isCalculated.value = false;
                    break;

                case 'operator':
                    const lastChar =
                        small_display.value[
                            small_display.value.length - 1
                        ];

                    if (operator.value && !isCalculated) {
                        calculate();
                    }
                    needNewNumber.value = true;
                    operator.value = btn.value;

                    if (isNaN(lastChar)) {
                        small_display.value =
                            small_display.value.slice(
                                0,
                                -1
                            ) + btn.value;
                    } else {
                        small_display.value += btn.value;
                    }
                    break;

                case 'spec':
                    specialCalculate(btn.value);
                    break;

                case 'result':
                    calculate();
                    operator.value = '';
                    needNewNumber.value = true;
                    break;

                default:
                    if (
                        needNewNumber.value ||
                        display.value === result.value
                    ) {
                        prevNumber.value = display.value;
                        needNewNumber.value = false;
                        display.value = '';
                    }

                    display.value += btn.value;
                    small_display.value += btn.value;

                    isCalculated.value = false;
                    return;
            }
        };

        const calculate = () => {
            if (isCalculated.value || !display.value) {
                return;
            }

            if (!prevNumber.value) {
                prevNumber.value = '0';
            }

            needNewNumber.value = true;

            const num1 = parseFloat(prevNumber.value);
            const num2 = parseFloat(display.value);

            switch (operator.value) {
                case '+':
                    result.value = (num1 + num2).toString();
                    display.value = result.value;
                    break;

                case '-':
                    result.value = (num1 - num2).toString();
                    display.value = result.value;
                    break;

                case '×':
                    result.value = (num1 * num2).toString();
                    display.value = result.value;
                    break;

                case '/':
                    result.value = (num1 / num2).toString();
                    display.value = result.value;
                    break;

                default:
                    return;
            }

            isCalculated.value = true;
        };

        const specialCalculate = (spec: string) => {
            const num = Number(display.value);

            switch (spec) {
                case '%':
                    if (prevNumber.value) {
                        if (
                            operator.value === '×' ||
                            operator.value === '/'
                        ) {
                            display.value = (
                                Number(display.value) / 100
                            ).toString();
                        } else {
                            display.value = (
                                (Number(display.value) *
                                    Number(
                                        prevNumber.value
                                    )) /
                                100
                            ).toString();
                        }
                    } else {
                        display.value = (
                            Number(display.value) / 100
                        ).toString();
                    }
                    break;

                case '√':
                    display.value = Math.sqrt(
                        Number(display.value)
                    ).toString();
                    break;

                case '0':
                    if (display.value.length < 1) {
                        display.value += '0';
                    }

                    if (
                        display.value.includes('.') ||
                        num !== 0
                    ) {
                        display.value += '0';
                    }
                    break;

                case '00':
                    if (Number(display.value) > 0) {
                        display.value += '00';
                    }
                    break;

                case ',':
                    if (
                        Number.isInteger(num) &&
                        display.value &&
                        !display.value.includes('.')
                    ) {
                        display.value += '.';
                    }
                    break;

                default:
                    return;
            }
        };

        return {
            small_display,
            display,
            buttons,
            clickHandler
        };
    }
};
</script>
