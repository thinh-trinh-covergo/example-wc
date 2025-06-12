let unsubscribe

class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div>
            Hello CGP Fellows! This is an Example WebComponent ❤️
            <button id="button">Click me!</button>
            <div>
            <span>Message from host:</span>
            <span id="message"></span>
            </div>
        </div>
        `
  }

  connectedCallback() {
  }
}

customElements.define("cgp-example", Example)

const initialise = async (args) => {
  console.log("`cgp-example` is initialised with", args)
  const { eventManager, root } = args

  unsubscribe = eventManager.subscribe(event => {
    console.log("RECEIVED EVENT FROM HOST:", event)
  }).unsubscribe


  root.getElementById("button").addEventListener("click", () => {
    eventManager.publish({
      type: 'wc:message',
      data: "Hello from WebComponent!"
    })
  })
}

const destroy = async () => {
  console.log("`cgp-example` is destroyed!")
  unsubscribe()
}

export {
  initialise,
  destroy
}
