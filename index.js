class Example extends HTMLElement {
  unsubscribe
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
        <button id="button">Send event</button>
        <div>
          <input type="checkbox" id="unblock-party" name="unlbock">
<label for="unblock">Block party update/create</label><br>
        </div>
        <div id="inner-html">
            CoverGo Platform
        </div>
        <div id="event"></div>
        `
  }

  async initialise(args) {
    console.log("`cgp-example` is initialised with", args)
    const { eventManager, context } = args
  
    const content = this.shadowRoot.getElementById("inner-html");
    content.innerHTML = `
      <div>The plugin has been initialized with</div>
      <div>=========</div>
      <pre>${JSON.stringify(context, null, 2)}</pre>
    `
  
    this.unsubscribe = eventManager.subscribe("cgp:*", async ({ type, data }) => {
      console.log("[cgp-example][EVENT]", `[${type}]`, data)
      this.shadowRoot.getElementById("event").innerHTML = `
          <div>=========</div>
          
          <pre>Received event: ${type}</pre>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          <div>=========</div>
        `

        if (type === "cgp:party:before-save") {
          const shouldBlock =  !!this.shadowRoot.getElementById("unblock-party").checked;
          return {
            block: shouldBlock
          }
        }
      }).unsubscribe;

    this.shadowRoot.getElementById("button").addEventListener("click", () => {
      eventManager.publish({
        type: "plugin:debug:event",
        data: {
          "foo": "bar"
        }
      })
    })
  }

  disconnectedCallback() {
    console.log("`cgp-example` is destroyed!")
    this.unsubscribe?.()
  }
}

if (!window.customElements.get("cgp-example")) {
  customElements.define("cgp-example", Example)
}

