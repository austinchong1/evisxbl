// Initialize extra fields
window.ec = window.ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

//Javascript code for extracting dynamic value passed from BonusLink
function getSubAffId() {
    const url = new URL(window.location.href);
    const subAffIdValue = url.searchParams.get('sub_aff_id');

    if (subAffIdValue) {
        const matches = subAffIdValue.match(/(.*?)/);
        if (matches && matches.length > 1) {
            return matches[1];  // Return the value inside the {{ }}
        }
    }

    return null;  // Return null if the parameter or placeholder isn't found
}

const subIdValue = getSubAffId();
console.log(subIdValue);  // This will log the value inside {{ }} if it exists

// Add a hidden BonusLink Loyalty Programme section for tracking user's memberships' number
ec.order.extraFields.evisxbl = {
    'title': 'BonusLink Card Number',
    'value': subIdValue,
    'orderDetailsDisplaySection': 'billing_info'
};

Ecwid.OnAPILoaded.add(function() {
    console.log("Ecwid storefront JS API has loaded");
});
