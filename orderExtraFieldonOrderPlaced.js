// Initialize extra fields
window.ec = window.ec || {};
ec.order = ec.order || {};
ec.order.extraFields = ec.order.extraFields || {};

//Javascript code for extracting dynamic value passed from BonusLink
function getSubAffId() {
    const url = new URL(window.location.href);
    const subAffIdValue = url.searchParams.get('sub_aff_id');
    return subAffIdValue || null; //return the value directly or null if it's not present
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
