function getHeight(elem) {
    try {
        var h = parseInt(elem.style.height, 10);
    } catch (e) {
        h = 0;
    }
    return h;
}

function shouldSwap(elem1, elem2) {
    try {
        return getHeight(elem1) < getHeight(elem2);
    } catch (e) {
        return false;
    }
}

$.fn.swap = function(elem) {
    elem = elem.jquery ? elem : $(elem);
    return this.each(function() {
        $(document.createTextNode(""))
            .insertBefore(this)
            .before(elem.before(this))
            .remove();
    });
};

function bubbleSort() {
    disableInput();
    var compareDelay = DELAY / 2;
    var outerDelay = DELAY * TOTAL_ELEMENTS;

    for (i = 0; i < TOTAL_ELEMENTS; ++i) {
        (function(i) {
            setTimeout(function() {
                for (j = 0; j < TOTAL_ELEMENTS - i - 1; ++j) {
                    (function(j) {
                        setTimeout(function() {
                            var leftElement = bars[j];
                            var rightElement = bars[j + 1];

                            $(leftElement).addClass("compared");
                            $(rightElement).addClass("compared");

                            if (getHeight(rightElement) > getHeight(leftElement)) {
                                $(rightElement).swap(leftElement);
                            }
                            $(leftElement)
                                .wait(compareDelay)
                                .removeClass("compared");
                            $(rightElement)
                                .wait(compareDelay)
                                .removeClass("compared");
                        }, DELAY * j);
                    })(j);
                }
            }, outerDelay * i);
        })(i);
    }
}

function selectionSort() {
    disableInput();
    var outerDelay = DELAY * TOTAL_ELEMENTS;
    var innerDelay = outerDelay / TOTAL_ELEMENTS;
    for (i = 0; i < TOTAL_ELEMENTS; i++) {
        var currentMaxIndex = i;
        (function(i) {
            setTimeout(function() {
                $(bars[i]).addClass("compared");
                for (j = i + 1; j < TOTAL_ELEMENTS; j++) {
                    (function(j) {
                        setTimeout(function() {
                            $(bars[j]).addClass("compared");

                            if (getHeight(bars[j]) > getHeight(bars[currentMaxIndex])) {
                                currentMaxIndex = j;
                            }

                            $(bars[j])
                                .wait(innerDelay)
                                .removeClass("compared");
                        }, innerDelay);
                    })(j);
                }
                $(bars[i])
                    .wait(outerDelay)
                    .removeClass("compared");
                if (shouldSwap(bars[i - 1], bars[currentMaxIndex])) {
                    $(bars[i - 1]).swap(bars[currentMaxIndex]);
                } else {
                    currentMaxIndex = i;
                }
            }, outerDelay * (i + 1));
        })(i);
    }
}