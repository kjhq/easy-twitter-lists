let lists = {}

async function captureLists() {
    let headers = new Headers()
    headers.append("authorization", capturedData["authorization"])
    headers.append("x-csrf-token", capturedData["x-csrf-token"])
    headers.append("content-type", "application/json")

    let options = {
        method: "GET",
        headers: headers,
        credentials: "include"
    }

    try {
        let response = await fetch("https://x.com/i/api/graphql/2PPrJxgM_t26Aut95OSoOg/ListOwnerships?variables=%7B%22userId%22%3A%221530198640207093760%22%2C%22isListMemberTargetUserId%22%3A%225797422%22%2C%22count%22%3A20%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22payments_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22responsive_web_profile_redirect_enabled%22%3Afalse%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D", options)
        const result = await response.json()

        if (!result?.data?.user?.result?.timeline?.timeline?.instructions?.[3]?.entries) {
            console.error('Expected data structure not found in API response')
            return
        }

        const listData = result.data.user.result.timeline.timeline.instructions[3].entries

        listData.forEach(element => {
            try {
                const listName = element?.content?.itemContent?.list?.name
                const listID = element?.content?.itemContent?.list?.id_str
                if (listName) {
                    lists[listName] = listID
                }
            } catch (error) {
                console.error('Error processing list entry:', error)
            }
        }
        )

    } catch (error) {
        console.error('Error fetching lists:', error)

    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.lists) {
        return
    }

    sendResponse(lists)
})