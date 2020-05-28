<template>
  <div>
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
      {{ selectLabel }}
    </label>
    <div class="relative">
      <select @change="onChange($event)" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        <option :value="null" disabled selected hidden>{{ selectString }}</option>
        <option
          v-for="option in options"
          :key="option.id"
          :id="option.id"
          :value="option.abbreviation"
        >{{option.name}}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: ["options", "selectLabel", "selectString"],
  methods: {
    onChange(ev) {
      const selOp = ev.target.options;
      const indexOp = ev.target.selectedIndex;
      const optSel = {
        index: indexOp,
        id: selOp[indexOp].id,
        value: selOp[indexOp].value,
        text: selOp[indexOp].text
      };
      this.$emit("optionSelected", optSel);
    }
  }
};
</script>