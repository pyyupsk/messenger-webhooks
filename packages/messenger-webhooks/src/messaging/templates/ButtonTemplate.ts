import type { Button } from '@/messaging';

/**
 * Represents a ButtonTemplate that includes a message with up to 3 buttons.
 */
export class ButtonTemplate {
    text: string;
    buttons: Button[] = [];

    /**
     * Creates a new ButtonTemplate.
     * @param text - The text to display in the template. Must be 640 characters or less.
     * @throws Error if the text exceeds 640 characters.
     */
    constructor(text: string) {
        if (text.length > 640) {
            throw new Error('Button template text must be 640 characters or less.');
        }
        this.text = text;
    }

    /**
     * Adds buttons to the ButtonTemplate. A maximum of 3 buttons can be added.
     * @param buttons - An array of Button objects to add to the template.
     * @returns The current instance of the ButtonTemplate.
     * @throws Error if adding the buttons exceeds the maximum of 3 buttons.
     */
    addButtons(buttons: Button[]): this {
        if (this.buttons && this.buttons.length + buttons.length > 3) {
            throw new Error('Button template can have a maximum of 3 buttons.');
        }
        this.buttons = this.buttons ? [...this.buttons, ...buttons] : buttons;
        return this;
    }

    /**
     * Converts the ButtonTemplate into the JSON format required for sending the template in a messaging platform.
     * @returns The ButtonTemplate in the required JSON format.
     */
    toJSON(): object {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: this.text,
                    buttons: this.buttons.map((button) => button.toJSON()),
                },
            },
        };
    }
}
