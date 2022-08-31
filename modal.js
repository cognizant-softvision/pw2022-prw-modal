const style = `
  <style>
    .dialog {
      border: none;
      width: 50%;
    }

    .dialog header {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    
    header span {
      cursor: pointer;
    }
    
    header h1 {
      font-size: 16px;
      font-weight: bold;
      color: var(--primary);
    }
  </style>
`;

const htmlStructure = `
  <dialog part="dialog" class="dialog">
    <header>
      <span> x </span>
    </header>
    <slot part="content"></slot>
  </dialog>
`;


export class PrwModal extends HTMLElement {
  #dialog;
  #header;
  #slot;
  #isOpen = false;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `${style} ${htmlStructure}`;
    this.#dialog = this.shadowRoot.querySelector('dialog');
    this.#header = this.shadowRoot.querySelector('header');
    this.#slot = this.shadowRoot.querySelector('slot');
    this.#slot.addEventListener('slotchange', () => {
      console.log('Slot changed!');
    });
    this.#dialog.addEventListener('click', this.#onBackdropClick.bind(this));
    this.#dialog.addEventListener('cancel', this.#onCancel.bind(this));
    const closeButton = this.#dialog.querySelector('span');
    closeButton.addEventListener('click', this.#onClose.bind(this));
  }

  connectedCallBack() {
    const title = this.#getTitle();
    if (title.length > 0) {
      this.#setTitle(title);
    }
    
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'title') {
      const title = this.#getTitle();
      
      if (title.length > 0) {
        this.#setTitle(title);
      } else {
        this.#removeTitle();
      }
    }
  }

  get open() {
    return this.#isOpen;
  }

  #getTitle() {
    return this.hasAttribute('title') ? this.getAttribute('title') : '';
  }

  #setTitle(title) {
    if (this.#header) {
      const h1Element = document.createElement('h1');
      h1Element.innerHTML = title;
      this.#header.appendChild(h1Element);
    }
  }

  #removeTitle() {
    if (this.#header) {
      const h1Element = this.#header.querySelector('h1');
      this.#header.removeChild(h1Element);
    }
  }

  #onBackdropClick(event) {
    const rect = this.#dialog.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom ||
      event.clientX < rect.left || event.clientX > rect.right) {
      this.#onClose(event);
    }
  }

  #onCancel(event) {
    event.preventDefault();
    this.#onClose();
  }

  #onClose() {
    const closeModalEvent = new Event('onClose', { bubbles: true, composed: true });
    this.dispatchEvent(closeModalEvent);
  }

  showModal() {
    if (!this.#isOpen) {
      this.#dialog.showModal();
      this.#isOpen = true;
    }
  }

  hideModal() {
    if (this.#isOpen) {
      this.#dialog.close();
      this.#isOpen = false;
    }
  }
}