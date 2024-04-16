(function () {
    const config = {"enabled":true,"general":{"phoneNumber":"50661803642","prefilledMessage":{"enabled":false,"text":"Hey there, I have a question!"}},"appearance":{"type":"logoCircleButton","agentImage":null,"buttonText":null,"placement":{"position":"bottomRight","spacing":{"left":16,"right":16,"bottom":16}},"visibility":{"showOnMobile":true,"showOnDesktop":true}},"enhancements":{"notificationBadge":{"enabled":false,"count":1},"greetingMessage":{"enabled":false,"text":"Hi, how can I help you?"}},"developers":{"customCSS":false}};

    if (window.eazeappsWhatsAppChatButtonLoaded) return;
    window.eazeappsWhatsAppChatButtonLoaded = true;

    class GTYWhatsAppChatButton extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({ mode: 'open' });

            this.config = config;

            if (this.config.enabled == false) {
                return false;
            }

            this.style.display = 'block';

            let wrapper = this.getWrapper();
            let wrapperEl = wrapper.content.querySelector('.gty-wacb-wrapper');

            let whatsAppLink = this.getWhatsAppLink(this.config.general.phoneNumber, (this.config.general.prefilledMessage.enabled ? this.config.general.prefilledMessage.text : false));
            let button = this.getButton(this.config.appearance.type, whatsAppLink, this.config.appearance.agentImage, this.config.appearance.buttonText);
            let greetingMessage = this.getGreetingMessage(this.config.enhancements.greetingMessage.enabled, this.config.enhancements.greetingMessage.text, whatsAppLink);
            let notificationBadge = this.getNotificationBadge(this.config.enhancements.notificationBadge.enabled, this.config.enhancements.notificationBadge.count, whatsAppLink);

            wrapperEl.appendChild(greetingMessage.content.cloneNode(true));
            wrapperEl.appendChild(notificationBadge.content.cloneNode(true));
            wrapperEl.appendChild(button.content.cloneNode(true));

            this.shadowRoot.appendChild(wrapper.content.cloneNode(true));
            this.shadowRoot.appendChild(this.getPlacementStyle(this.config.appearance.placement.position, this.config.appearance.placement.spacing));
            this.shadowRoot.appendChild(this.getVisibilityStyle(this.config.appearance.visibility.showOnMobile, this.config.appearance.visibility.showOnDesktop));
            this.shadowRoot.appendChild(this.getCustomCSSStyle(this.config.developers.customCSS));
        }

        getWrapper() {
            const wrapper = document.createElement('template');

            wrapper.innerHTML = `
        <style>
          .gty-wacb-wrapper {
            display: inline-flex;
            align-items: flex-start;
            z-index: 9999;
            position: fixed;
          }
        </style>

        <div class="gty-wacb-wrapper"></div>`;

            return wrapper;
        }

        getNotificationBadge(enabled, count, link) {
            const notificationBadge = document.createElement('template');

            if (!enabled || count <= 0) {
                return notificationBadge;
            }

            notificationBadge.innerHTML = `
        <style>
          .gty-wacb-notification-badge {
            height: 20px;
            min-width: 8px;
            background-color: #FF0303;
            font-size: 12px;
            color: #fff;
            text-decoration: none;
            border-radius: 10px;
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 6px;
            padding-right: 6px;
          }
        </style>

        <a href="${link}" class="gty-wacb-notification-badge" target="_blank">${count}</a>`;

            return notificationBadge;
        }

        getGreetingMessage(enabled, text, link) {
            const greetingMessage = document.createElement('template');

            if (!enabled || !text) {
                return greetingMessage;
            }

            greetingMessage.innerHTML = `
        <style>
          .gty-wacb-greeting-message {
            position: relative;
            background-color: #E0F6CA;
            color: #000;
            border-radius: 6px 0 6px 6px;
            font-size: 12px;
            text-decoration: none;
            margin-right: 12px;
            line-height: 32px;
            padding: 0 8px;
          }

          .gty-wacb-greeting-message::after {
            content: "";
            position: absolute;
            top: 0;
            left: 100%;
            width: 0;
            border-top: 12px solid #E0F6CA;
            border-left: 0px solid transparent;
            border-right: 7px solid transparent;
          }
        </style>

        <a href="${link}" class="gty-wacb-greeting-message" target="_blank">
          ${text}
        </a>`;

            return greetingMessage;
        }

        getButton(type, link, agentImage = false, buttonText = false) {
            let button = document.createElement('template');

            if (type == "logoTextButton" && !buttonText) {
                return button;
            }

            switch (type) {
                case "logoTextButton":
                    button.innerHTML = `
          <style>
            .gty-wacb-button {
              background-color: #59CE72;
              text-decoration: none;
              border-radius: 23px;
              height: 46px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              padding-left: 16px;
              padding-right: 16px;
            }

            .gty-wacb-button-logo {
              margin-right: 8px;
              width: 30px;
              height: 30px;
            }

            .gty-wacb-button-text {
              font-size: 16px;
              color: #fff;
            }

            .gty-wacb-notification-badge {
              margin-top: -4px;
              margin-right: -4px;
            }
          </style>

          <a href="${link}" class="gty-wacb-button" target="_blank">
            <svg class="gty-wacb-button-logo" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.2071 4.65C24.2143 1.65 20.2286 0 15.9929 0C7.25 0 0.135714 7.11429 0.135714 15.8571C0.135714 18.65 0.864286 21.3786 2.25 23.7857L0 32L8.40714 29.7929C10.7214 31.0571 13.3286 31.7214 15.9857 31.7214H15.9929C24.7286 31.7214 32 24.6071 32 15.8643C32 11.6286 30.2 7.65 27.2071 4.65ZM15.9929 29.05C13.6214 29.05 11.3 28.4143 9.27857 27.2143L8.8 26.9286L3.81429 28.2357L5.14286 23.3714L4.82857 22.8714C3.50714 20.7714 2.81429 18.35 2.81429 15.8571C2.81429 8.59286 8.72857 2.67857 16 2.67857C19.5214 2.67857 22.8286 4.05 25.3143 6.54286C27.8 9.03572 29.3286 12.3429 29.3214 15.8643C29.3214 23.1357 23.2571 29.05 15.9929 29.05ZM23.2214 19.1786C22.8286 18.9786 20.8786 18.0214 20.5143 17.8929C20.15 17.7571 19.8857 17.6929 19.6214 18.0929C19.3571 18.4929 18.6 19.3786 18.3643 19.65C18.1357 19.9143 17.9 19.95 17.5071 19.75C15.1786 18.5857 13.65 17.6714 12.1143 15.0357C11.7071 14.3357 12.5214 14.3857 13.2786 12.8714C13.4071 12.6071 13.3429 12.3786 13.2429 12.1786C13.1429 11.9786 12.35 10.0286 12.0214 9.23571C11.7 8.46429 11.3714 8.57143 11.1286 8.55714C10.9 8.54286 10.6357 8.54286 10.3714 8.54286C10.1071 8.54286 9.67857 8.64286 9.31429 9.03572C8.95 9.43571 7.92857 10.3929 7.92857 12.3429C7.92857 14.2929 9.35 16.1786 9.54286 16.4429C9.74286 16.7071 12.3357 20.7071 16.3143 22.4286C18.8286 23.5143 19.8143 23.6071 21.0714 23.4214C21.8357 23.3071 23.4143 22.4643 23.7429 21.5357C24.0714 20.6071 24.0714 19.8143 23.9714 19.65C23.8786 19.4714 23.6143 19.3714 23.2214 19.1786Z" fill="white"/>
            </svg>
            <div class="gty-wacb-button-text">${buttonText}</div>
          </a>`;
                    break;
                case "logoCircleButton":
                    button.innerHTML = `
          <style>
            .gty-wacb-button {
              background-color: #59CE72;
              text-decoration: none;
              border-radius: 100%;
              width: 64px;
              height: 64px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
          </style>

          <a href="${link}" class="gty-wacb-button" target="_blank">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.2071 4.65C24.2143 1.65 20.2286 0 15.9929 0C7.25 0 0.135714 7.11429 0.135714 15.8571C0.135714 18.65 0.864286 21.3786 2.25 23.7857L0 32L8.40714 29.7929C10.7214 31.0571 13.3286 31.7214 15.9857 31.7214H15.9929C24.7286 31.7214 32 24.6071 32 15.8643C32 11.6286 30.2 7.65 27.2071 4.65ZM15.9929 29.05C13.6214 29.05 11.3 28.4143 9.27857 27.2143L8.8 26.9286L3.81429 28.2357L5.14286 23.3714L4.82857 22.8714C3.50714 20.7714 2.81429 18.35 2.81429 15.8571C2.81429 8.59286 8.72857 2.67857 16 2.67857C19.5214 2.67857 22.8286 4.05 25.3143 6.54286C27.8 9.03572 29.3286 12.3429 29.3214 15.8643C29.3214 23.1357 23.2571 29.05 15.9929 29.05ZM23.2214 19.1786C22.8286 18.9786 20.8786 18.0214 20.5143 17.8929C20.15 17.7571 19.8857 17.6929 19.6214 18.0929C19.3571 18.4929 18.6 19.3786 18.3643 19.65C18.1357 19.9143 17.9 19.95 17.5071 19.75C15.1786 18.5857 13.65 17.6714 12.1143 15.0357C11.7071 14.3357 12.5214 14.3857 13.2786 12.8714C13.4071 12.6071 13.3429 12.3786 13.2429 12.1786C13.1429 11.9786 12.35 10.0286 12.0214 9.23571C11.7 8.46429 11.3714 8.57143 11.1286 8.55714C10.9 8.54286 10.6357 8.54286 10.3714 8.54286C10.1071 8.54286 9.67857 8.64286 9.31429 9.03572C8.95 9.43571 7.92857 10.3929 7.92857 12.3429C7.92857 14.2929 9.35 16.1786 9.54286 16.4429C9.74286 16.7071 12.3357 20.7071 16.3143 22.4286C18.8286 23.5143 19.8143 23.6071 21.0714 23.4214C21.8357 23.3071 23.4143 22.4643 23.7429 21.5357C24.0714 20.6071 24.0714 19.8143 23.9714 19.65C23.8786 19.4714 23.6143 19.3714 23.2214 19.1786Z" fill="white"/>
            </svg>
          </a>`;
                    break;
                case "agentCircleButton":
                    button.innerHTML = `
          <style>
            .gty-wacb-button {
              border-radius: 100%;
              text-decoration: none;
              width: 64px;
              height: 64px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            .gty-wacb-button-agent-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }

            .gty-wacb-button-logo {
              width: 10px;
              height: 10px;
              padding: 5px;
              position: absolute;
              bottom: 0;
              right: 0;
              background-color: #59CE72;
              border-radius: 100%;
            }
          </style>

          <a href="${link}" class="gty-wacb-button" target="_blank">
            <img class="gty-wacb-button-agent-image" src="${agentImage}"/>
            <svg class="gty-wacb-button-logo" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.2071 4.65C24.2143 1.65 20.2286 0 15.9929 0C7.25 0 0.135714 7.11429 0.135714 15.8571C0.135714 18.65 0.864286 21.3786 2.25 23.7857L0 32L8.40714 29.7929C10.7214 31.0571 13.3286 31.7214 15.9857 31.7214H15.9929C24.7286 31.7214 32 24.6071 32 15.8643C32 11.6286 30.2 7.65 27.2071 4.65ZM15.9929 29.05C13.6214 29.05 11.3 28.4143 9.27857 27.2143L8.8 26.9286L3.81429 28.2357L5.14286 23.3714L4.82857 22.8714C3.50714 20.7714 2.81429 18.35 2.81429 15.8571C2.81429 8.59286 8.72857 2.67857 16 2.67857C19.5214 2.67857 22.8286 4.05 25.3143 6.54286C27.8 9.03572 29.3286 12.3429 29.3214 15.8643C29.3214 23.1357 23.2571 29.05 15.9929 29.05ZM23.2214 19.1786C22.8286 18.9786 20.8786 18.0214 20.5143 17.8929C20.15 17.7571 19.8857 17.6929 19.6214 18.0929C19.3571 18.4929 18.6 19.3786 18.3643 19.65C18.1357 19.9143 17.9 19.95 17.5071 19.75C15.1786 18.5857 13.65 17.6714 12.1143 15.0357C11.7071 14.3357 12.5214 14.3857 13.2786 12.8714C13.4071 12.6071 13.3429 12.3786 13.2429 12.1786C13.1429 11.9786 12.35 10.0286 12.0214 9.23571C11.7 8.46429 11.3714 8.57143 11.1286 8.55714C10.9 8.54286 10.6357 8.54286 10.3714 8.54286C10.1071 8.54286 9.67857 8.64286 9.31429 9.03572C8.95 9.43571 7.92857 10.3929 7.92857 12.3429C7.92857 14.2929 9.35 16.1786 9.54286 16.4429C9.74286 16.7071 12.3357 20.7071 16.3143 22.4286C18.8286 23.5143 19.8143 23.6071 21.0714 23.4214C21.8357 23.3071 23.4143 22.4643 23.7429 21.5357C24.0714 20.6071 24.0714 19.8143 23.9714 19.65C23.8786 19.4714 23.6143 19.3714 23.2214 19.1786Z" fill="white"/>
            </svg>
          </a>`;

                    break;
            }

            return button;
        }

        getVisibilityStyle(showOnMobile, showOnDesktop) {
            const style = document.createElement("style");
            let styleContent = "";

            if (showOnMobile == false) {
                styleContent += `
        @media (max-width: 767px) {
          .gty-wacb-wrapper {
            display: none;
          }
        }`
            }

            if (showOnDesktop == false) {
                styleContent += `
        @media (min-width: 768px) {
          .gty-wacb-wrapper {
            display: none;
          }
        }`
            }

            style.textContent = styleContent;

            return style;
        }

        getPlacementStyle(position, spacing) {
            const style = document.createElement("style");

            let styleContent = `
      .gty-wacb-wrapper {
        bottom: ${spacing.bottom}px;`

            switch (position) {
                case "bottomLeft":
                    styleContent += `left: ${spacing.left}px;`
                    break;
                case "bottomRight":
                    styleContent += `right: ${spacing.right}px;`
                    break;
            }

            styleContent += `}`

            style.textContent = styleContent;

            return style;
        }

        getCustomCSSStyle(customCSS) {
            const style = document.createElement("style");

            if (!customCSS) {
                return style;
            }

            style.textContent = customCSS;

            return style;
        }

        getWhatsAppLink(phoneNumber, message) {
            if (!phoneNumber) {
                throw ('phoneNumber missing')
            }

            let link = new URL("https://wa.me/");

            link.pathname = phoneNumber;

            if (message) {
                link.searchParams.append("text", message);
            }

            return link;
        }
    }

    window.customElements.define('gty-whatsapp-chat-button', GTYWhatsAppChatButton);

    document.body.appendChild(new GTYWhatsAppChatButton);
}());
