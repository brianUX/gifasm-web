$(function(){Parse.initialize("lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P","D7k2Ttgt6bzQhGhV3BWRAz42EKSKjZvBaevdl7fU");var h=Parse.Object.extend("Gif"),i=Parse.Collection.extend({model:h});AllGifsView=Parse.View.extend({el:$(".content"),template:_.template($("#gallery-gif-template").html()),initialize:function(){_.bindAll(this,"sizer");var a=this;this.query=new i;this.query.fetch({success:function(b){$(".content").empty();a.render(b)},error:function(){new ErrorView({title:"Error 420",message:"You're not high enough."})}})},
render:function(a){var b=this;a.each(function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(b.el).prepend(b.template(a))});new PlayGallery;this.sizer()},sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})}});UserGifsView=Parse.View.extend({el:$(".content"),template:_.template($("#gallery-gif-template").html()),
initialize:function(){_.bindAll(this,"sizer");var a=this,b=this.options.username,c=new Parse.Query("Gif");c.matches("username",b);c.find({success:function(b){$(".content").empty();a.render(b)},error:function(){new ErrorView({title:"Fuck.",message:"Something bad happened. Try again."})}})},render:function(a){var b=this;a.length>0?(a.forEach(function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(b.el).prepend(b.template(a))}),new PlayGallery,this.sizer()):new ErrorView({title:"Fuck.",
message:"We couldn't find any gifs from that user. Try again."})},sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})},reset:function(){this.remove()}});TagGifsView=Parse.View.extend({el:$(".content"),template:_.template($("#gallery-gif-template").html()),initialize:function(){_.bindAll(this,"sizer");
var a=this,b=this.options.tag,c=new Parse.Query("Gif");c.equalTo("tags",b);c.find({success:function(b){$(".content").empty();a.render(b)},error:function(){new ErrorView({title:"Fuck",message:"Crazy error, bro. Try again."})}})},render:function(a){var b=this;a.length>0?(a.forEach(function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(b.el).prepend(b.template(a))}),this.sizer(),new PlayGallery):new ErrorView({title:"Nada",message:"No gifs with that tag, bro. You should add some."})},
sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})}});PlayGallery=Parse.View.extend({el:$(".content"),initialize:function(){_.bindAll(this);this.element=$(".content");var a=this.element.find(".gif-container");a.length<5?a.each(function(){$(this).removeClass("unloaded").addClass("loaded");var a=
$(this).find("img"),c=a.attr("data-src");a.attr("src",c)}):a.slice(0,5).each(function(){$(this).removeClass("unloaded").addClass("loaded");var a=$(this).find("img"),c=a.attr("data-src");a.attr("src",c)});a.eq(0).removeClass("hide")}});SingleGifView=Parse.View.extend({el:$(".content"),template:_.template($("#single-gif-template").html()),initialize:function(){_.bindAll(this,"sizer");var a=this,b=Parse.Object.extend("Gif");this.gif=new Parse.Query(b);this.gif.get(this.options.gif,{success:function(b){a.render(b)},
error:function(){new ErrorView({title:"Sorry",message:"We couldn't find that gif, bro."})}})},render:function(a){a={src:a.attributes.src,id:a.id,tags:a.attributes.tags};$(this.el).html(this.template(a));this.sizer()},sizer:function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b});$(window).resize(function(){var a=window.innerWidth,b=window.innerHeight-64;$(".content .gif-container img").css({width:a,height:b})})}});SearchView=Parse.View.extend({el:$(".search"),
template:_.template($("#search-template").html()),events:{"submit form.search":"search"},initialize:function(){_.bindAll(this,"search");this.render()},render:function(){$(this.el).html(this.template())},search:function(){var a=$("form.search input").val().toLowerCase().replace(/ /g,"-");a&&g.navigate("tag/"+a+"",{trigger:!0});return!1}});NonuserView=Parse.View.extend({el:".user",template:_.template($("#nonuser-template").html()),events:{"click #login":"showLogin","click #signup":"showSignup","submit form.login-form":"logIn",
"submit form.signup-form":"signUp"},initialize:function(){_.bindAll(this,"showLogin","showSignup","logIn","signUp");$("#signup-modal").modal();$("#login-modal").modal();this.render()},render:function(){this.$el.html(this.template())},showLogin:function(){$("#signup-modal").modal("hide");$("#login-modal").modal("show")},showSignup:function(){$("#login-modal").modal("hide");$("#signup-modal").modal("show")},logIn:function(){var a=this,b=this.$("#login-username").val(),c=this.$("#login-password").val();
Parse.User.logIn(b,c,{success:function(b){a.username=b.attributes.username;new UserView({username:a.username});new UploadView;$(".modal").modal("hide");_gaq.push(["_trackEvent","Login","",""])},error:function(){a.$(".login-form .error").html("Invalid username or password. Please try again.").show();a.$(".login-form button").removeAttr("disabled")}});this.$(".login-form button").attr("disabled","disabled");return!1},signUp:function(){return!1}});UserView=Parse.View.extend({el:$(".user"),template:_.template($("#user-template").html()),
events:{"click .log-out":"logOut"},initialize:function(){_.bindAll(this,"logOut");var a=this,b=Parse.User.current().id,c=Parse.Object.extend("User");(new Parse.Query(c)).get(b,{success:function(b){a.render(b.attributes.username,b.attributes.avatar?b.attributes.avatar.url:"img/avatar-default.png")},error:function(){}})},render:function(a,b){$(this.el).html(this.template({username:a,avatar:b}));new UploadView({username:a})},logOut:function(){Parse.User.logOut();_gaq.push(["_trackEvent","Logout","",
""]);new NonuserView}});UploadView=Parse.View.extend({events:{"change #fileselect":"grabFile","submit #fileupload":"uploadGif","submit #urladd":"addUrl"},el:".loggedin .add",template:_.template($("#upload-template").html()),appid:"lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P",restkey:"LfkvpLyFErkF84FPPoZIOzOvSNH10jQI1meGnLEr",initialize:function(){_.bindAll(this,"uploadGif","grabFile","addGif","addUrl","addToUser");this.render()},render:function(){this.$el.append(this.template);$("form input.tags").each(function(){$(this).tagsManager({maxTags:3})});
$("form.add span a").click(function(){$("form.add").toggle();$("form#urladd:visible")&&$("form#urladd .urladdsrc").focus().val("")})},grabFile:function(a){this.file=(a.target.files||a.dataTransfer.files)[0];this.filetype=this.file.type},uploadGif:function(){if(this.filetype==="image/gif"){var a=this;$.ajax({type:"POST",beforeSend:function(b){b.setRequestHeader("X-Parse-Application-Id",a.appid);b.setRequestHeader("X-Parse-REST-API-Key",a.restkey);b.setRequestHeader("Content-Type",a.file.type)},url:"https://api.parse.com/1/files/"+
this.file.name,data:a.file,processData:!1,contentType:!1,success:function(b){a.addGif(b.url)},error:function(){new ErrorView({title:"Awww, Bro",message:"We encountered an error. Try again."})}})}else $("#fileupload .error").html("The name of this site is <em>gifasm</em>. You need to upload a gif.").show();return!1},addGif:function(a){var b=this;if(a.substr(-5).indexOf(".gif")>=0){var b=this,c=Parse.User.current().id,d=this.options.username,f=$("form:visible input[name=hidden-tags]").val().toLowerCase(),
e=new h;e.set("src",a);e.set("username",d);e.set("userid",c);f&&(f=f.split(","),e.set("tags",f));e.save(null,{success:function(a){b.addToUser(a);$(".modal").modal("hide");_gaq.push(["_trackEvent","Added Gif","",""]);g.navigate("#/gif/"+a.id+"",{trigger:!0})},error:function(){new ErrorView({title:"Shit, Error.",message:"We couldn't save that gif for you. Try again."})}})}else $("#urladd .error").html("That doesn't appear to be a gif. Try again, homey.").show()},addUrl:function(){this.addGif(this.$("input.urladdsrc").val());
return!1},addToUser:function(a){var b=Parse.User.current();b.relation("gifs").add(a);b.save(null,{success:function(){},error:function(){}})}});ErrorView=Parse.View.extend({el:$(".content"),template:_.template($("#error-template").html()),initialize:function(){_.bindAll(this);this.render()},render:function(){var a={title:this.options.title,message:this.options.message};$(this.el).html(this.template(a));_gaq.push(["_trackPageview"]);_gaq.push(["_trackEvent","Error","",""])}});AppView=Parse.View.extend({el:".content",
events:{"click div.gallery-gif":"nextgif"},initialize:function(){_.bindAll(this,"nextgif");this.render()},render:function(){Parse.User.current()?new UserView:new NonuserView;new SearchView},nextgif:function(){var a=$("div.gallery-gif:visible"),b=a.index()+1,b=$(".content").find(".gif-container:eq("+b+")");a.addClass("hide");b.length?(b.removeClass("hide"),a=b.attr("id"),g.navigate("/gif/"+a+"",{trigger:!1}),a=$(".content .gif-container.unloaded").eq(0),a.length&&(a.removeClass("unloaded").addClass("loaded"),
a=a.find("img"),b=a.attr("data-src"),a.attr("src",b))):$(".content .gallery-gif").eq(0).removeClass("hide");_gaq.push(["_trackPageview"])}});var g=new (Parse.Router.extend({routes:{"":"home",all:"all","gif/:id":"singleGif","user/:username":"userGallery","tag/:tag":"tagGallery",about:"about",":whatever":"404"},initialize:function(){new AppView},home:function(){new AllGifsView},all:function(){new AllGifsView},singleGif:function(a){new SingleGifView({gif:a})},userGallery:function(a){new UserGifsView({username:a})},
tagGallery:function(a){a=a.replace(/-/g," ");a=a.toLowerCase();new TagGifsView({tag:a})},404:function(){new ErrorView({title:"Well, Fuck",message:"We couldn't find that page."})}}));Parse.history.start();signUp=function(){var a=$(this),b=$("form#signup #signup-username").val(),c=$("form#signup #signup-password").val(),d=new Parse.User;d.set("username",b);d.set("password",c);d.signUp(null,{success:function(a){new UserView({username:a.attributes.username});new UploadView;$(".modal").modal("hide");_gaq.push(["_trackEvent",
"Signup","",""])},error:function(a,b){$("form#signup .error").html(b.message).show();$("form#signup button").removeAttr("disabled")}});a.find(".signup-form button").attr("disabled","disabled");return!1}});
