import type { WebhookEvent } from "@/types";

export interface ReferralsEvent extends WebhookEvent {
  referral: {
    source: string;
    type: string;
    ref?: string;
  };
}
