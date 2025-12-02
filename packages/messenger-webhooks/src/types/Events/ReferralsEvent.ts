import type { WebhookEvent } from "@/types";

/**
 * Referral event (user entered conversation via m.me link or ad)
 * Backward compatible across API v19.0 - v24.0
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals
 */
export interface ReferralsEvent extends WebhookEvent {
  referral: {
    /**
     * Referral parameter from m.me link
     */
    ref: string;
    /**
     * Source type (e.g., "SHORTLINK", "ADS")
     */
    source: string;
    /**
     * Referral type (e.g., "OPEN_THREAD")
     */
    type: string;
    /**
     * Ads context data (v20+, optional)
     *
     * @since v20.0
     */
    ads_context_data?: {
      ad_title?: string;
      photo_url?: string;
      video_url?: string;
      post_id?: string;
    };
  };
}
