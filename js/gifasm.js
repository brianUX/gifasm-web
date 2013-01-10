$(function(){
	
	Parse.initialize("lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P", "D7k2Ttgt6bzQhGhV3BWRAz42EKSKjZvBaevdl7fU");
	
	//models
	var Gif = Parse.Object.extend("Gif");
	
	var Gifs = Parse.Collection.extend({
		model: Gif
	});
	
	//views
	
		//board view
		GifBoardView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gif-board-template').html()),
			initialize: function(){
				_.bindAll(this);
				$('.content').empty();
				$('.error').empty();
				var gifs = this.options.gifs;
				this.render(gifs);
				$('.loading').hide();
			},
			render: function(gifs){
				var self = this;
				if (gifs.length > 0) {
					gifs.forEach(function(thisgif) {
						if (self.options.source === "parse") {
							var data = {
								src: thisgif.attributes.src
							};
							$(self.el).prepend(self.template(data));
						}
						else if (self.options.source === "reddit") {
							var data = {
								src: thisgif.data.url
							};
							var str = thisgif.data.url;
							if (str.indexOf(".gif") >= 0) {
								$(self.el).append(self.template(data));
							}
						}
					});	
					if  ($('a.gif').size() < 1) {
						new ErrorView({
							title: self.options.errorTitle,
							message: self.options.errorMessage
						});
					}
				} else {
					alert($('a.gif').size());
					new ErrorView({
						title: self.options.errorTitle,
						message: self.options.errorMessage
					});
				}
			}
		});
		
		//fullscreen view
		GifFullView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gallery-gif-template').html()),
			initialize: function(){
				_.bindAll(this, "sizer");
				$('.content').empty();
				$('.error').empty();
				var gifs = this.options.gifs;
				this.render(gifs);
				$('.loading').hide();
			},
			render: function(gifs){
				var self = this;
				if (gifs.length > 0) {
					gifs.forEach(function(thisgif) {
						if (self.options.source === "parse") {
							var data = {
								src: thisgif.attributes.src,
								id: thisgif.id,
								tags: thisgif.attributes.tags 
							};
							$(self.el).prepend(self.template(data));
						}
						else if (self.options.source === "reddit") {
							var id = "reddit";
							var tags = [''];
							var data = {
								src: thisgif.data.url,
								id: id,
								tags: tags
							};
							var str = thisgif.data.url;
							if (str.indexOf(".gif") >= 0) {
								$(self.el).append(self.template(data));
							}
						}
					});
					if  ($('a.gif').size() < 1) {
						new ErrorView({
							title: self.options.errorTitle,
							message: self.options.errorMessage
						});
					}
					new PlayGallery();
					self.sizer();
				} else {
					new ErrorView({
						title: self.options.errorTitle,
						message: self.options.errorMessage
					});
				}
			},
			sizer: function() {
				var width = window.innerWidth;
				var height = window.innerHeight;
				var gifs = $(".content .gif-container img.the-gif");
				gifs.css({
					"width": width,
					"height": height
				});
				$(window).resize(function(){
					var width = window.innerWidth;
					var height = window.innerHeight;
					var gifs = $(".content .gif-container img.the-gif");
					gifs.css({
						"width": width,
						"height": height
					});
				});
			}
		});
	
		//all gifs view
		AllGifsView = Parse.View.extend({
			el: $('.title'),
			template: _.template($('#title-board-template').html()),
			initialize: function(){
				_.bindAll(this);
				$('.loading').show();
				var self = this;
				var Gifs = Parse.Object.extend("Gif");
				var query = new Parse.Query(Gifs);
				query.limit(1000);
				query.ascending("createdAt");
				query.find({
					success: function(gifs) {
						new GifFullView({
							source: "parse",
							gifs: gifs,
							errorTitle: 'Rats',
							errorMessage: "We couldn't find any gifs, bro."
						});
					},
					error: function(collection, error) {
					    new ErrorView({
							title: "Error 420",
							message: "You're not high enough."
						});
					}
				});
				this.render();
			},
			render: function(){
				var self = this;
				$('.title').empty();
				var data = {
					title: "all"
				};
				$(self.el).prepend(self.template(data));
			}
		});
		
		//reddit gifs view
		RedditGifsView = Parse.View.extend({
			el: $('.title'),
			template: _.template($('#title-board-template').html()),
			initialize: function(){
				_.bindAll(this);
				$('.loading').show();
				var self = this;
				var username = this.options.username;
				var subreddit = this.options.subreddit;
				this.title = "r/"+subreddit+"";
				//grab top gifs 
				$.getJSON("http://www.reddit.com/"+this.title+".json?sort=hot&limit=100&jsonp=?", 
					{
				    	format: "jsonp"
				 	},
				  	function(data) {
						var gifs = data.data.children;
						new GifFullView({
							source: "reddit",
							gifs: gifs,
							errorTitle: 'Nope',
							errorMessage: "No popular gifs in <em>"+self.title+"</em> at the moment."
						});
			    	}
				).error(function() {
					new ErrorView({
						title: "Bummer.",
						message: "Doesn't look like <em>"+self.title+"</em> exists."
					});
				});
				this.render();
			},
			render: function(){
				var self = this;
				$('.title').empty();
				var data = {
					title: self.title
				};
				$(self.el).prepend(self.template(data));
			}
		});
		
		//reddit search view
		RedditSearchView = Parse.View.extend({
			el: $('.title'),
			template: _.template($('#title-board-template').html()),
			initialize: function(){
				_.bindAll(this, "fetch", "getCount", "makeView", "combineObjects");
				$('.loading').show();
				var self = this;
				var username = this.options.username;
				this.query = this.options.query;
				this.title = "search/"+this.query+"";
				this.fetch(this.query);
				this.render();
			},
			render: function(){
				var self = this;
				$('.title').empty();
				var data = {
					title: self.title
				};
				$(self.el).prepend(self.template(data));
			},
			fetch: function(query,count,after) {
				var self = this;
				var url = "http://www.reddit.com/search.json?q="+query+"+gifs&sort=relevance&t=all&limit=100&count="+count+"&after="+after+"&jsonp=?"
				$.getJSON(url, {format: "jsonp"}, 
					function(data) {
						var gifs = data.data.children;
						self.makeView(gifs);
			    	}
				).error(function() {
					new ErrorView({
						title: "Error",
						message: "Your search for <em>"+self.options.query+"</em> broke the internet. Try again."
					});
				});
			},
			getCount: function(gifs,lastGifId) {
				var self = this;
			    var count = 0,
			        key;
			    for (key in gifs) {
			        if (gifs.hasOwnProperty(key)) {
			            count++;
			        }
			    }
				if (count < 100) {
					var last = true;
				} else { 
					var last = false;
				}
				self.combineObjects(gifs,count,last,lastGifId);
			},
			combineObjects: function(gifs,count,last,lastGifId) {
				var self = this;
				self.allGifs = jQuery.extend(true,self.allGifs, gifs);
				var dankGifs = self.allGifs;
				console.log()
				if (last == false) {
					self.newCount = self.newCount + 100;
					console.log(self.newCount);
					self.fetch(self.query,self.newCount,lastGifId);
				}
				if (last == true) {
					self.makeView(dankGifs);
				}
				
			},
			makeView: function(allGifs) {
				var self = this;
				new GifFullView({
					source: "reddit",
					gifs: allGifs,
					errorTitle: 'Drats',
					errorMessage: "Couldn't find any <em>"+self.options.query+"</em> gifs. You should upload some, bro."
				});	
			}
		});
		
		//user gifs view
		UserGifsView = Parse.View.extend({
			el: $('.title'),
			template: _.template($('#title-board-template').html()),
			initialize: function(){
				_.bindAll(this);
				$('.loading').show();
				var self = this;
				var username = this.options.username;
				//grab all gifs by user
				var gifs = new Parse.Query("Gif");
				gifs.matches("username", username);
				gifs.ascending("createdAt");
				gifs.find({
					success: function(gifs) {
						var viewtype = self.options.viewtype;
						if (viewtype === "grid") {
							new GifBoardView({
								source: "parse",
								gifs: gifs,
								errorTitle: 'Damn',
								errorMessage: "We couldn't find any gifs from <em>"+username+"</em>. Try again."
							});	
						} else {
							new GifFullView({
								source: "parse",
								gifs: gifs,
								errorTitle: 'Damn',
								errorMessage: "We couldn't find any gifs from <em>"+username+"</em>. Try again."
							});
						}
					}, 
					error: function() {
						new ErrorView({
							title: "Fuck.",
							message: "Something bad happened. Try again."
						});
					}
				});
				this.render();
			},
			render: function(){
				var self = this;
				$('.title').empty();
				var data = {
					title: "u/"+self.options.username+""
				};
				$(self.el).prepend(self.template(data));
			}
		});
		
		//tagged gifs view
		TagGifsView = Parse.View.extend({
			el: $('.title'),
			template: _.template($('#title-board-template').html()),
			initialize: function (){
				_.bindAll(this);
				$('.loading').show();
				var self = this;
				var tag = this.options.tag;
				//grab all gifs by user
				var query = new Parse.Query("Gif");
				query.equalTo("tags", tag);
				query.find({
					success: function(gifs) {
						new GifFullView({
							source: "parse",
							gifs: gifs,
							errorTitle: 'Nada',
							errorMessage: "No gifs tagged <em>"+tag+"</em>, bro. You should add some."
						});
					}, 
					error: function() {
						new ErrorView({
							title: "Fuck",
							message: "Crazy error, bro. Try again."
						});
					}
				});
				this.render();
			},
			render: function(){
				var self = this;
				$('.title').empty();
				var data = {
					title: "tag/"+self.options.tag+""
				};
				$(self.el).prepend(self.template(data));
			}
		});
		
			//play gallery
			PlayGallery = Parse.View.extend({
				el: $(".content"),
				initialize: function() {
					_.bindAll(this);
					this.element = $(".content");
					this.item = this.element.find(".gif-container");
					var size = this.item.length;
					this.item.slice(0,5).each(function() {
						$(this).removeClass("unloaded").addClass("loaded");
						var img = $(this).find("img.the-gif");
						var src = img.attr("data-src");
						img.attr("src", src);
						img.error(function() {
							var x = $(this).parents(".gif-container");
							var i = x.index();
							if (i == 0) {
								x.next('.gif-container').removeClass('hide');
							}
							x.remove();
						});
					});
					//show first one
					// var gifid = this.item.eq(0).attr('id');	
					$(".content .gif-container.loaded:first-child").removeClass('hide');
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
				var height = window.innerHeight;
				var gifs = $(".content .gif-container img.the-gif");
				gifs.css({
					"width": width,
					"height": height
				});
				$(window).resize(function(){
					var width = window.innerWidth;
					var height = window.innerHeight;
					var gifs = $(".content .gif-container img.the-gif");
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
				var query = $("form.search input").val().replace(/\s+/g, '-').toLowerCase();
				if (query) {
					app.navigate("search/"+query+"", {trigger: true});	
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
			    "submit form.login-form": "logIn",
			    "submit form.signup-form": "signUp"
			},
			initialize: function() {
			    _.bindAll(this, "logIn", "signUp");
				$('#signup-modal').modal();
				$('#login-modal').modal();
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
					error: function(object, error) {
						self.render(username,avatar);
					}
				});
			},
			render: function(username,avatar) {
			  	$(this.el).html(this.template({ 
					username: username,
					avatar: avatar
				}));
				new UploadView();
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
				"submit #urladd": "addUrl"
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
				$("form input.tags").each(function(){
					$(this).tagsManager({
						maxTags: 3
					});
				});
				$("a.add-toggle").click(function() {
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
					$("button.add-gif:visible").button('loading');
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
					var userid = user.id;
					var username = $('.username').text();
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
							$("span.myTag").remove();
							$("input.urladdsrc").val('');
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
			}
		});

		
		//error view
		ErrorView = Parse.View.extend({
			el: $('.error'),
			template: _.template($('#error-template').html()),
			initialize: function() {
			  _.bindAll(this);
			  this.render();
			  $('.loading').hide();
			  $('.content').empty();
			},
			render: function() {
				var data = {
					title: this.options.title,
					message: this.options.message
				};
			  	$(this.el).html(this.template(data));
				$('.error').show();
				_gaq.push(['_trackPageview', 'error']);
				_gaq.push(['_trackEvent', 'Error', 'error', '']);
			}
		});
		

		//app view
		AppView = Parse.View.extend({
			el: ".content",
			events: {
				"click .tags span" : "tag",
				"click a.regif" : "regif"
			},
			initialize: function() {
				_.bindAll(this, "tag", "regif");
		        this.render();
		    },
		    render: function() {
				var currentUser = Parse.User.current();
				if (currentUser) {
					new UserView();
				} else {
					new NonuserView();
				}
				new SearchView();
		    },
			tag: function(e) {
				event.stopPropogation(e);
			},
			regif: function(e) {
				var currentUser = Parse.User.current();
				var src = $(".gallery-gif:visible").find('img').attr('src');
				if (currentUser) {
					reGif(src);
				} else {
					$("#signup-modal").modal("show");
				}
				event.stopPropogation();
			}
		});	
		
			
	
	//router
	var AppRouter = Parse.Router.extend({
		routes: {
			""    :    "home",
			"all" : "all",
			"gif/:id" : "singleGif",
			"u/:username/:viewtype" : "userGalleryView",
			"u/:username" : "userGallery",
			"tag/:tag" : "tagGallery",
			"search/:query" : "redditSearch",
			"about" : "about",
			"r/:subreddit" : "reddit",
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
		userGalleryView: function(username,viewtype) {
			new UserGifsView({
				username: username,
				viewtype: viewtype
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
		reddit: function(subreddit) {
			new RedditGifsView({
				subreddit: subreddit
			});
		},
		redditSearch: function(query) {
			new RedditSearchView({
				query: query
			})
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
		
		//login toggle
		$(".login").click(function() {
			$('#signup-modal').modal('hide');
			$('#login-modal').modal('show');
			$("#login-username").focus();
		});
		
		//signup toggle
		$(".signup").click(function() {
			$('#login-modal').modal('hide');
			$('#signup-modal').modal('show');
			$("#signup-username").focus();
		});
		
		//upload modal
		$("a#add-modal-button").live('click', function() {
			$("#add-modal").modal("toggle");
		});

		//regif
		reGif = function(src) {
			var src = src;
			//check if already exists
			var Gif = Parse.Object.extend("Gif");
			var query = new Parse.Query(Gif);
			query.equalTo("src", src);
			query.find({
			  success: function(results) {
			  	if (results.length) {

			  	} else {
			  		//show tag modal
			  		$("form#tagadd input.tags").tagsManager({
						maxTags: 3
					});
					$("#tag-modal").modal("show");
					$("form#tagadd").submit(function(){
						addExternalGif(src);
						$("#tag-modal").modal("hide");
						return false;
					});
			  	}
			  },
			  error: function(error) {
			    new ErrorView({
					title: "Uh, oh.",
					errorMessage: "Something weird happened. Try again"
				});
			  }
			});
		}

		//add external gif
		addExternalGif = function(src) {
			var src = src;
			var user = Parse.User.current();
			var userid = user.id;
			var username = $('.username').text();
			var gif = new Gif();
			var tags = $("form#tagadd input[name=hidden-tags]").val().toLowerCase();
			gif.set("src", src);
			gif.set("username", username);
			gif.set("userid", userid);
			if (tags) {
				var tags = tags.split(',');
				gif.set("tags", tags);
			}
			gif.save(null, {
				success: function(newgif) {
					alert(tags);
					_gaq.push(['_trackEvent', 'Regif', 'regif', '']);	
			  	},
				error: function() {
					alert('Regif error. Please try again')
				}
			});
		}
		
		//next gif
		$(".content .gallery-gif").live('click', function(){ 
			var current = $("div.gallery-gif:visible");
			if (!(current)) {
				alert('no current');
				var current = $("div.gallery-gif:first-child");
			}
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
				// app.navigate("/gif/"+gifid+"", {trigger: false});	
				//load next unloaded gif
				var ondeck = $(".content .gif-container.unloaded").eq(0);
				if (ondeck.length) {
					ondeck.removeClass("unloaded").addClass("loaded");
					var img = ondeck.find("img.the-gif");
					var src = img.attr("data-src");
					img.attr("src", src);
					img.error(function() {
						var x = $(this).parents(".gif-container");
						var next = x.next(".gif-container");
						if (next.hasClass("unloaded")) {
							next.removeClass("unloaded").addClass("loaded");
							var img = next.find("img.the-gif");
							var src = img.attr("data-src");
							img.attr("src", src);
						}
						x.remove();
					});
				}
			} else {
				$(".content .gallery-gif").eq(0).removeClass("hide");
			}
			var thisURL = window.location.hash;
			_gaq.push(['_trackPageview', thisURL]);
		});

		
});


