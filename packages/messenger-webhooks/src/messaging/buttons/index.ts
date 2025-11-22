import type { CallButton } from "./CallButton";
import type { PostbackButton } from "./PostbackButton";
import type { URLButton } from "./URLButton";

/**
 * Defines the types of buttons that can be used in a template.
 */
export type ButtonType = "web_url" | "postback" | "phone_number";
export type Button = URLButton | PostbackButton | CallButton;

export * from "./CallButton";
export * from "./PostbackButton";
export * from "./URLButton";
