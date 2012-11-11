(function(){for(var b,e=function(){},a="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),c=a.length,d=window.console=window.console||{};c--;)b=a[c],d[b]||(d[b]=e)})();
(function(b){b(function(){b.support.transition=function(){var b=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},d;for(d in b)if(a.style[d]!==void 0)return b[d]}();return b&&{end:b}}()})})(window.jQuery);
(function(b){var e=function(a,c){this.options=c;this.$element=b(a).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};e.prototype={constructor:e,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var a=this,c=b.Event("show");this.$element.trigger(c);if(!this.isShown&&!c.isDefaultPrevented())b("body").addClass("modal-open"),this.isShown=!0,this.escape(),this.backdrop(function(){var c=
b.support.transition&&a.$element.hasClass("fade");a.$element.parent().length||a.$element.appendTo(document.body);a.$element.show();a.$element.addClass("in").attr("aria-hidden",!1).focus();a.enforceFocus();c?a.$element.one(b.support.transition.end,function(){a.$element.trigger("shown")}):a.$element.trigger("shown")})},hide:function(a){a&&a.preventDefault();a=b.Event("hide");this.$element.trigger(a);if(this.isShown&&!a.isDefaultPrevented())this.isShown=!1,b("body").removeClass("modal-open"),this.escape(),
b(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),b.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var a=this;b(document).on("focusin.modal",function(b){a.$element[0]!==b.target&&!a.$element.has(b.target).length&&a.$element.focus()})},escape:function(){var a=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(b){b.which==27&&a.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},
hideWithTransition:function(){var a=this,c=setTimeout(function(){a.$element.off(b.support.transition.end);a.hideModal()},500);this.$element.one(b.support.transition.end,function(){clearTimeout(c);a.hideModal()})},hideModal:function(){this.$element.hide().trigger("hidden");this.backdrop()},removeBackdrop:function(){this.$backdrop.remove();this.$backdrop=null},backdrop:function(a){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=b.support.transition&&c;this.$backdrop=
b('<div class="modal-backdrop '+c+'" />').appendTo(document.body);this.options.backdrop!="static"&&this.$backdrop.click(b.proxy(this.hide,this));this.$backdrop.addClass("in");d?this.$backdrop.one(b.support.transition.end,a):a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(b.support.transition.end,b.proxy(this.removeBackdrop,this)):this.removeBackdrop()):a&&a()}};b.fn.modal=function(a){return this.each(function(){var c=
b(this),d=c.data("modal"),h=b.extend({},b.fn.modal.defaults,c.data(),typeof a=="object"&&a);d||c.data("modal",d=new e(this,h));typeof a=="string"?d[a]():h.show&&d.show()})};b.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};b.fn.modal.Constructor=e;b(function(){b("body").on("click.modal.data-api",'[data-toggle="modal"]',function(a){var c=b(this),d=c.attr("href"),h=b(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),d=h.data("modal")?"toggle":b.extend({remote:!/#/.test(d)&&d},h.data(),c.data());
a.preventDefault();h.modal(d).one("hide",function(){c.focus()})})})})(window.jQuery);
(function(b){function e(){b(c).each(function(){a(b(this)).removeClass("open")})}function a(a){var c=a.attr("data-target"),d;return c||(c=a.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,"")),d=b(c),d.length||(d=a.parent()),d}var c="[data-toggle=dropdown]",d=function(a){var c=b(a).on("click.dropdown.data-api",this.toggle);b("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};d.prototype={constructor:d,toggle:function(){var c=b(this),d,g;return c.is(".disabled, :disabled")?
void 0:(d=a(c),g=d.hasClass("open"),e(),g||(d.toggleClass("open"),c.focus()),!1)},keydown:function(c){var d,e,i,j;if(/(38|40|27)/.test(c.keyCode)&&(d=b(this),c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled"))){e=a(d);i=e.hasClass("open");if(!i||i&&c.keyCode==27)return d.click();d=b("[role=menu] li:not(.divider) a",e);d.length&&(j=d.index(d.filter(":focus")),c.keyCode==38&&j>0&&j--,c.keyCode==40&&j<d.length-1&&j++,~j||(j=0),d.eq(j).focus())}}};b.fn.dropdown=function(a){return this.each(function(){var c=
b(this),e=c.data("dropdown");e||c.data("dropdown",e=new d(this));typeof a=="string"&&e[a].call(c)})};b.fn.dropdown.Constructor=d;b(function(){b("html").on("click.dropdown.data-api touchstart.dropdown.data-api",e);b("body").on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",c,d.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",c+", [role=menu]",d.prototype.keydown)})})(window.jQuery);
(function(b){var e=function(a){this.element=b(a)};e.prototype={constructor:e,show:function(){var a=this.element,c=a.closest("ul:not(.dropdown-menu)"),d=a.attr("data-target"),h,e,g;d||(d=a.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));a.parent("li").hasClass("active")||(h=c.find(".active a").last()[0],g=b.Event("show",{relatedTarget:h}),a.trigger(g),g.isDefaultPrevented()||(e=b(d),this.activate(a.parent("li"),c),this.activate(e,e.parent(),function(){a.trigger({type:"shown",relatedTarget:h})})))},
activate:function(a,c,d){function h(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");a.addClass("active");g?a.addClass("in"):a.removeClass("fade");a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active");d&&d()}var e=c.find("> .active"),g=d&&b.support.transition&&e.hasClass("fade");g?e.one(b.support.transition.end,h):h();e.removeClass("in")}};b.fn.tab=function(a){return this.each(function(){var c=b(this),d=c.data("tab");d||c.data("tab",d=new e(this));
typeof a=="string"&&d[a]()})};b.fn.tab.Constructor=e;b(function(){b("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(a){a.preventDefault();b(this).tab("show")})})})(window.jQuery);
(function(b){var e=function(a,c){this.init("tooltip",a,c)};e.prototype={constructor:e,init:function(a,c,d){var e,f;this.type=a;this.$element=b(c);this.options=this.getOptions(d);this.enabled=!0;this.options.trigger=="click"?this.$element.on("click."+this.type,this.options.selector,b.proxy(this.toggle,this)):this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,
b.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,b.proxy(this.leave,this)));this.options.selector?this._options=b.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(a){return a=b.extend({},b.fn[this.type].defaults,a,this.$element.data()),a.delay&&typeof a.delay=="number"&&(a.delay={show:a.delay,hide:a.delay}),a},enter:function(a){var c=b(a.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show)return c.show();
clearTimeout(this.timeout);c.hoverState="in";this.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},leave:function(a){var c=b(a.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out";this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var a,c,b,e,f,g,i;if(this.hasContent()&&this.enabled){a=this.tip();
this.setContent();this.options.animation&&a.addClass("fade");g=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;c=/in/.test(g);a.remove().css({top:0,left:0,display:"block"}).appendTo(c?this.$element:document.body);b=this.getPosition(c);e=a[0].offsetWidth;f=a[0].offsetHeight;switch(c?g.split(" ")[1]:g){case "bottom":i={top:b.top+b.height,left:b.left+b.width/2-e/2};break;case "top":i={top:b.top-f,left:b.left+b.width/2-e/2};break;
case "left":i={top:b.top+b.height/2-f/2,left:b.left-e};break;case "right":i={top:b.top+b.height/2-f/2,left:b.left+b.width}}a.css(i).addClass(g).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b);a.removeClass("fade in top bottom left right")},hide:function(){function a(){var a=setTimeout(function(){c.off(b.support.transition.end).remove()},500);c.one(b.support.transition.end,function(){clearTimeout(a);c.remove()})}
var c=this.tip();return c.removeClass("in"),b.support.transition&&this.$tip.hasClass("fade")?a():c.remove(),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(a){return b.extend({},a?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,
b=this.$element,d=this.options;return a=b.attr("data-original-title")||(typeof d.title=="function"?d.title.call(b[0]):d.title),a},tip:function(){return this.$tip=this.$tip||b(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+
this.type).removeData(this.type)}};b.fn.tooltip=function(a){return this.each(function(){var c=b(this),d=c.data("tooltip"),h=typeof a=="object"&&a;d||c.data("tooltip",d=new e(this,h));typeof a=="string"&&d[a]()})};b.fn.tooltip.Constructor=e;b.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!0}})(window.jQuery);
(function(b){var e=function(a,b){this.init("popover",a,b)};e.prototype=b.extend({},b.fn.tooltip.Constructor.prototype,{constructor:e,setContent:function(){var a=this.tip(),b=this.getTitle(),d=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b);a.find(".popover-content > *")[this.options.html?"html":"text"](d);a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,d=this.options;
return a=b.attr("data-content")||(typeof d.content=="function"?d.content.call(b[0]):d.content),a},tip:function(){return this.$tip||(this.$tip=b(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});b.fn.popover=function(a){return this.each(function(){var c=b(this),d=c.data("popover"),h=typeof a=="object"&&a;d||c.data("popover",d=new e(this,h));typeof a=="string"&&d[a]()})};b.fn.popover.Constructor=e;b.fn.popover.defaults=b.extend({},
b.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})})(window.jQuery);
(function(b){var e=function(a,c){this.options=b.extend({},b.fn.affix.defaults,c);this.$window=b(window).on("scroll.affix.data-api",b.proxy(this.checkPosition,this));this.$element=b(a);this.checkPosition()};e.prototype.checkPosition=function(){if(this.$element.is(":visible")){var a=b(document).height(),c=this.$window.scrollTop(),d=this.$element.offset(),e=this.options.offset,f=e.bottom,g=e.top;typeof e!="object"&&(f=g=e);typeof g=="function"&&(g=e.top());typeof f=="function"&&(f=e.bottom());a=this.unpin!=
null&&c+this.unpin<=d.top?!1:f!=null&&d.top+this.$element.height()>=a-f?"bottom":g!=null&&c<=g?"top":!1;if(this.affixed!==a)this.affixed=a,this.unpin=a=="bottom"?d.top-c:null,this.$element.removeClass("affix affix-top affix-bottom").addClass("affix"+(a?"-"+a:""))}};b.fn.affix=function(a){return this.each(function(){var c=b(this),d=c.data("affix"),h=typeof a=="object"&&a;d||c.data("affix",d=new e(this,h));typeof a=="string"&&d[a]()})};b.fn.affix.Constructor=e;b.fn.affix.defaults={offset:0};b(window).on("load",
function(){b('[data-spy="affix"]').each(function(){var a=b(this),c=a.data();c.offset=c.offset||{};c.offsetBottom&&(c.offset.bottom=c.offsetBottom);c.offsetTop&&(c.offset.top=c.offsetTop);a.affix(c)})})})(window.jQuery);
(function(b){var e=function(a){b(a).on("click",'[data-dismiss="alert"]',this.close)};e.prototype.close=function(a){function c(){f.trigger("closed").remove()}var d=b(this),e=d.attr("data-target"),f;e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));f=b(e);a&&a.preventDefault();f.length||(f=d.hasClass("alert")?d:d.parent());f.trigger(a=b.Event("close"));a.isDefaultPrevented()||(f.removeClass("in"),b.support.transition&&f.hasClass("fade")?f.on(b.support.transition.end,c):c())};b.fn.alert=function(a){return this.each(function(){var c=
b(this),d=c.data("alert");d||c.data("alert",d=new e(this));typeof a=="string"&&d[a].call(c)})};b.fn.alert.Constructor=e;b(function(){b("body").on("click.alert.data-api",'[data-dismiss="alert"]',e.prototype.close)})})(window.jQuery);
(function(b){var e=function(a,c){this.$element=b(a);this.options=b.extend({},b.fn.button.defaults,c)};e.prototype.setState=function(a){var b=this.$element,d=b.data(),e=b.is("input")?"val":"html";a+="Text";d.resetText||b.data("resetText",b[e]());b[e](d[a]||this.options[a]);setTimeout(function(){a=="loadingText"?b.addClass("disabled").attr("disabled","disabled"):b.removeClass("disabled").removeAttr("disabled")},0)};e.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons-radio"]');
a&&a.find(".active").removeClass("active");this.$element.toggleClass("active")};b.fn.button=function(a){return this.each(function(){var c=b(this),d=c.data("button"),h=typeof a=="object"&&a;d||c.data("button",d=new e(this,h));a=="toggle"?d.toggle():a&&d.setState(a)})};b.fn.button.defaults={loadingText:"loading..."};b.fn.button.Constructor=e;b(function(){b("body").on("click.button.data-api","[data-toggle^=button]",function(a){a=b(a.target);a.hasClass("btn")||(a=a.closest(".btn"));a.button("toggle")})})})(window.jQuery);
(function(b){var e=function(a,c){this.$element=b(a);this.options=b.extend({},b.fn.typeahead.defaults,c);this.matcher=this.options.matcher||this.matcher;this.sorter=this.options.sorter||this.sorter;this.highlighter=this.options.highlighter||this.highlighter;this.updater=this.options.updater||this.updater;this.$menu=b(this.options.menu).appendTo("body");this.source=this.options.source;this.shown=!1;this.listen()};e.prototype={constructor:e,select:function(){return this.$element.val(this.updater(this.$menu.find(".active").attr("data-value"))).change(),
this.hide()},updater:function(a){return a},show:function(){var a=b.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:a.top+a.height,left:a.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(){var a;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(a=b.isFunction(this.source)?this.source(this.query,b.proxy(this.process,
this)):this.source,a?this.process(a):this)},process:function(a){var c=this;return a=b.grep(a,function(a){return c.matcher(a)}),a=this.sorter(a),a.length?this.render(a.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){for(var b=[],d=[],e=[],f;f=a.shift();)f.toLowerCase().indexOf(this.query.toLowerCase())?~f.indexOf(this.query)?d.push(f):e.push(f):b.push(f);return b.concat(d,e)},highlighter:function(a){var b=
this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(a){var c=this;return a=b(a).map(function(a,e){return a=b(c.options.item).attr("data-value",e),a.find("a").html(c.highlighter(e)),a[0]}),a.first().addClass("active"),this.$menu.html(a),this},next:function(){var a=this.$menu.find(".active").removeClass("active").next();a.length||(a=b(this.$menu.find("li")[0]));a.addClass("active")},prev:function(){var a=
this.$menu.find(".active").removeClass("active").prev();a.length||(a=this.$menu.find("li").last());a.addClass("active")},listen:function(){this.$element.on("blur",b.proxy(this.blur,this)).on("keypress",b.proxy(this.keypress,this)).on("keyup",b.proxy(this.keyup,this));(b.browser.chrome||b.browser.webkit||b.browser.msie)&&this.$element.on("keydown",b.proxy(this.keydown,this));this.$menu.on("click",b.proxy(this.click,this)).on("mouseenter","li",b.proxy(this.mouseenter,this))},move:function(a){if(this.shown){switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();
break;case 38:a.preventDefault();this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()}},keydown:function(a){this.suppressKeyPressRepeat=!~b.inArray(a.keyCode,[40,38,9,13,27]);this.move(a)},keypress:function(a){this.suppressKeyPressRepeat||this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation();a.preventDefault()},
blur:function(){var a=this;setTimeout(function(){a.hide()},150)},click:function(a){a.stopPropagation();a.preventDefault();this.select()},mouseenter:function(a){this.$menu.find(".active").removeClass("active");b(a.currentTarget).addClass("active")}};b.fn.typeahead=function(a){return this.each(function(){var c=b(this),d=c.data("typeahead"),h=typeof a=="object"&&a;d||c.data("typeahead",d=new e(this,h));typeof a=="string"&&d[a]()})};b.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',
item:'<li><a href="#"></a></li>',minLength:1};b.fn.typeahead.Constructor=e;b(function(){b("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(a){var c=b(this);c.data("typeahead")||(a.preventDefault(),c.typeahead(c.data()))})})})(window.jQuery);
(function(b){if(typeof console==="undefined"||typeof console.log==="undefined")console={log:function(){}};b.fn.tagsManager=function(e){var a={prefilled:null,CapitalizeFirstLetter:!1,preventSubmitOnEnter:!0,typeahead:!1,typeaheadAjaxSource:null,typeaheadAjaxPolling:!1,typeaheadSource:null,AjaxPush:null,delimeters:[44,188,13],backspace:[8],maxTags:0,hiddenTagListName:null,deleteTagsOnBackspace:!0,tagsContainer:null,tagCloseIcon:"x"};b.extend(a,e);if(a.hiddenTagListName===null)a.hiddenTagListName="hidden-"+
this.attr("name");var c=this,d=c.attr("name"),h=0,f="",g=a.delimeters,i=a.backspace,j=function(){if(c.typeahead)a.typeaheadSource!=null&&b.isFunction(a.typeaheadSource)?c.typeahead({source:a.typeaheadSource}):a.typeaheadSource!=null?(c.typeahead(),c.data("active",!0),c.data("typeahead").source=a.typeaheadSource,c.data("active",!1)):a.typeaheadAjaxSource!=null?a.typeaheadAjaxPolling?a.typeaheadAjaxPolling&&c.typeahead({source:o}):(c.typeahead(),b.getJSON(a.typeaheadAjaxSource,function(a){var d=[];
if(a!=void 0&&a.tags!=void 0)d.length=0,b.each(a.tags,function(a,b){d.push(b.tag);c.data("active",!0);c.data("typeahead").source=d;c.data("active",!1)})})):a.typeaheadDelegate&&c.typeahead(a.typeaheadDelegate)},o=function(c,d){b.getJSON(a.typeaheadAjaxSource,function(a){var c=[];if(a!=void 0&&a.tags!=void 0)c.length=0,b.each(a.tags,function(a,b){c.push(b.tag)}),d(c)})},m=function(a){for(var a=b.trim(a),c=a.length,d=0,e=c-1;e>=0;e--){if(-1==b.inArray(a.charCodeAt(e),g))break;d++}a=a.substring(0,c-
d);c=a.length;for(e=d=0;e<c;e++){if(-1==b.inArray(a.charCodeAt(e),g))break;d++}return a=a.substring(d,c)},n=function(){var a=c.data("tlis"),d=c.data("lhiddenTagList");d!=void 0&&b(d).val(a.join(",")).change()},l=function(e){if(e&&!(e.length<=0)&&(a.CapitalizeFirstLetter&&e.length>1&&(e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()),!(a.validator!==void 0&&a.validator(e)!==!0))){var k=c.data("tlis"),f=c.data("tlid");if(!(a.maxTags>0&&k.length>=a.maxTags)){var g=!1,i=b.inArray(e,k);-1!=i&&(g=!0);
g?b("#"+d+"_"+f[i]).stop().animate({backgroundColor:a.blinkBGColor_1},100).animate({backgroundColor:a.blinkBGColor_2},100).animate({backgroundColor:a.blinkBGColor_1},100).animate({backgroundColor:a.blinkBGColor_2},100).animate({backgroundColor:a.blinkBGColor_1},100).animate({backgroundColor:a.blinkBGColor_2},100):(g=h++,k.push(e),f.push(g),a.AjaxPush!=null&&b.post(a.AjaxPush,{tag:e}),f=d+"_Remover_"+g,i="",i+='<span class="myTag" id="'+(d+"_"+g)+'"><span>'+e+'\u00a0\u00a0</span><a href="#" class="myTagRemover" id="'+
f+'" TagIdToRemove="'+g+'" title="Remove">'+a.tagCloseIcon+"</a></span>",a.tagsContainer!=null?b(a.tagsContainer).append(i):c.before(i),b("#"+f).on("click",c,function(e){e.preventDefault();var e=parseInt(b(this).attr("TagIdToRemove")),k=c.data("tlis"),f=c.data("tlid"),g=b.inArray(e,f);-1!=g&&(b("#"+d+"_"+e).remove(),k.splice(g,1),f.splice(g,1),n());a.maxTags>0&&k.length<a.maxTags&&c.show()}),n(),a.maxTags>0&&k.length>=a.maxTags&&c.hide());c.val("")}}};return this.each(function(){c.data("tlis",[]);
c.data("tlid",[]);var e="";e+="<input name='"+a.hiddenTagListName+"' type='hidden' value=''/>";c.after(e);c.data("lhiddenTagList",c.siblings("input[name='"+a.hiddenTagListName+"']")[0]);a.typeahead&&j();c.on("focus",function(){b(this).popover&&b(this).popover("hide")});c.on("keypress",function(c){b(this).popover&&b(this).popover("hide");if(a.preventSubmitOnEnter&&c.which==13)c.cancelBubble=!0,c.returnValue=!1,c.stopPropagation(),c.preventDefault()});c.on("keyup",c,function(a){if(-1!=b.inArray(a.which,
g)){var c=b(this).val(),c=m(c);l(c,a.data)}});if(a.deleteTagsOnBackspace)c.on("keydown",c,function(a){if(-1!=b.inArray(a.which,i)&&b(this).val().length<=0){a.preventDefault();var a=c.data("tlis"),e=c.data("tlid");e.length>0&&(e=e.pop(),a.pop(),b("#"+d+"_"+e).remove(),n())}});c.change(function(a){a.cancelBubble=!0;a.returnValue=!1;a.stopPropagation();a.preventDefault();a=navigator.userAgent.indexOf("Chrome")>-1;navigator.userAgent.indexOf("MSIE");navigator.userAgent.indexOf("Firefox");var d=navigator.userAgent.indexOf("Safari")>
-1;!a&&!d&&b(this).focus();b(".typeahead:visible")[0]!=void 0?(a=b(".typeahead .active").attr("data-value"),a=m(a),f==c.val()&&f==a?(f="",c.val(f)):(l(a),f=a)):(a=b(this).val(),a=m(a),l(a))});c.on("blur",function(c){c.cancelBubble=!0;c.returnValue=!1;c.stopPropagation();c.preventDefault();c=!0;a.typeahead&&(c=b(".typeahead:visible")[0]!=void 0?!1:!0);c&&(c=b(this).val(),c=m(c),l(c))});if(a.prefilled!=null)typeof a.prefilled=="object"?(e=a.prefilled,b.each(e,function(a,b){l(b,c)})):typeof a.prefilled==
"string"&&(e=a.prefilled.split(","),b.each(e,function(a,b){l(b,c)}))})}})(jQuery);
$(function(){Parse.initialize("lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P","D7k2Ttgt6bzQhGhV3BWRAz42EKSKjZvBaevdl7fU");var g=Parse.Object.extend("Gif"),h=Parse.Collection.extend({model:g});AllGifsView=Parse.View.extend({el:$(".content"),template:_.template($("#gallery-gif-template").html()),initialize:function(){_.bindAll(this,"sizer");var a=this;this.query=new h;this.query.fetch({success:function(b){$(".content").empty();a.render(b)},error:function(){new ErrorView({title:"Error 420",message:"You're not high enough."})}})},
render:function(a){var b=this;a.each(function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(b.el).prepend(b.template(a))});new PlayGallery;this.sizer()},sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})}});UserGifsView=Parse.View.extend({el:$(".content"),template:_.template($("#gallery-gif-template").html()),
initialize:function(){_.bindAll(this,"sizer");var a=this,b=this.options.username,c=new Parse.Query("Gif");c.matches("username",b);c.find({success:function(b){$(".content").empty();a.render(b)},error:function(){new ErrorView({title:"Fuck.",message:"Something bad happened. Try again."})}})},render:function(a){var b=this;a.length>0?(a.forEach(function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(b.el).prepend(b.template(a))}),new PlayGallery,this.sizer()):new ErrorView({title:"Fuck.",
message:"We couldn't find any gifs from that user. Try again."})},sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})},reset:function(){this.remove()}});TagGifsView=Parse.View.extend({el:$(".content"),template:_.template($("#gallery-gif-template").html()),initialize:function(){_.bindAll(this,"sizer");
var a=this,b=this.options.tag,c=new Parse.Query("Gif");c.equalTo("tags",b);c.find({success:function(b){$(".content").empty();a.render(b)},error:function(){new ErrorView({title:"Fuck",message:"Crazy error, bro. Try again."})}})},render:function(a){var b=this;a.length>0?(a.forEach(function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(b.el).prepend(b.template(a))}),this.sizer(),new PlayGallery):new ErrorView({title:"Nada",message:"No gifs with that tag, bro. You should add some."})},
sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})}});PlayGallery=Parse.View.extend({el:$(".content"),initialize:function(){_.bindAll(this);this.element=$(".content");var a=this.element.find(".gif-container");a.length<5?a.each(function(){$(this).removeClass("unloaded").addClass("loaded");var a=
$(this).find("img"),c=a.attr("data-src");a.attr("src",c)}):a.slice(0,5).each(function(){$(this).removeClass("unloaded").addClass("loaded");var a=$(this).find("img"),c=a.attr("data-src");a.attr("src",c)});a.eq(0).removeClass("hide")}});SingleGifView=Parse.View.extend({el:$(".content"),template:_.template($("#single-gif-template").html()),initialize:function(){_.bindAll(this,"sizer");var a=this,b=Parse.Object.extend("Gif");this.gif=new Parse.Query(b);this.gif.get(this.options.gif,{success:function(b){a.render(b)},
error:function(){new ErrorView({title:"Sorry",message:"We couldn't find that gif, bro."})}})},render:function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(this.el).html(this.template(a));this.sizer()},sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})}});SearchView=Parse.View.extend({el:$(".search"),
template:_.template($("#search-template").html()),events:{"submit form.search":"search"},initialize:function(){_.bindAll(this,"search");this.render()},render:function(){$(this.el).html(this.template())},search:function(){var a=$("form.search input").val();a&&i.navigate("tag/"+a+"",{trigger:!0});return!1}});NonuserView=Parse.View.extend({el:".user",template:_.template($("#nonuser-template").html()),events:{"click #login":"showLogin","click #signup":"showSignup","submit form.login-form":"logIn","submit form.signup-form":"signUp"},
initialize:function(){_.bindAll(this,"showLogin","showSignup","logIn","signUp");$("#signup-modal").modal();$("#login-modal").modal();this.render()},render:function(){this.$el.html(this.template())},showLogin:function(){$("#signup-modal").modal("hide");$("#login-modal").modal("show");$("#login-username").focus()},showSignup:function(){$("#login-modal").modal("hide");$("#signup-modal").modal("show");$("#signup-username").focus()},logIn:function(){var a=this,b=this.$("#login-username").val(),c=this.$("#login-password").val();
Parse.User.logIn(b,c,{success:function(b){a.username=b.attributes.username;new UserView({username:a.username});new UploadView;$(".modal").modal("hide");_gaq.push(["_trackEvent","Login","",""])},error:function(){a.$(".login-form .error").html("Invalid username or password. Please try again.").show();a.$(".login-form button").removeAttr("disabled")}});this.$(".login-form button").attr("disabled","disabled");return!1},signUp:function(){return!1}});UserView=Parse.View.extend({el:$(".user"),template:_.template($("#user-template").html()),
events:{"click .log-out":"logOut"},initialize:function(){_.bindAll(this,"logOut");var a=this,b=Parse.User.current().id,c=Parse.Object.extend("User");(new Parse.Query(c)).get(b,{success:function(b){a.render(b.attributes.username,b.attributes.avatar?b.attributes.avatar.url:"img/avatar-default.png")},error:function(){}})},render:function(a,b){$(this.el).html(this.template({username:a,avatar:b}));new UploadView({username:a})},logOut:function(){Parse.User.logOut();_gaq.push(["_trackEvent","Logout","",
""]);new NonuserView}});UploadView=Parse.View.extend({events:{"change #fileselect":"grabFile","submit #fileupload":"uploadGif","submit #urladd":"addUrl"},el:".loggedin .add",template:_.template($("#upload-template").html()),appid:"lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P",restkey:"LfkvpLyFErkF84FPPoZIOzOvSNH10jQI1meGnLEr",initialize:function(){_.bindAll(this,"uploadGif","grabFile","addGif","addUrl","addToUser");this.render()},render:function(){this.$el.append(this.template);$("form input.tags").each(function(){$(this).tagsManager({maxTags:3})});
$("form.add span a").click(function(){$("form.add").toggle();$("form#urladd:visible")&&$("form#urladd .urladdsrc").focus().val("")})},grabFile:function(a){this.file=(a.target.files||a.dataTransfer.files)[0];this.filetype=this.file.type},uploadGif:function(){if(this.filetype==="image/gif"){var a=this;$.ajax({type:"POST",beforeSend:function(b){b.setRequestHeader("X-Parse-Application-Id",a.appid);b.setRequestHeader("X-Parse-REST-API-Key",a.restkey);b.setRequestHeader("Content-Type",a.file.type)},url:"https://api.parse.com/1/files/"+
this.file.name,data:a.file,processData:!1,contentType:!1,success:function(b){a.addGif(b.url)},error:function(){new ErrorView({title:"Awww, Bro",message:"We encountered an error. Try again."})}})}else $("#fileupload .error").html("The name of this site is <em>gifasm</em>. You need to upload a gif.").show();return!1},addGif:function(a){var b=this;if(a.substr(-5).indexOf(".gif")>=0){var b=this,c=Parse.User.current().id,d=this.options.username,f=$("form:visible input[name=hidden-tags]").val().toLowerCase(),
e=new g;e.set("src",a);e.set("username",d);e.set("userid",c);f&&(f=f.split(","),e.set("tags",f));e.save(null,{success:function(a){b.addToUser(a);$(".modal").modal("hide");_gaq.push(["_trackEvent","Added Gif","",""]);b.remove();window.location="/#/gif/"+a.id+""},error:function(){new ErrorView({title:"Shit, Error.",message:"We couldn't save that gif for you. Try again."})}})}else $("#urladd .error").html("That doesn't appear to be a gif. Try again, homey.").show()},addUrl:function(){this.addGif(this.$("input.urladdsrc").val());
return!1},addToUser:function(a){var b=Parse.User.current();b.relation("gifs").add(a);b.save(null,{success:function(){},error:function(){}})}});ErrorView=Parse.View.extend({el:$(".content"),template:_.template($("#error-template").html()),initialize:function(){_.bindAll(this);this.render()},render:function(){var a={title:this.options.title,message:this.options.message};$(this.el).html(this.template(a));_gaq.push(["_trackPageview"]);_gaq.push(["_trackEvent","Error","",""])}});AppView=Parse.View.extend({el:".content",
events:{"click div.gallery-gif":"nextgif"},initialize:function(){_.bindAll(this,"nextgif");this.render()},render:function(){Parse.User.current()?new UserView:new NonuserView;new SearchView},nextgif:function(){var a=$("div.gallery-gif:visible"),b=a.index()+1,b=$(".content").find(".gif-container:eq("+b+")");a.addClass("hide");b.length?(b.removeClass("hide"),b.attr("id"),a=$(".content .gif-container.unloaded").eq(0),a.length&&(a.removeClass("unloaded").addClass("loaded"),a=a.find("img"),b=a.attr("data-src"),
a.attr("src",b))):$(".content .gallery-gif").eq(0).removeClass("hide");_gaq.push(["_trackPageview"])}});var i=new (Parse.Router.extend({routes:{"":"home",all:"all","gif/:id":"singleGif","user/:username":"userGallery","tag/:tag":"tagGallery",about:"about",":whatever":"404"},initialize:function(){new AppView},home:function(){new AllGifsView},all:function(){new AllGifsView},singleGif:function(a){new SingleGifView({gif:a})},userGallery:function(a){new UserGifsView({username:a})},tagGallery:function(a){a=
a.replace(/-/g," ");a=a.toLowerCase();new TagGifsView({tag:a})},404:function(){new ErrorView({title:"Well, Fuck",message:"We couldn't find that page."})}}));Parse.history.start();signUp=function(){var a=$(this),b=$("form#signup #signup-username").val(),c=$("form#signup #signup-password").val(),d=new Parse.User;d.set("username",b);d.set("password",c);d.signUp(null,{success:function(a){new UserView({username:a.attributes.username});new UploadView;$(".modal").modal("hide");_gaq.push(["_trackEvent","Signup",
"",""])},error:function(a,b){$("form#signup .error").html(b.message).show();$("form#signup button").removeAttr("disabled")}});a.find(".signup-form button").attr("disabled","disabled");return!1}});
