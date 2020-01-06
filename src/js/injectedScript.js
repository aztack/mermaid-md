export default function () {
  const devtool = window.devtool = {
    /**
     * Post message to content script and then forward message to cc-devtool
     * @param  {String} type, all type are prefixed with ':'
     * @param  {any} data
     */
    postMessage (type, data) {
      window.postMessage({type, data}, '*');
    },
    hasElement (selector) {
      return !!document.querySelector(selector);
    },
    /**
     * Show/hide given element
     * @param  {String} selector
     * @param  {Boolean} val, true fro show, false for hide
     */
    toggleElement (selector, val) {
      var ele = document.querySelector(selector);
      if (!ele) return false;
      ele.style.display = val ? '' : 'none';
    }
  };

  /**
   * print a nice-looking notification if this file injected
   */
  console.log(
    `%c MermaidMd Devtools %c`,
    'background:##9370db ; padding: 1px; border-radius: 2px 0 0 2px;  color: #fff',
    'background:#409EFF ; padding: 1px; border-radius: 0 2px 2px 0;  color: #fff'
  );

  devtool.postMessage(':mermaid-md-found', true);
}
