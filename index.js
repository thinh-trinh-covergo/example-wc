class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div id="inner-html">
            CoverGo Platform
        </div>
        `
  }
}

customElements.define("cgp-example", Example)

const initialise = async (args) => {
  console.log("`cgp-example` is initialised with", args)
  const { root } = args

  const content = root.getElementById("inner-html");
  content.innerHTML = `
    <div>The plugin has been initialized with</div>
    <div>${JSON.stringify(args, null, 2)}</div
  `
}

const destroy = async () => {
  console.log("`cgp-example` is destroyed!")
}

export {
  initialise,
  destroy
}
