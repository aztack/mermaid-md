<template lang="pug">
.cc-devtool-options
  h1 Mermaid Markdown Settings
  form(style="width: 500px")
    fieldset
      legend Selectors
      table
        tr(v-for="(sel, i) in selectors")
          td(width="100%")
            el-input(size="mini" :key="i" v-model="selectors[i]")
          td
            el-button(size="mini" @click="remove(i)") Remove
    br
    fieldset
      legend Add Selector
      table
        tr
          td(width="100%")
            el-input(size="mini" v-model="selector")
          td
            el-button(size="mini" @click="add" :disabled="!selector") Add
    br
    div(style="float:right")
      el-button(size="mini" @click="reset") Reset
      el-button(size="mini" @click="save") Save
</template>

<style lang="styl">
fieldset
  border: 1px solid #bbb;
  border-radius: 4px;
p
  margin: 1em
  min-width: 20em
  text-align: center
</style>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import ElButton from 'element-ui/lib/button'
import ElContainer from 'element-ui/lib/container'
import ElHeader from 'element-ui/lib/header'
import ElMain from 'element-ui/lib/main'
import ElInput from 'element-ui/lib/input'

export default {
  name: 'MermaidMdDevtollOptions',
  components: {
    ElButton,
    ElHeader,
    ElMain,
    ElInput
  },
  data () {
    return {
      selector: '',
      selectors: []
    }
  },
  mounted () {
    this.restore();
  },
  methods: {
    save() {
      chrome.storage.sync.set({
        selectors: this.selectors
      });
    },
    restore() {
      chrome.storage.sync.get(['selectors'], (result) => {
        if (typeof result.selectors === 'undefined' || result.selectors.length === 0) {
          this.reset();
        } else {
          this.selectors = result.selectors;
        }
      });
    },
    add() {
      this.selectors.push(this.selector);
      this.save();
      this.selector = '';
    },
    remove(i) {
      this.selectors.splice(i);
      this.save();
    },
    reset() {
      this.selectors = ['[lang=mermaid] code'];
      this.save();
    }
  }
}
</script>
