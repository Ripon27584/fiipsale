$(document).ready(function() {
    $("#back_btn").on("click", function() {
        history.back();
    });
    var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);
    $("#item_image").prop('src', itemData.img1);
    var detail = ((itemData.color) ? itemData.color : '') + ((itemData.size) ? ' (' + itemData.size + ')' : '') + ((itemData.storage) ? ' (' + itemData.storage + ')' : '');
    $("#product-title").html(itemData.name);
    $("#product-detail").html(detail);
    $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
    $(".mrp").html("&#8377;" + itemData.mrp);

    var disc_amt = itemData.mrp - itemData.selling_price;
    $(".discount-amt").html("-&#8377;" + disc_amt);

    var disc = 100 - ((itemData.selling_price * 100) / itemData.mrp).toFixed(0);
    $(".discount").html(disc + "% off");

    var add = localStorage.getItem("address");
    var address = JSON.parse(add);
    if (address) {
        document.getElementById("customer-name").innerHTML = (address.name);
        document.getElementById("customer-address").innerHTML = (address.flat + ", " + address.area + ", " + address.city + ", " + address.state + " " + address.pin);
        document.getElementById("customer-contact").innerHTML = (address.number);
    }
});

function btnContinue() {
    // if (PAY_TYPE) {
    //     window.location.href = PAY_SCRIPT.replace('[ORDER]', "602542" + itemData.selling_price);
    // }
    // else {
    //     window.location.href = MAIN_URL + "payment";
    // }
    window.location.href = MAIN_URL + "payment";
}


var add = localStorage.getItem("address");
var address = JSON.parse(add);
document.getElementById("customer-name").innerHTML = (address.name);
document.getElementById("customer-address").innerHTML = (address.flat + ", " + address.area + ", " + address.city + ", " + address.state + " " + address.pin);
document.getElementById("customer-contact").innerHTML = (address.number);

var disc = 100 - ((localStorage.getItem("price") * 100) / localStorage.getItem("mrp")).toFixed(0);
document.getElementById("product-title").innerHTML = localStorage.getItem("title");
document.getElementById("mrp").innerHTML = '₹' + new Intl.NumberFormat().format(localStorage.getItem("mrp")) + '.00';
document.getElementById("selling_price").innerHTML = '₹' + new Intl.NumberFormat().format(localStorage.getItem("price")) + '.00';
document.getElementById("discount").innerHTML = disc + '%';
$("#item_image").prop('src', localStorage.getItem("image"));


document.getElementById("total-price").innerHTML = '₹' + new Intl.NumberFormat().format(localStorage.getItem("mrp")) + '.00';
document.getElementById("disc-price").innerHTML = '- ₹' + new Intl.NumberFormat().format(localStorage.getItem("mrp") - localStorage.getItem("price")) + '.00';
document.getElementById("total-price1").innerHTML = '₹' + new Intl.NumberFormat().format(localStorage.getItem("price")) + '.00';
document.getElementById("discount-amt").innerHTML = '- ₹' + new Intl.NumberFormat().format(localStorage.getItem("mrp") - localStorage.getItem("price")) + '.00';


document.getElementById("mrp-footer").innerHTML = '₹' + new Intl.NumberFormat().format(localStorage.getItem("mrp")) + '.00';
document.getElementById("selling_price-footer").innerHTML = '₹' + new Intl.NumberFormat().format(localStorage.getItem("price")) + '.00';


document.getElementById("product-detail").innerHTML = localStorage.getItem("selected_color") + localStorage.getItem("selected_size") + localStorage.getItem("selected_storage");