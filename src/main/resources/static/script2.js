function popup_position()
{
    $popup = $('.popup');
    $done = $('.done');
    $overlay = $('.overlay');

    setTimeout(function()
    {
        if($popup.outerHeight(true)> $(window).height()){
            $popup.css('top','0');
        }else{
            $popup.animate({top: (Math.ceil($(window).outerHeight(true)/2) - Math.ceil($popup.outerHeight(true)/2)) + 'px'},300);
            $done.animate({top: (Math.ceil($(window).outerHeight(true)/2) - Math.ceil($done.outerHeight(true)/2)) + 'px'},300);
        }
    }, 300);
}

function plural(n, f)
{
    if (undefined == f[2])
        f[2] = f[1];
    n = Math.abs(n) % 100;
    n1 = n % 10;
    if(n > 10 && n < 20)
        return f[2];
    else if(n1> 1 && n1 < 5)
        return f[1];
    else if(n1==1)
        return f[0];
    return f[2];
}

$(document).ready(function() {

    $( "#tabs" ).tabs({hide: 'fade', show: 'fade'});

    $('input[type=file]').styler();

    $('.mask').mask('+7 (000) 000-00-00');

    $('.fancy').fancybox({
        padding:0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    if('undefined' != $.bxSlider)
	{
        $('.content_slider .items').bxSlider({
            responsive: false,
            pager:false,
            minSlides:3,
            maxSlides:4,
            slideWidth: 206, //170
            moveSlides:1
        });
    }

    //кривой "слайдер" %)
    var second_id;
    second_id = $('.slider .layout .item .act').attr('id');
    $first = $('.slider .first-img');
    $second = $('.slider .second-img');
    $source = $('.slider .item .act .bg');
    $first.css('background','url('+$source.attr('src')+') center');
    $second.css('background','url('+$source.attr('src')+') center');
    $first.fadeIn('slow');
    $second.hide();

    $('.toggle').on('click',function(){
        $('.slider .item').removeClass('act');
        $(this).parent().addClass('act');
        $second.css('background','url('+$('#'+second_id+' .bg').attr('src')+') center');
        $second.show();
        $first.css('background','url('+$(this).parent().find('.bg').attr('src')+') center');
        $second.fadeOut('slow');
        second_id = $('.slider .layout .item .act').attr('id');
        return false;
    });

    $('.btn_bid').click(function()
    {
        var $popup = $('.popup');
        var $pform = $popup.find('form');
        $pform.find('input[name="REQUEST_TITLE"]').remove();
        var request_title = 'Заявка на услуги';
        if($(this).hasClass('contract_assembly'))
            request_title = 'Заявка на контрактную сборку';
        else if($(this).hasClass('circuit_packs'))
            request_title = 'Заявка на производство печатных плат';
        else if($(this).hasClass('components'))
            request_title = 'Заявка на поставку компонентов';
        $pform.append('<input type="text" name="REQUEST_TITLE" value="'+request_title+'" hidden>');
        $popup.find('h3').text(request_title);
        $('.overlay, .popup').fadeIn();
        popup_position();
        return false;
    });

    var countfile = 0;

    $('.popup .close').click(function(){
        var $rq_form = $(this).parent().find('form');
        var $file_downloaded = $rq_form.find('.file_loaded');
        var $file_count = $rq_form.find('.file_count');
        $rq_form.find('.form_errorbox').html('');
        $rq_form.find('div.jq-file.changed').remove();
        countfile = 0;
        $rq_form.get(0).reset();
        $file_downloaded.text(plural(countfile, ['Загружен','Загружено']));
        $rq_form.find('.filecount').text(countfile);
        $file_count.text(plural(countfile, ['файл','файла','файлов']));
        $('.overlay, .popup').fadeOut();
        return false;
    });
    $('.done .close, .done .btn').click(function(){
        $('.overlay, .done').fadeOut();
        return false;
    });
    $(window).resize(popup_position);
    popup_position();

    function validateSize(fileInput, maxSize)
    {
        var fileObj, size;
        if ( typeof ActiveXObject == "function" )
        { // IE
            fileObj = (new ActiveXObject("Scripting.FileSystemObject")).getFile(fileInput.value);
        }
        else
        {
            fileObj = fileInput.files[0];
        }

        size = fileObj.size; // Size returned in bytes.
        if(size > maxSize)
        {
            return false;
        }
        return true;
    }

    $('.popup form, .production_process .item .first form, .order form, .order_components form').on('change','input[type=file]',function(){
        var intMaxFileSize = 20*1024*1024;
        var $rq_form = $(this).parents('form');
        var $errorBox = $rq_form.find('.form_errorbox');
        $(this).parent().parent().prepend('<input type="file" name="file[]" placeholder="Прикрепите файл" data-placeholder="Прикрепите файл">');
        $(this).parent().hide();
        $('input[type=file]').styler();
        if(!validateSize(this, intMaxFileSize))
        {
            //Очищаем поле ввода файла
            $(this).parents('form').find('div.jq-file.changed')[0].remove();
            $errorBox.html('Превышен максимальный размер файла в ' + (intMaxFileSize / 1024 / 1024) + 'МБ');
        }
        else
        {
            $errorBox.html('');
        }
        $tooltype = $(this).parent().parent().parent().find('.tooltype .filecount');
        countfile = parseInt($tooltype.text()) + 1;
        $tooltype.text(countfile);
        $tooltype.parent().find('.file_loaded').text(plural(countfile, ['Загружен','Загружено']));
        $tooltype.parent().find('.file_count').text(plural(countfile, ['файл','файла','файлов']));
    });

    $rmenu = $('.right_block');
    if($rmenu.length)
    {
        $top = $rmenu.offset().top - 30;
        $(window).scroll(position_rightmenu).resize(position_rightmenu);
    }
    function position_rightmenu(){
        if($(window).scrollTop() > $top){
            if(!$rmenu.hasClass('top')){
                $rmenu.addClass('top');
            }
        }else{
            $rmenu.removeClass('top');
        }
    }

    if(undefined != self.DG)
    {
        DG.then(function () {
            var map,
                myIcon;

            map = DG.map('map', {
                center: [55.025347, 82.945576],
                zoom: 17,
                fullscreenControl: false,
                zoomControl: false
            });

            myIcon = DG.icon({
                iconUrl: 'marker.png'/*tpa=http://gcmatrix.com/img/marker.png*/,
                iconSize: [57, 66],
                iconAnchor: [0, 66]
            });
            DG.marker([55.02475, 82.9457], {
                icon: myIcon
            }).addTo(map);
        });
    }

    function footer_bottom(){
        $('.content').css('min-height','auto');
        if($(window).outerHeight(true) > $('.wrapper').outerHeight(true)){
            $('.content').css('min-height',$(window).outerHeight(true) - $('.header').outerHeight(true) - $('.footer').outerHeight(true) + 'px');
        }
    }

    footer_bottom();
    $(window).resize(function(){
        footer_bottom();
    });

});