import type { WebhookEvent } from "@/types";

/**
 * Postback event (user clicked a button)
 * Backward compatible across API v19.0 - v24.0
 * @see https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_postbacks
 */
export interface PostbackEvent extends WebhookEvent {
  postback: {
    /** Button title that was clicked */
    title: string;
    /** Custom payload associated with the button */
    payload: string;
    /** Referral data if user came from an ad or m.me link */
    referral?: {
      ref: string;
      source: string;
      type: string;
      /** Ads context data (v20+, optional)
       * @since v20.0
       */
      ads_context_data?: {
        ad_title?: string;
        photo_url?: string;
        video_url?: string;
        post_id?: string;
      };
    };
  };
}
