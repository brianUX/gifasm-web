$(function(){
	
	Parse.initialize("lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P", "D7k2Ttgt6bzQhGhV3BWRAz42EKSKjZvBaevdl7fU");
	
	//models
	var Gif = Parse.Object.extend("Gif");
	
	var Gifs = Parse.Collection.extend({
		model: Gif
	});
	
	//views
	
		//all gifs view
		AllGifsView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gallery-gif-template').html()),
			initialize: function(){
				_.bindAll(this, "sizer");
				var self = this;
				this.query = new Gifs();
				this.query.fetch({
					success: function(gifs) {
						$('.content').empty();
						self.render(gifs);
					},
					error: function(collection, error) {
					    new ErrorView({
							title: "Error 420",
							message: "You're not high enough."
						});
					}
				});
			},
			render: function(gifs){
				var self = this;
				gifs.each(function(thisgif) {
					var data = {
						src: thisgif.attributes.src,
						id: thisgif.id,
						tags: thisgif.attributes.tags 
					};
					$(self.el).prepend(self.template(data));
				});
				new PlayGallery();
				this.sizer();
			},
			sizer: function() {
				var width = window.innerWidth;
				var height = window.innerHeight - 64;
				var gifs = $(".content .gif-container img");
				gifs.css({
					"width": width,
					"height": height
				});
				$(window).resize(function(){
					var width = window.innerWidth;
					var height = window.innerHeight - 64;
					var gifs = $(".content .gif-container img");
					gifs.css({
						"width": width,
						"height": height
					});
				});
			}
		});
		
		//user gifs view
		UserGifsView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gallery-gif-template').html()),
			initialize: function(){
				_.bindAll(this, "sizer");
				var self = this;
				var username = this.options.username;
				//grab all gifs by user
				var gifs = new Parse.Query("Gif");
				gifs.matches("username", username);
				gifs.find({
					success: function(gifs) {
						$('.content').empty();
						self.render(gifs);
					}, 
					error: function() {
						new ErrorView({
							title: "Fuck.",
							message: "Something bad happened. Try again."
						});
					}
				});
			},
			render: function(gifs){
				var self = this;
				if (gifs.length > 0) {
					gifs.forEach(function(thisgif) {
						var data = {
							src: thisgif.attributes.src,
							id: thisgif.id,
							tags: thisgif.attributes.tags 
						};
						$(self.el).prepend(self.template(data));
					});	
					new PlayGallery();
					this.sizer();
				} else {
					new ErrorView({
						title: "Fuck.",
						message: "We couldn't find any gifs from that user. Try again."
					});
				}
			},
			sizer: function() {
				var width = window.innerWidth;
				var height = window.innerHeight - 64;
				var gifs = $(".content .gif-container img");
				gifs.css({
					"width": width,
					"height": height
				});
				$(window).resize(function(){
					var width = window.innerWidth;
					var height = window.innerHeight - 64;
					var gifs = $(".content .gif-container img");
					gifs.css({
						"width": width,
						"height": height
					});
				});
			},
			reset: function() {
				this.remove();
			}
		});
		
		//tagged gifs view
		TagGifsView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gallery-gif-template').html()),
			initialize: function (){
				_.bindAll(this, "sizer");
				var self = this;
				var tag = this.options.tag;
				//grab all gifs by user
				var query = new Parse.Query("Gif");
				query.equalTo("tags", tag);
				query.find({
					success: function(gifs) {
						$('.content').empty();
						self.render(gifs);
					}, 
					error: function() {
						new ErrorView({
							title: "Fuck",
							message: "Crazy error, bro. Try again."
						});
					}
				});
			},
			render: function(gifs){
				var self = this;
				if (gifs.length > 0) {
					gifs.forEach(function(thisgif) {
						var data = {
							src: thisgif.attributes.src,
							id: thisgif.id,
							tags: thisgif.attributes.tags 
						};
						$(self.el).prepend(self.template(data));
					});	
					this.sizer();
					new PlayGallery();
				} else {
					new ErrorView({
						title: "Nada",
						message: "No gifs with that tag, bro. You should add some."
					});
				}
			},
			sizer: function() {
				var width = window.innerWidth;
				var height = window.innerHeight - 64;
				var gifs = $(".content .gif-container img");
				gifs.css({
					"width": width,
					"height": height
				});
				$(window).resize(function(){
					var width = window.innerWidth;
					var height = window.innerHeight - 64;
					var gifs = $(".content .gif-container img");
					gifs.css({
						"width": width,
						"height": height
					});
				});
			}
		});
		
			//play gallery
			PlayGallery = Parse.View.extend({
				el: $(".content"),
				initialize: function() {
					_.bindAll(this);
					this.element = $(".content");
					var item = this.element.find(".gif-container");
					var size = item.length;
					//load first five gifs
					if (size < 5) {
						item.each(function() {
							$(this).removeClass("unloaded").addClass("loaded");
							var img = $(this).find("img");
							var src = img.attr("data-src");
							img.attr("src", src);
						});
					} else {
						item.slice(0,5).each(function() {
							$(this).removeClass("unloaded").addClass("loaded");
							var img = $(this).find("img");
							var src = img.attr("data-src");
							img.attr("src", src);
						});
					}
					//show first one
					item.eq(0).removeClass("hide");
					// var gifid = item.eq(0).attr('id');	
					// app.navigate("gif/"+gifid+"", {trigger: false});	
				}
			});
			
		
		//single gif view
		SingleGifView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#single-gif-template').html()),
			events: {
				"click a.gif-one": "allGifs"
			},
			initialize: function(){
				_.bindAll(this, "sizer", "allGifs");
				var self = this;
				var singleGif = Parse.Object.extend("Gif");
				this.gif = new Parse.Query(singleGif);
				this.gif.get(this.options.gif, {
				  	success: function(gif) {
						self.render(gif);
						var tags = gif.attributes.tags;
				  	},
				  	error: function(gif, error) {
						new ErrorView({
							title: "Sorry",
							message: "We couldn't find that gif, bro."
						});
				  	}
				});
			},
			render: function(thisgif){
				var data = {
					src: thisgif.attributes.src,
					id: thisgif.id,
					tags: thisgif.attributes.tags 
				};
				$(this.el).html(this.template(data));	
				this.sizer();
			},
			sizer: function() {
				var width = window.innerWidth;
				var height = window.innerHeight - 64;
				var gifs = $(".content .gif-container img");
				gifs.css({
					"width": width,
					"height": height
				});
				$(window).resize(function(){
					var width = window.innerWidth;
					var height = window.innerHeight -64;
					var gifs = $(".content .gif-container img");
					gifs.css({
						"width": width,
						"height": height
					});
				});
			},
			allGifs: function() {
				app.navigate("all", {trigger: true});	
			}
		});
		
		//search view
	    SearchView = Parse.View.extend({
			el: $('.search'),
			template: _.template($('#search-template').html()),
			events: {
	     		"submit form.search": "search",
				"focus form.search input": "focus"
			},
			initialize: function() {
			  _.bindAll(this, "search", "focus");
			  this.render();
			},
			render: function() {
			  	$(this.el).html(this.template());
			},
			search: function() {
				var query = $("form.search input").val().toLowerCase().replace(/ /g,"-");
				if (query) {
					app.navigate("tag/"+query+"", {trigger: true});	
				}
		    	return false;
				this.remove();
		    },
			focus: function() {
				$("form.search input").attr('placeholder', '');
				$("form.search input").blur(function(){
					$("form.search input").attr('placeholder', 'search the gifs');
				});
			}
		});
	
		//nonuser view
		NonuserView = Parse.View.extend({
			el: ".user",
			template: _.template($('#nonuser-template').html()),
			events: {
				"click #login": "showLogin",
				"click #signup": "showSignup",
			    "submit form.login-form": "logIn",
			    "submit form.signup-form": "signUp"
			},
			initialize: function() {
			    _.bindAll(this, "showLogin", "showSignup", "logIn", "signUp");
				$('#signup-modal').modal();
				$('#login-modal').modal();
			    this.render();
			},
			render: function() {
			  this.$el.html(this.template());
			},
			showLogin: function() {
				$('#signup-modal').modal('hide');
				$('#login-modal').modal('show');
				// $("#login-username").focus();
			},
			showSignup: function() {
				$('#login-modal').modal('hide');
				$('#signup-modal').modal('show');
				// $("#signup-username").focus();
			},
			logIn: function(e) {
			  var self = this;
			  var username = this.$("#login-username").val();
			  var password = this.$("#login-password").val();
			  Parse.User.logIn(username, password, {
			    success: function(user) {
					self.username = user.attributes.username;
					new UserView({
						username: self.username
					});
				    new UploadView();
					$(".modal").modal('hide');
					_gaq.push(['_trackEvent', 'Login', 'login', '']);
			      	// self.remove();
			    },
			    error: function(user, error) {
			      self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
			      self.$(".login-form button").removeAttr("disabled");
			    }
			  });
			  this.$(".login-form button").attr("disabled", "disabled");
			  return false;
			},
			signUp: function(e) {
				return false;	
			}
	    });
	
		//user view
		UserView = Parse.View.extend({
			el: $('.user'),
			template: _.template($('#user-template').html()),
			events: {
	     		"click .log-out": "logOut"
			},
			initialize: function() {
			    _.bindAll(this, "logOut");
				var self = this;
				//get user shit
				var currentUser = Parse.User.current();
				var userid = currentUser.id;
				var user = Parse.Object.extend("User");
				var query = new Parse.Query(user);
				query.get(userid, {
					success: function(user) {
						var username = user.attributes.username;
						if (user.attributes.avatar) {
							var avatar = user.attributes.avatar.url;
						}
						else {
							var avatar = "img/avatar-default.png";
						}
						self.render(username,avatar);
					},
					error: function(object, error) {}
				});
			},
			render: function(username,avatar) {
			  	$(this.el).html(this.template({ 
					username: username,
					avatar: avatar
				}));
			},
			logOut: function(e) {
		        Parse.User.logOut();
				_gaq.push(['_trackEvent', 'Logout', 'logout', '']);
		        new NonuserView();
		        // this.remove();
		    }
		});
		
		//upload view
		UploadView = Parse.View.extend({
			events: {
				"change #fileselect": "grabFile",
				"submit #fileupload": "uploadGif",
				"submit #urladd": "addUrl",
				"click #add-modal-button": "showModal"
			},
			el: ".loggedin .add",
			template: _.template($('#upload-template').html()),
			appid: "lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P",
			restkey: "LfkvpLyFErkF84FPPoZIOzOvSNH10jQI1meGnLEr",
			initialize: function() {
				_.bindAll(this, "uploadGif", "grabFile", "addGif", "addUrl", "addToUser", "showModal");
			  	this.render();
			},
			render: function() {
				this.$el.append(this.template);
				$("form input.tags").each(function(){
					$(this).tagsManager({
						maxTags: 3
					});
				});
				$("form.add span a").click(function() {
					$("form.add").toggle();
					if ($("form#urladd:visible")) {
						$("form#urladd .urladdsrc").focus().val("");
					}
				});
			},
			grabFile: function(e) {
				var files = e.target.files || e.dataTransfer.files;
		        this.file = files[0];
				this.filetype = this.file.type;
			},
			uploadGif: function() {
				//make sure its a gif
				if (this.filetype === "image/gif") {
					var self = this;
					var serverUrl = 'https://api.parse.com/1/files/' + this.file.name;
					//send file
					$.ajax({
						type: "POST",
						beforeSend: function(request) {
							request.setRequestHeader("X-Parse-Application-Id", self.appid);
							request.setRequestHeader("X-Parse-REST-API-Key", self.restkey);
							request.setRequestHeader("Content-Type", self.file.type);
						},
						url: serverUrl,
						data: self.file,
						processData: false,
						contentType: false,
						success: function(data) {
							self.addGif(data.url);
						},
						error: function(data) {
						  	new ErrorView({
								title: "Awww, Bro",
								message: "We encountered an error. Try again."
							});
						}
					});
				} else {
					var error = $("#fileupload .error").html("The name of this site is <em>gifasm</em>. You need to upload a gif.").show();
				}
				return false;
			},
			addGif: function(src) {
				var self = this;
				//check if url is a gif
				var str = src.substr(-5);
				if (str.indexOf(".gif") >= 0) {
					var self = this;
					var user = Parse.User.current();
					if (user) {
						var userid = user.id;
						var username = this.options.username;
					} else {
						var username = "anonymous"
						var userid = "iPhqjAbg7C"
					}
					var tags = $("form:visible input[name=hidden-tags]").val().toLowerCase();
					var gif = new Gif();
					gif.set("src", src);
					gif.set("username", username);
					gif.set("userid", userid);
					if (tags) {
						var tags = tags.split(',');
						gif.set("tags", tags);
					}
					gif.save(null, {
						success: function(newgif) {
							if (Parse.User.current()) {
								self.addToUser(newgif);
							}
							$(".modal").modal('hide');
							_gaq.push(['_trackEvent', 'Added Gif', 'added gif', '']);
							app.navigate("#/gif/"+newgif.id+"", {trigger: true});	
					  	},
						error: function() {
							new ErrorView({
								title: "Shit, Error.",
								message: "We couldn't save that gif for you. Try again."
							});
						}
					});
				} else {
					var error = $("#urladd .error").html("That doesn't appear to be a gif. Try again, homey.").show();
				}
			},
			addUrl: function() {
			  	var urltoadd = this.$("input.urladdsrc").val();
				this.addGif(urltoadd);
				return false;
			}, 
			addToUser: function(gif) {
				var user = Parse.User.current();
				var relation = user.relation("gifs");
				relation.add(gif);
				user.save(null, {
					success: function() {},
					error: function() {}
				});
			},
			showModal: function() {
				$("#add-modal").modal("toggle");
			}
		});

		
		//error view
		ErrorView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#error-template').html()),
			initialize: function() {
			  _.bindAll(this);
			  this.render();
			},
			render: function() {
				var data = {
					title: this.options.title,
					message: this.options.message
				};
			  	$(this.el).html(this.template(data));
				_gaq.push(['_trackPageview']);
				_gaq.push(['_trackEvent', 'Error', 'error', '']);
			}
		});
		

		//app view
		AppView = Parse.View.extend({
			el: ".content",
			events: {
				"click div.gallery-gif" : "nextgif"
			},
			initialize: function() {
				_.bindAll(this, "nextgif");
		        this.render();
		    },
		    render: function() {
				var currentUser = Parse.User.current();
				if (currentUser) {
					// new UserView();
				} else {
					// new NonuserView();
				}
				new UploadView();
				new SearchView();
		    },
			nextgif: function() {
				var current = $("div.gallery-gif:visible");
				var nextdex = current.index() + 1;
				var next = $(".content").find(".gif-container:eq("+nextdex+")");
				//hide current
				current.addClass("hide");
				//show next
				if (next.length) {
					//show next
					next.removeClass("hide");
					//update url
					var gifid = next.attr('id');
					app.navigate("/gif/"+gifid+"", {trigger: false});	
					//load next unloaded gif
					var ondeck = $(".content .gif-container.unloaded").eq(0);
					if (ondeck.length) {
						ondeck.removeClass("unloaded").addClass("loaded");
						var img = ondeck.find("img");
						var src = img.attr("data-src");
						img.attr("src", src);
					}
				} else {
					$(".content .gallery-gif").eq(0).removeClass("hide");
				}
				_gaq.push(['_trackPageview']);
			}
		});	
		
			
	
	//router
	var AppRouter = Parse.Router.extend({
		routes: {
			""    :    "home",
			"all" : "all",
			"gif/:id" : "singleGif",
			"user/:username" : "userGallery",
			"tag/:tag" : "tagGallery",
			"about" : "about",
			":whatever" : "404"
		},
		initialize: function() {
	        new AppView();
	    },
		home: function() {
			new AllGifsView();
		},
		all: function() {
			new AllGifsView();
		},
		singleGif: function(id) {
			new SingleGifView({
				gif: id
			});
		},
		userGallery: function(username) {
			new UserGifsView({
				username: username
			});
		},
		tagGallery: function(tag) {
			var tag = tag.replace(/-/g, " ");
			var tag = tag.toLowerCase();
			new TagGifsView({
				tag: tag
			});
		}, 
		404: function() {
			new ErrorView({
				title: "Well, Fuck",
				message: "We couldn't find that page."
			});
		}
	});
	
	var app = new AppRouter();
	Parse.history.start();
	
	
	
	//global
	
		//signup
		signUp = function() {
		    var self = $(this);
		    var username = $("form#signup #signup-username").val();
		    var password = $("form#signup #signup-password").val();
			//make new user
			var user = new Parse.User();
			user.set("username", username);
			user.set("password", password);
			user.signUp(null, {
				success: function(user) {
					var username = user.attributes.username;
					new UserView({
						username: username
					});
					new UploadView();
					$(".modal").modal('hide');
					_gaq.push(['_trackEvent', 'Signup', 'signup', '']);
				},
				error: function(user, error) {
					$("form#signup .error").html(error.message).show();
					$("form#signup button").removeAttr("disabled");
				}
			});
		    self.find(".signup-form button").attr("disabled", "disabled");
		    return false;	
		};
	
});