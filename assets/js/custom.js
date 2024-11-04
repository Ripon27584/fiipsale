jQuery(function() {
    dayjs.extend(window.dayjs_plugin_relativeTime);
    // get_Settings_data();
});

function showAlert(msg, title) {
    PNotify.removeAll();
    var title = (typeof(title) == 'undefined') ? "Success" : title;
    new PNotify({
        title: title,
        text: msg,
        type: 'info',
        maxOpen: 1,
        animate_speed: 'fast',
        buttons: {
            closer: true,
            sticker: false, //ugly
            labels: {
                close: "Fechar",
                stick: "Manter"
            }
        }
    });
}

function showError(msg, title) {
    // PNotify.removeAll();
    // var title = (typeof (title) == 'undefined') ? "Alert" : title;
    // new PNotify({
    //   title: title,
    //   text: msg,
    //   type: 'error',
    //   maxOpen: 1,
    //   animate_speed: 'fast',
    //   buttons: {
    //     closer: true,
    //     sticker: false, //ugly
    //     labels: { close: "Fechar", stick: "Manter" }
    //   }
    // });
}

function getLoader() {
    return '<div class="scaling-circle">\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
            <div></div>\
          </div>';
}

function doAPICall(obj, callback, is_async) {
    var data = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof(obj[key]) != "string") {
                data[key] = obj[key];
            } else {
                data[key] = obj[key].replace(/''/g, '&apos;').replace(/\'/g, '&apos;').replace(/'/g, "&apos;");
            }
        }
    }
    // data["curr_time"] = moment().format('D-MM-YYYY');
    data["token"] = 'b696f212abf683ad4f33430ab4f61b7e_c4ca4238a0b923820dcc509a6f75849b';

    var settings = {
        type: "POST",
        url: API_SERVICE_URL,
        data: data,
        // token: 'b696f212abf683ad4f33430ab4f61b7e_c4ca4238a0b923820dcc509a6f75849b',
        async: true,
        dataType: 'json',
        "crossDomain": true,
        "headers": {}
    }
    $.ajax(settings).done(function(response) {
        response = response || {};
        responseString = JSON.stringify(response).replace(/''/g, '&apos;').replace(/\'/g, '&apos;').replace(/&apos;/g, "'");
        response = JSON.parse(responseString);
        if (response.error) {
            showError(JSON.stringify(response.error), "ERROR");
        } else {
            callback(response);
        }
    }).fail(function(err) {
        if (err.readyState != 0) {
            showError("System failure: ") + JSON.stringify(err);
            // $("body").html(err.responseText);
        }
    });
}


async function get_Settings_data(data) {
    if (data && data != null && data.status == true) {
        var brandData = data.data;
        var brandHTML = "";
        var brandDetails = '<div class="col-lg-3 col-md-4 d-flex align-items-stretch mt-4" data-aos="fade-up">\
                          <a href="' + MAIN_URL + 'news">\
                            <div class="icon-box">\
                              <div class="icon"><img src="' + MAIN_URL + 'assets/img/newspaper.png" class="cmp-img" /></div>\
                              <h4>EV News</h4>\
                            </div>\
                          </a>\
                        </div>\
                        <div class="col-lg-3 col-md-4 d-flex align-items-stretch mt-4" data-aos="fade-up">\
                          <a href="' + MAIN_URL + 'features">\
                            <div class="icon-box">\
                              <div class="icon"><img src="' + MAIN_URL + 'assets/img/product.png" class="cmp-img" /></div>\
                              <h4>EV Features</h4>\
                            </div>\
                          </a>\
                        </div>';
        brandData.forEach(function(values) {
            if (values.has_data > 0) {
                brandHTML += '<li><a href="' + MAIN_URL + 'cars/' + values.brand_name + '">' + values.brand_name + '</a></li>';
                brandDetails += '<div class="col-lg-3 col-md-4 d-flex align-items-stretch mt-4" data-aos="fade-up">\
                          <a href="' + MAIN_URL + 'cars/' + values.brand_name + '">\
                            <div class="icon-box">\
                              <div class="icon"><img src="' + MAIN_URL + 'assets/img/company/' + values.brand_image + '" class="cmp-img" /></div>\
                              <h4>' + values.brand_name + '</h4>\
                            </div>\
                          </a>\
                        </div>';
            }
        });
        $("#brand_menu_list").html(brandHTML);
        $("#carDetails").html(brandDetails);
        return false;
    } else if (data && data != null && data.status == false) {
        showError(data.message);
        return false;
    } else if (!data) {
        var req_data = {
            operation: "get_brands"
        };
        doAPICall(req_data, get_Settings_data);
    }
    return false;
}