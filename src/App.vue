<template>
  <div class="wrapper">
    <div class="calculator">
      <input type="text" v-model="smallDisplay" class="small_display" disabled />
      <input type="text" v-model="display" class="display" placeholder="0" disabled />

      <div class="buttons">
        <button
          v-for="btn in buttons"
          :key="btn.value"
          @click="clickHandler(btn)"
          :class="`button button_${btn.type || 'default'}`"
        >
          <span class="inner_text">{{ btn.value }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  interface Button {
    value: string;
    type?: "spec" | "clear" | "operator" | "result";
  }

  export default defineComponent({
    setup() {
      const smallDisplay = ref<string>("");
      const display = ref<string>("");
      const operator = ref<string>("");
      const prevNumber = ref<string>("");
      const result = ref<string | null>(null);
      const needNewNumber = ref<boolean>(false);
      const isCalculated = ref<boolean>(false);

      const buttons: Button[] = [
        { value: "AC", type: "clear" },
        { value: "√", type: "spec" },
        { value: "%", type: "spec" },
        { value: "/", type: "operator" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "×", type: "operator" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "-", type: "operator" },
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "+", type: "operator" },
        { value: "00", type: "spec" },
        { value: "0", type: "spec" },
        { value: ",", type: "spec" },
        { value: "=", type: "result" }
      ];

      const clearAll = () => {
        display.value = "";
        smallDisplay.value = "";
        prevNumber.value = "";
        operator.value = "";
        result.value = null;
        needNewNumber.value = false;
        isCalculated.value = false;
      };

      const handleOperator = (op: string) => {
        const lastChar = smallDisplay.value.slice(-1);

        if (!isNaN(Number(lastChar)) && display.value) {
          if (operator.value && !isCalculated.value) {
            calculate();
          }
          prevNumber.value = display.value;
        }

        needNewNumber.value = true;

        if (isNaN(Number(lastChar))) {
          smallDisplay.value = smallDisplay.value.slice(0, -1) + op;
        } else {
          smallDisplay.value += op;
        }

        operator.value = op;
      };

      const handleNumber = (num: string) => {
        if (needNewNumber.value || display.value === result.value) {
          prevNumber.value = display.value;
          needNewNumber.value = false;
          display.value = "";
        }

        if (display.value === "0" && num !== "0") {
          display.value = num;
        } else {
          display.value += num;
        }

        smallDisplay.value += num;
        isCalculated.value = false;
      };

      const clickHandler = (btn: Button) => {
        switch (btn.type) {
          case "clear":
            clearAll();
            break;
          case "operator":
            handleOperator(btn.value);
            break;
          case "spec":
            specialCalculate(btn.value);
            break;
          case "result":
            calculate();
            operator.value = "";
            needNewNumber.value = true;
            break;
          default:
            handleNumber(btn.value);
            break;
        }
      };

      const calculate = () => {
        if (isCalculated.value || !operator.value) {
          return;
        }

        const num1 = parseFloat(prevNumber.value || "0");
        const num2 = parseFloat(display.value);

        if (isNaN(num1) || isNaN(num2)) {
          return;
        }

        switch (operator.value) {
          case "+":
            result.value = (num1 + num2).toString();
            break;
          case "-":
            result.value = (num1 - num2).toString();
            break;
          case "×":
            result.value = (num1 * num2).toString();
            break;
          case "/":
            result.value = (num1 / num2).toString();
            break;
          default:
            return;
        }

        display.value = result.value;
        isCalculated.value = true;
      };

      const specialCalculate = (spec: string) => {
        const num = parseFloat(display.value);

        if (isNaN(num)) {
          display.value = "0";
          return;
        }

        switch (spec) {
          case "%":
            if (prevNumber.value) {
              if (operator.value === "×" || operator.value === "/") {
                display.value = (Number(display.value) / 100).toString();
              } else {
                display.value = (
                  (Number(display.value) * Number(prevNumber.value)) /
                  100
                ).toString();
              }
            } else {
              display.value = (Number(display.value) / 100).toString();
            }
            break;

          case "√":
            display.value = Math.sqrt(num).toString();
            break;
          case "0":
            if (display.value !== "0") {
              smallDisplay.value += "0";
              display.value += "0";
            }
            break;
          case "00":
            if (num > 0 || display.value.includes(".")) {
              smallDisplay.value += "00";
              display.value += "00";
            }
            break;

          case ",":
            if (!display.value.includes(".")) {
              smallDisplay.value += ".";
              display.value += ".";
            }
            break;
          default:
            return;
        }
      };

      return {
        smallDisplay,
        display,
        buttons,
        clickHandler
      };
    }
  });
</script>
