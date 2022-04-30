CURRENT_SET = new Set();

// 필요한 값들을 초기화할때 init 사용
(function init() {
    updateSpeed();
    updateElements();
    showDetails();
})();

// 스피드 
$("#speed").on("input", function() {
    updateSpeed();
});

// 요소의 개수
$("#elements").on("input", function() {
    updateElements();
});

// 알고리즘 선택
$("#algorithms").on("change", function() {
    showDetails();
});
// -------------------------------------------------------

// sort 버튼 클릭시 실행하는 함수 (runAlgo())
$("#sort").on("click", function() {
    runAlgo();
});

// stop 버튼 클릭시 실행하는 함수 (stopAnimation())
$("#stop").on("click", function() {
    stopAnimation();
});

// reset 버튼 클릭시 실행하는 함수 (reset())
$("#reset").on("click", function() {
    reset();
});

// restart 버튼 클릭시 실행하는 함수 (restart())
$("#restart").on("click", function() {
    restart();
});

// init speed
function updateSpeed() {
    // SPEED 변수 선언 및 speed의 값을 가져와 초기화
    SPEED = document.getElementById("speed").value;
    // 화면에 보이는 스피드 숫자를 변경
    document.getElementById("speed-count").innerHTML = 101 - SPEED;
    console.log("SPEED : " + SPEED);
}

// init elements
function updateElements() {
    // 컨테이너 내부 요소들을 모두 지움
    clearContainer();
    // TOTAL_ELEMENTS 변수 선언 및 elements 값을 가져와 초기화
    TOTAL_ELEMENTS = document.getElementById("elements").value;
    // 화면에 보이는 elemetns 개수를 TOTAL_ELEMENTS로 수정
    document.getElementById("element-count").innerHTML = TOTAL_ELEMENTS;
    // 랜덤 값 받기 (TOTAL_ELEMENTS에 있는 개수)
    CURRENT_SET = generateRandomSet();
    insertBars(CURRENT_SET);
    console.log("CURRENT_SET : ", CURRENT_SET);
}

// 랜덤 값을 받는
function generateRandomSet() {
    let set = new Set();
    // 총 개수가 
    while (set.size < TOTAL_ELEMENTS) {
        set.add(Math.round(Math.random() * 99) + 1);
    }
    console.log(set);
    return set;
}

// 컨테이너를 지우는 함수
function clearContainer() {
    container.innerHTML = "";
}

function insertBars(set) {
    // 전체영역 / 개수 -> 화면에 표시할 요소들의 가로길이
    const width = CONTAINER_WIDTH / TOTAL_ELEMENTS;

    const arr = Array.from(set);
    for (let i = 0; i < arr.length; ++i) {
        let bar = document.createElement("div");
        bar.setAttribute("class", "bar");
        bar.setAttribute("style", "width: " + width + "px; height: " + arr[i] + "%;");
        bar.innerHTML = arr[i];
        container.appendChild(bar);
    }
}

// 알고리즘 설명 
function showDetails() {
    const algo = $("select#algorithms")
        .children("option:selected")
        .val();
    // 알고리즘 선택시 기존 설명을 지워주는 내용
    $(".algo-container").addClass("hidden");
    // 알고리즘 선택시 선택된 알고리즘의 설명을 가져오는 내용
    $("#" + algo + "-info").removeClass("hidden");
}

function disableInput(what = true) {
    $(".sort").attr("disabled", what);
    $(".slider-input").attr("disabled", what);
    $("select#algorithms").attr("disabled", what);
    $("select#order").attr("disabled", what);

    // Swap colors
    $("#stop")
        .attr("disabled", true)
        .removeClass("green");

    if (what) {
        $(".sort").removeClass("green");
        $("#stop")
            .attr("disabled", false)
            .addClass("green");

        return;
    }

    $(".sort").addClass("green");
}

function reset() {
    stopAnimation();
    updateSpeed();
    updateElements();
}

function restart() {
    stopAnimation();
    clearContainer();
    insertBars(CURRENT_SET);
    disableInput(false);
}

// 실행 버튼 클릭시 동작하는 함수
function runAlgo() {
    // 만약 speed가 0보다 작다면
    if (SPEED <= 0) {
        console.log("Abnormal delay.");
        return;
    }

    // algo 변수 선언 및 정의 (select의 algorithms에서 선택된 알고리즘을 가져옴)
    const algo = $("select#algorithms")
        .children("option:selected")
        .val();
    console.log(algo);

    // order 변수 선언 및 정의 (오름차순 or 내림차순 중 무엇이 선택되었는지를 가져옴)
    const order = $("select#order")
        .children("option:selected")
        .val();
    console.log(order);

    let elements = JSON.parse(JSON.stringify(getElements()));
    const solution = solve(algo, order, elements);

    if (solution) {
        disableInput();
        animate(solution);
    }

    function getElements() {
        let els = Array();

        for (let i = 0; i < bars.length; ++i) {
            els.push(parseInt(bars[i].innerHTML));
        }

        return els;
    }

    function solve(algo, order, input) {
        switch (algo) {
            case "bubble": {
                return Algorithms.bubble(input, order);
            }
            case "comb": {
                return Algorithms.comb(input, order);
            }
            case "heap": {
                return Algorithms.heap(input, order);
            }
            case "insertion": {
                return Algorithms.insertion(input, order);
            }
            case "selection": {
                return Algorithms.selection(input, order);
            }
            case "shell": {
                return Algorithms.shell(input, order);
            }
            default: {
                return false;
            }
        }
    }
    
    console.log("CONTAINER_WIDTH : " + CONTAINER_WIDTH);
    console.log("TOTAL_ELEMENTS : " + TOTAL_ELEMENTS);
    console.log("SPEED : " + SPEED);
    console.log("container : " + container);
    console.log("bars : " + bars);
    console.log("-----------------------------------");
}
