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
						$(".content").empty();
						self.render(gifs);
					},
					error: function(collection, error) {
					    // The collection could not be retrieved.
						alert('could not fetch all gif collection');
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
					var height = window.innerHeight -64;
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
						$(".content").empty();
						self.render(gifs);
					}, 
					error: function() {
						alert('couldnt find user gifs');
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
					alert("this user has no gifs");
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
					var height = window.innerHeight -64;
					var gifs = $(".content .gif-container img");
					gifs.css({
						"width": width,
						"height": height
					});
				});
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
						$(".content").empty();
						self.render(gifs);
					}, 
					error: function() {
						alert('couldnt grab any gifs by tag');
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
					alert("couldnt find any gifs with that tag");
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
					var height = window.innerHeight -64;
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
				el: $('.content'),
				events: {
		     		"click a.gif": "next"
				},
				initialize: function() {
					_.bindAll(this, "next");
					var item = $(".content .gallery-gif");
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
				},
				next: function() {
					var current = $(".content .gallery-gif:visible");
					var next = current.next(".gallery-gif");
					//hide current
					current.addClass("hide");
					//show next
					if (next.length) {
						next.removeClass("hide");
						//load next unloaded gif
						var ondeck = $(".content .gallery-gif.unloaded").eq(0);
						if (ondeck.length) {
							ondeck.removeClass("unloaded").addClass("loaded");
							var img = ondeck.find("img");
							var src = img.attr("data-src");
							img.attr("src", src);
						}
					} else {
						$(".content .gallery-gif").eq(0).removeClass("hide");
					}
				}	
			});
			
		
		//single gif view
		SingleGifView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#single-gif-template').html()),
			initialize: function(){
				_.bindAll(this, "sizer");
				var self = this;
				var singleGif = Parse.Object.extend("Gif");
				this.gif = new Parse.Query(singleGif);
				this.gif.get(this.options.gif, {
				  	success: function(gif) {
						$(".content").empty();
						self.render(gif);
						var tags = gif.attributes.tags;
				  	},
				  	error: function(gif, error) {
						alert('shit');
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
			}
		});
		
		//search view
	    SearchView = Parse.View.extend({
			el: $('.search'),
			template: _.template($('#search-template').html()),
			events: {
	     		"submit form.search": "search"
			},
			initialize: function() {
			  _.bindAll(this, "search");
			  this.render();
			},
			render: function() {
			  	$(this.el).html(this.template());
			},
			search: function() {
				var query = $("form.search input").val();
				if (query) {
					app.navigate("/tag/"+query+"", {trigger: true});	
				}
		    	return false;
		    }
		});
	
		//logged out view
		LoggedOutView = Parse.View.extend({
			el: ".user",
			template: _.template($('#nonuser-template').html()),
			events: {
			  "submit form.login-form": "logIn",
			  "submit form.signup-form": "signUp"
			},
			initialize: function() {
			    _.bindAll(this, "logIn", "signUp");
			    this.render();
			},
			render: function() {
			  this.$el.html(this.template());
			},
			logIn: function(e) {
			  var self = this;
			  var username = this.$("#login-username").val();
			  var password = this.$("#login-password").val();
			
			  Parse.User.logIn(username, password, {
			    success: function(user) {
			      new LoggedInView();
				  new UploadView();
			      delete self;
			    },
			    error: function(user, error) {
			      self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
			      this.$(".login-form button").removeAttr("disabled");
			    }
			  });
			  this.$(".login-form button").attr("disabled", "disabled");
			  return false;
			},
			signUp: function(e) {
			  var self = this;
			  var username = this.$("#signup-username").val();
			  var password = this.$("#signup-password").val();

			  Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
			    success: function(user) {
				  new LoggedInView();
				  delete self;
			    },
			    error: function(user, error) {
			      self.$(".signup-form .error").html(error.message).show();
			      this.$(".signup-form button").removeAttr("disabled");
			    }
			  });
			  this.$(".signup-form button").attr("disabled", "disabled");
			  return false;
			}
	    });
	
		//logged in view
		LoggedInView = Parse.View.extend({
			el: $('.user'),
			template: _.template($('#user-template').html()),
			events: {
	     		"click .log-out": "logOut"
			},
			initialize: function() {
			  _.bindAll(this, "logOut");
			  this.user = Parse.User.current();
			  this.render();
			},
			render: function() {
			  	$(this.el).html(this.template({ 
					username: this.user.get("username")
				 }));
			},
			logOut: function(e) {
		      Parse.User.logOut();
		      new LoggedOutView();
		      delete this;
		    }
		});
		
		//upload view
		UploadView = Parse.View.extend({
			events: {
				"change #fileselect": "grabFile",
				"click #uploadbutton": "uploadGif",
				"click #urladdbutton": "addUrl",
			},
			el: ".loggedin .add",
			template: _.template($('#upload-template').html()),
			appid: "lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P",
			restkey: "LfkvpLyFErkF84FPPoZIOzOvSNH10jQI1meGnLEr",
			initialize: function() {
				_.bindAll(this, "uploadGif", "grabFile", "addGif", "addUrl", "addToUser");
			  	this.render();
			},
			render: function() {
				this.$el.append(this.template);
				$("form input.tags").tagsManager();
			},
			grabFile: function(e) {
				var files = e.target.files || e.dataTransfer.files;
		        this.file = files[0];
			},
			uploadGif: function() {
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
						console.log(data);
						self.addGif(data.url);
					},
					error: function(data) {
					  	var obj = jQuery.parseJSON(data);
					  	alert(obj.error);
					}
				});
			},
			addGif: function(src) {
				var self = this;
				var user = Parse.User.current();
				var username = user.get("username");
				var userid = user.id;
				var tags = $("input[name=hidden-tags]").val();
				var gif = new Gif();
				gif.set("src", src);
				gif.set("username", username);
				gif.set("userid", userid);
				if (tags) {
					var tags = tags.split(',');
					gif.set("tags", tags);
				} else {
					alert('notags')
				};
				gif.save(null, {
					success: function(newgif) {
						self.addToUser(newgif);
						app.navigate("/gif/"+newgif.id+"", {trigger: true});
						delete self;
				  	},
					error: function() {
						alert('error creating new gif')
					}
				});
			},
			addUrl: function() {
			  	var urltoadd = this.$("input#urladdsrc").val();
				this.addGif(urltoadd);
				return false;
			}, 
			addToUser: function(gif) {
				var user = Parse.User.current();
				var relation = user.relation("gifs");
				relation.add(gif);
				user.save(null, {
					success: function() {

					},
					error: function() {
						alert('error addToUser');
					}
				});
			}
		});

		//app view
		AppView = Parse.View.extend({
			el: ".content",
			initialize: function() {
				_.bindAll(this);
		        this.render();
		    },
		    render: function() {
				var currentUser = Parse.User.current();
				if (currentUser) {
					new LoggedInView();
					new UploadView();
				} else {
					new LoggedOutView();
				}
				new SearchView();
		    }
		});
		
	
	//router
	var AppRouter = Parse.Router.extend({
		routes: {
			""    :    "home",
			"gif/:id" : "singleGif",
			":username" : "userGallery",
			"tag/:tag" : "tagGallery"
		},
		initialize: function() {
	        new AppView();
	    },
		home: function() {
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
			new TagGifsView({
				tag: tag
			});
		}
	});
	
	var app = new AppRouter();
	Parse.history.start();
	
});