export const createMessage = {
  data() {
    return {};
  },
  methods: {
    createWindow(message: string, ...styles: string[]): HTMLDivElement {
      const popupWindow = document.createElement('div');
      popupWindow.classList.add(styles[0]);
      document.body.style.position = 'relative';
      const messageMessage = this.createPopupMessage(message, styles[1]);
      popupWindow.appendChild(messageMessage);
      return popupWindow;
    },
    createBlocker(): HTMLDivElement {
      const blocker = document.createElement('div');
      blocker.classList.add('blocker');
      document.body.appendChild(blocker);
      return blocker;
    },
    createPopupMessage(message: string, style: string): HTMLParagraphElement {
      const messageMessage = document.createElement('p');
      messageMessage.classList.add(style);
      messageMessage.innerText = message;
      return messageMessage;
    },
    createButton(btnName: string, style: string): HTMLButtonElement {
      const btn = document.createElement('button');
      btn.innerHTML = btnName;
      btn.classList.add(style);
      return btn;
    },
    createBtnBlock(style: string): HTMLDivElement {
      const btnBlock = document.createElement('div');
      btnBlock.classList.add(style);
      return btnBlock;
    },
  },
};
