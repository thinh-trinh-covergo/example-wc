class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div id="inner-html">
            CoverGo Platform
        </div>
        <button id="button">Send event to host</button>
        `
  }
}

customElements.define("cgp-example", Example)

const initialise = async (args) => {
  console.log("`cgp-example` is initialised with", args)
  const { eventMaager, root } = args

  const content = root.getElementById("inner-html");
  content.innerHTML = `
    <div>The plugin has been initialized with</div>
    <pre>${JSON.stringify(args, null, 2)}</pre>
  `

  root.getElementById("button").addEventListener("click", () => {
    eventManager.publish({
      type: 'wc:message',
      data: "Hello from WebComponent!"
    })
  })
}

const destroy = async () => {
  console.log("`cgp-example` is destroyed!")
}

export {
  initialise,
  destroy
}
