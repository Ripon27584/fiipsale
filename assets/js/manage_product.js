var product_data;
var selected_verient;
var first_click = true;
var selected_color = "",
    selected_size = "",
    selected_storage = "";
$(function() {
    get_product_details();
});

$(document).ready(function() {
    $("#back_btn").on("click", function() {
        history.back();
    });
    startTimer(1111 - 120, $('#offerend-time'));
});

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + "min " + seconds + "sec");

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

async function get_product_details(data) {
    if (data && data != null && data.status == true) {
        var productData = data.data;
        product_data = productData;
        $(".product-title").html(product_data.name);
        manage_verient_selection(productData);
        return false;
    } else if (data && data != null && data.status == false) {
        // showError(data.message);
        $("#home_page_product").html("<h1 class='no-data-found'>" + data.message + "</h1>");
        dataAvailable = false;
        return false;
    } else if (!data) {
        var req_data = {
            op: "get_product_details",
            id: PRIMARY_ID,
        };
        doAPICall(req_data, function(res) {
            get_product_details(res)
        });
    }
    return false;
}

function manage_slider(verient) {

    var html = `<div class="carousel-item active">
        <img class="d-block img-fluid m-auto" style="height: 400px;" src="${verient.img1}">
    </div>`;
    var control_html = `<li data-bs-target="#sliderX" data-bs-slide-to="0" class="active"></li>`;
    if (verient.img2) {
        html += `<div class="carousel-item">
            <img class="d-block img-fluid m-auto" style="height: 400px;" src="${verient.img2}">
        </div>`;
        control_html += `<li data-bs-target="#sliderX" data-bs-slide-to="1"></li>`;
    }
    if (verient.img3) {
        html += `<div class="carousel-item">
            <img class="d-block img-fluid m-auto" style="height: 400px;" src="${verient.img3}">
        </div>`;
        control_html += `<li data-bs-target="#sliderX" data-bs-slide-to="2"></li>`;
    }
    if (verient.img4) {
        html += `<div class="carousel-item">
            <img class="d-block img-fluid m-auto" style="height: 400px;" src="${verient.img4}">
        </div>`;
        control_html += `<li data-bs-target="#sliderX" data-bs-slide-to="3"></li>`;
    }
    if (verient.img5) {
        html += `<div class="carousel-item">
            <img class="d-block img-fluid m-auto" style="height: 400px;" src="${verient.img5}">
        </div>`;
        control_html += `<li data-bs-target="#sliderX" data-bs-slide-to="4"></li>`;
    }
    $(".carousel-inner").html(html);
    $(".carousel-indicators").html(control_html);
}

function manage_verient_selection(verient) {
    var colors = verient.colors;
    var storages = verient.storages.split(',');
    var sizes = verient.sizes.split(',');

    if (verient.colors != "" && colors.length > 0) {
        $(".color-div").show();
        var html = "";
        colors.forEach(function(color, i) {
            var isactive = '';
            if (i == 0) {
                isactive = 'active';
                selected_color = color.color_name;
            }
            html += `<div class="color-item p-2 me-2 ${isactive} ${color.color_name.replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, "_")}" onclick="manage_color_click('${color.color_name}');">
                    <img src="${color.color_img}" alt="img${i}">
                    <span class="color-name">${color.color_name}</span>
                </div>`;
        });
        $(".color-list").html(html);
        manage_color_click(selected_color, true);
    } else {
        $(".color-div").hide();
    }

    if (verient.storages != "" && storages.length > 0) {
        $(".storage-div").show();
        var html = "";
        storages.forEach(function(storage, i) {
            var isactive = '';
            if (i == 0) {
                isactive = 'active';
                selected_storage = storage;
            }
            html += `<div class="storage-item p-2 me-2 ${isactive} ${storage.replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, "_")}" onclick="manage_storage_click('${storage}');">
                    <span class="storage-name">${storage}</span>
                </div>`;
        });
        $(".storage-list").html(html);
        manage_storage_click(selected_storage, true);
    } else {
        $(".storage-div").hide();
    }

    first_click = false;
    if (verient.sizes != "" && sizes.length > 0) {
        $(".size-div").show();
        var html = "";
        sizes.forEach(function(size, i) {
            var isactive = '';
            if (i == 0) {
                isactive = 'active';
                selected_size = size;
            }
            html += `<div class="size-item p-2 me-2 ${isactive} ${size.replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, "_")}" onclick="manage_size_click('${size}');">
                    <span class="size-name">${size}</span>
                </div>`;
        });
        $(".size-list").html(html);
        manage_size_click(selected_size, true);
    } else {
        $(".size-div").hide();
    }
    manage_price();

}

function manage_color_click(color, firstClick = false) {
    $(".color-item").removeClass('active');
    $(".color-item." + color.replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, "_")).addClass('active');
    var selectedData = product_data.verients.filter(verient => verient.color == color);
    manage_slider(selectedData[0]);
    selected_color = color;
    if (!firstClick) {
        manage_price();
    }
}

function manage_storage_click(storage, firstClick = false) {
    $(".storage-item").removeClass('active');
    $(".storage-item." + storage.replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, "_")).addClass('active');
    selected_storage = storage;
    if (!firstClick) {
        manage_price();
    }
}

function manage_size_click(size, firstClick = false) {
    $(".size-item").removeClass('active');
    $(".size-item." + size.replace(/ /g, "_").replace(/\//g, "_").replace(/-/g, "_")).addClass('active');
    selected_size = size;
    if (!firstClick) {
        manage_price();
    }
}

function manage_price() {
    selected_verient = product_data.verients.filter(verient => verient.color == selected_color).filter(verient => verient.storage == selected_storage).filter(verient => verient.size == selected_size);
    selected_verient = selected_verient[0];
    $(".mrp").html(selected_verient.mrp);
    $(".price").html("&#8377;" + selected_verient.selling_price);
    var disc = 100 - ((selected_verient.selling_price * 100) / selected_verient.mrp).toFixed(0);
    $(".discount").html(disc + "% off");
    $(".product-details").html(selected_verient.features);
}

function buyNow(title, price, mrp, image) {
    localStorage.setItem("selected_color", selected_color);
    localStorage.setItem("selected_size", selected_size);
    localStorage.setItem("selected_storage", selected_storage);
    localStorage.setItem("title", title);
    localStorage.setItem("price", price);
    localStorage.setItem("mrp", mrp);
    localStorage.setItem("image", image);

    window.location.href = MAIN_URL + "address";
}
window.onload = function() {
    document.getElementById('autoClickBtn').click();
    document.getElementById('autoClickBtn1').click();
    document.getElementById('autoClickBtn2').click();
}