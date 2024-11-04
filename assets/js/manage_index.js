var currentPageNumber = 1; // initialization before all functions
var dataAvailable = true;
$(function() {
    get_product_list(null, currentPageNumber);
    $(window).scroll(async function() {
        if (dataAvailable == true) {
            if ($(window).scrollTop() + 105 >= $(document).height() - $(window).height()) {
                currentPageNumber++;
                await get_product_list(null, currentPageNumber);
            }
        }
    });
});

async function get_product_list(data, currentPageNumber) {
    if (data && data != null && data.status == true) {
        var productData = data.data;
        var html = "";
        var i = 1;
        productData.forEach(function(value) {
            if (i % 2 != 0) {
                html += `<tr>`;
            }
            html += `<td class="Cs7ycL TcKeCe">
                        <a href="product-details/${value.md5_id}">
                            <div class="_2enssu">
                                <div style="position:relative;min-height:110px;min-width:110px">
                                    <div class="_3LXIRu">
                                        <div class="_2GaeWJ" style="width:110px;height:110px">
                                            <img class="_2puWtW _3a3qyb" src="${value.img1}">
                                        </div>
                                    </div>
                                </div>
                                <div class="_24B_AU _3SexMn">${value.name}</div>
                                <div class="_24B_AU _1AQnZC">
                                    ${100 - ((value.selling_price * 100) / value.mrp).toFixed(0)}% Off
                                    <span class="mrp">₹${value.mrp}</span>
                                </div>
                                <div class="_24B_AU _1AQnZC">
                                    <b class="selling-price">₹${value.selling_price}</b>
                                    <img src="${MAIN_URL}img/SwOvZ3r.png" width="77px">
                                </div>
                                <div class="_3Nxu4r delivery-txt">Free Delivery in Two Days</div>
                            </div>
                        </a>
                    </td>`;
            if (i % 2 == 0) {
                html += `</tr>`;
            }
            i++;
        });
        if (currentPageNumber == 1) {
            $("#home_page_product").html(html);
        } else {
            $("#home_page_product").append(html);
        }
        $("#home_page_product .scaling-circle").remove();
        return false;
    } else if (data && data != null && data.status == false) {
        // showError(data.message);
        if (currentPageNumber == 1) {
            $("#home_page_product").html("<h1 class='no-data-found'>" + data.message + "</h1>");
        }
        $("#home_page_product .scaling-circle").remove();
        dataAvailable = false;
        return false;
    } else if (!data) {
        $("#home_page_product").append(getLoader());
        var length = 10;
        var start = (currentPageNumber - 1) * length;
        var req_data = {
            op: "get_products",
            page: currentPageNumber,
            start: start,
            length: length
        };
        doAPICall(req_data, function(res) {
            get_product_list(res, currentPageNumber)
        });
    }
    return false;
}