// Elements which contains information
const dataBlocks = $(".info");

$("form button").click(function () {
    $("form").addClass("display");
    data();
})

$("#data button").click(function () {
    $("#data").addClass("display");
    $("form").removeClass("display");
})


function data() {
    setTimeout(() => {
        fetch("data.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.hasOwnProperty("success")) {
                    if (data.error.code == 210) {
                        dataBlocks[10].innerText = "Phone Number is not found: Enter Proper Phone Number";
                    }
                } else {
                    dataBlocks[0].innerText = data.valid;
                    dataBlocks[1].innerText = data.number;
                    dataBlocks[2].innerText = data.local_format;
                    dataBlocks[3].innerText = data.international_format;
                    dataBlocks[4].innerText = data.country_prefix;
                    dataBlocks[5].innerText = data.country_code;
                    dataBlocks[6].innerText = data.country_name;
                    dataBlocks[7].innerText = data.location;
                    dataBlocks[8].innerText = data.carrier;
                    dataBlocks[9].innerText = data.line_type;
                    dataBlocks[10].innerText = "No Error";
                }
            })
        $("#data").removeClass("display");

    }, 1700);
}

