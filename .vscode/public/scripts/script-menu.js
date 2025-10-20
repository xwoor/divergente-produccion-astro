var $ = jQuery,
    clickLock = false,
    currentIndexes = [],
    movingAnimations = [],
    bottomOffset = 200,
    hash = true;

// Función para obtener la posición central de un elemento
function getCenter(el){
    return el.position().left + el.width()/2;
}

// Función para mover el círculo de manera que quede alineado con el icono
function moveCircle(parent, el){
    var centerDiff = getCenter(el) - getCenter(parent.find('.elementor-widget-icon-box').eq(0)),
        leftOffset = parent.find('.elementor-widget-icon-box').eq(0).offset().left - parent.offset().left;
    
    parent.find('.elementor-widget-divider').css('transform', 'translateX(' + (centerDiff + leftOffset) + 'px)');
}

// Función para activar el ítem del menú al hacer hover
function setActive(menu, index, i){
    menu.addClass('bubbling');
    movingAnimations[i] = true;
    setTimeout(function(){
        if(movingAnimations[i]){
            menu.addClass('bubble');
        }
    }, 50);
    menu.find('.elementor-widget-icon-box').removeClass('active');
    menu.find('.elementor-widget-icon-box').eq(index).addClass('active');
    moveCircle(menu, menu.find('.elementor-widget-icon-box').eq(index));
}

// Función para remover la activación de un ítem si ya no está en hover
function removeActive(menu, i){
    movingAnimations[i] = false;
    menu.removeClass('bubbling bubble');
    menu.find('.elementor-widget-icon-box').removeClass('active');
}

$(document).ready(function(){
    // Iteramos por cada menu de íconos
    $('.icon-menu').each(function(i){
        var $this = $(this);
        currentIndexes.push(-1);
        movingAnimations.push(false);

        // Efecto hover para activar el ítem
        $this.find('.elementor-widget-icon-box').on('mousemove mouseenter', function(){
            setActive($this, $(this).index(), i);
        });

        // Volver al ítem actual cuando se deja de hacer hover
        $this.on('mouseleave', function(){
            if(currentIndexes[i] == -1){
                removeActive($this, i);
            } else {
                setActive($this, currentIndexes[i]);
            }
        });

        // Efecto click para fijar el ítem
        $this.find('.elementor-widget-icon-box').on('click', function(e){
            if(!hash){
                var link = $(this).find('a').attr('href');
                if(link == '' || link[0] == '#'){ return; }
            }
            setActive($this, $(this).index(), i);
            currentIndexes[i] = $(this).index();
            clickLock = true;
            setTimeout(function(){
                clickLock = false;
            }, 1500);
        });
    });
});

// Función para quitar las barras inclinadas (slash) de una URL
function removeSlash(str){
    return str.replace(/^\/+|\/+$/g, '');
}

// Función para obtener el path de una URL
function getPath(url){
    return removeSlash((new URL(url, location.protocol+'//'+location.hostname)).pathname);
}

// Detecta las secciones por las que el usuario está pasando y activa el ítem correspondiente
$(window).on('load scroll resize', function(e){
    var topIds = [];
    var selector = $('section[id], div[id]:not(.icon-menu)'); // Solo toma elementos con id

    selector.each(function(){
        if($(window).scrollTop() + $(window).height() - 350 > $(this).offset().top){
            topIds.push($(this).attr('id'));
        }
    });

    topIds = topIds.filter(element => element !== undefined);

    $('.icon-menu').each(function(i){
        var $this = $(this), menuIndex;

        // Oculta el menú si está cerca del fondo de la ventana
        if($('body').height() > $(window).height() + bottomOffset + 100){
            if($('body').height() < $(window).scrollTop() + $(window).height() + bottomOffset){
                $this.addClass('hidden');
            } else {
                $this.removeClass('hidden');
            }
        }

        // Activación automática del ítem del menú al hacer scroll
        if(!hash || clickLock){
            if(currentIndexes[i] != -1 && e.type == 'resize'){
                moveCircle($this, $this.find('.elementor-widget-icon-box').eq(currentIndexes[i]));
            }
            return;
        }

        topIds.forEach(function(id, index){
            if(menuIndex != undefined && menuIndex > -1) return;
            var menuId = topIds[topIds.length - 1 - index];
            menuIndex = $this.find('a[href="#'+ menuId +'"]').closest('.elementor-widget-icon-box').index();
            currentIndexes[i] = menuIndex;
        });

        if(menuIndex == undefined || menuIndex == -1){
            currentIndexes[i] = -1;
            removeActive($(this), i);
        } else {
            setActive($(this), menuIndex, i);
        }
    });
});

// Solo para menú móvil
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Espera a que se cierre el menú si es animado
      }
    });
  });
  
