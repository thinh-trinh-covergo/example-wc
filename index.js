class Example extends HTMLElement {
  unsubscribe
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
        <div id="inner-html">
            CoverGo Platform
        </div>
        <div id="event"></div>
        `
  }

  disconnectedCallback() {
    console.log("`cgp-example` is destroyed!")
    unsubscribe?.()
  }

  initialise = async (args) => {
    console.log("`cgp-example` is initialised with", args)
    const { eventManager, context } = args
  
    const content = this.shadowRoot.getElementById("inner-html");
    content.innerHTML = `
      <div>The plugin has been initialized with</div>
      <div>=========</div>
      <pre>${JSON.stringify(context, null, 2)}</pre>
    `
  
    this.unsubscribe = eventManager.subscribe("cgp:party:modified", ({ type, data }) => {
      console.log("[cgp-example][EVENT]", data)  
      this.shadowRoot.getElementById("event").innerHTML = `
          <div>=========</div>
          
          <pre>Received event: ${type}</pre>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          <div>=========</div>
        `
      }).unsubscribe;
  }

  destroy = async () => {}
}

if (!window.customElements.get("cgp-example")) {
  customElements.define("cgp-example", Example)
}
