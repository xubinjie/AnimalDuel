// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>FL-Framework &nbsp V0.1.1.0 </h2>
    <hr />
    <div>Copyright (c) 2017- <span id="label">厦门风领科技有限公司（http://www.fenglinghudong.com）</span></div>
    <hr />
  `,

  // element and variable binding
  $: {
    label: '#label',
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    // this.$btn.addEventListener('confirm', () => {
    //   Editor.Ipc.sendToMain('fl-framework:clicked');
    // });
  },

  // register your ipc messages here
  messages: {
    'fl-framework:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});