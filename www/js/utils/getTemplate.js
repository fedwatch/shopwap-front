function getTemplate(data, tplFile, DOM) {
    var getData = data;
    var template = Handlebars.compile($("#" + tplFile).html());
    var html = template(getData);
    $("#" + DOM).html(html);
}