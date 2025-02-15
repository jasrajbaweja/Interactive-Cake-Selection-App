// Constants for screen names
const SCREENS = {
    MAIN: "mainScreen",
    CUSTOMER: "customerScreen",
    FLAVOR: "flavorScreen",
    FROSTING: "frostingScreen",
    TOPPING: "toppingScreen",
    RIGHT_RESULT: "resultRightScreen",
    WRONG_RESULT: "resultWrongScreen"
};

// Customer Preferences
const CUSTOMER_PREFERENCES = {
    Alice: { flavor: "Chocolate", frosting: "Vanilla", topping: "Sprinkles" },
    Bob: { flavor: "Vanilla", frosting: "Chocolate", topping: "Berries" },
    Matt: { flavor: "Strawberry", frosting: "Strawberry", topping: "Chocolate Chips" }
};

// Initial screen setup
setScreen(SCREENS.MAIN);

// Navigation function
function navigate(nextScreen) {
    setScreen(nextScreen);
}

// Direction screen navigation (Next)
for (let i = 1; i <= 6; i++) {
    onEvent(`next${i}`, "click", () => navigate(`direction${i + 1}`));
}
onEvent("next6", "click", () => navigate(SCREENS.CUSTOMER));

// Direction screen navigation (Previous)
for (let i = 1; i <= 6; i++) {
    onEvent(`previous${i}`, "click", () => navigate(`direction${i - 1 || 'main'}`));
}
onEvent("previousCustomerButton", "click", () => navigate("direction6"));

// Customer selection navigation
onEvent("nextCustomerButton", "click", () => navigate(SCREENS.FLAVOR));
onEvent("previousFlavorButton", "click", () => navigate(SCREENS.CUSTOMER));

// Flavor selection
let userSelection = {};
onEvent("nextFlavorButton", "click", function () {
    userSelection.flavor = getText("flavorDropdown");
    navigate(SCREENS.FROSTING);
});
onEvent("previousFrostingButton", "click", () => navigate(SCREENS.FLAVOR));

// Frosting selection
onEvent("nextFrostingButton", "click", function () {
    userSelection.frosting = getText("frostingDropdown");
    navigate(SCREENS.TOPPING);
});
onEvent("previousToppingButton", "click", () => navigate(SCREENS.FROSTING));

// Topping selection & result validation
onEvent("nextToppingButton", "click", function () {
    userSelection.topping = getText("toppingDropdown");
    userSelection.customer = getText("customerDropdown");

    const preference = CUSTOMER_PREFERENCES[userSelection.customer];

    if (preference &&
        userSelection.flavor === preference.flavor &&
        userSelection.frosting === preference.frosting &&
        userSelection.topping === preference.topping) {
        navigate(SCREENS.RIGHT_RESULT);
    } else {
        navigate(SCREENS.WRONG_RESULT);
    }
});

// Customer preference display
onEvent("aliceButton", "click", () => setText("customerOutput", "I want a chocolate cake with vanilla frosting and sprinkles."));
onEvent("bobButton", "click", () => setText("customerOutput", "I want a vanilla cake with chocolate frosting and berries."));
onEvent("mattButton", "click", () => setText("customerOutput", "I want a strawberry cake with strawberry frosting and chocolate chips."));

// Play Again
["againRight", "againWrong"].forEach(button => 
    onEvent(button, "click", () => navigate(SCREENS.CUSTOMER))
);