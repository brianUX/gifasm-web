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
			template: _.template($('#gifs-template').html()),
			initialize: function(){
				_.bindAll(this);
				var self = this;
				this.gifs = new Gifs();
				this.gifs.fetch({
					success: function(collection) {
						self.render(collection);
					},
					error: function(collection, error) {
					    // The collection could not be retrieved.
						alert('could not fetch all gif collection');
					}
				});
			},
			render: function(gifs){
				var self = this;
				gifs.each(function(gif) {
					$(self.el).append(self.template({ 
						src: gif.attributes.src,
						id: gif.id
					}));
				});
			}
		});
		
		//single gif view
		SingleGifView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gifs-template').html()),
			initialize: function(){
				_.bindAll(this);
				var self = this;
				var singleGif = Parse.Object.extend("Gif");
				this.gif = new Parse.Query(singleGif);
				this.gif.get(this.options.gif, {
				  	success: function(gif) {
						self.render(gif);
				  	},
				  	error: function(gif, error) {
						alert('shit');
				  	}
				});
			},
			render: function(thisgif){
				$(this.el).html(this.template({ 
					src: thisgif.attributes.src,
					id: thisgif.id
				 }));
			}
		});
		
		//user gifs view
		UserGifsView = Parse.View.extend({
			el: $('.content'),
			template: _.template($('#gifs-template').html()),
			initialize: function(){
				_.bindAll(this);
				var self = this;
				var username = this.options.username;
				//grab all gifs by user
				var gifs = new Parse.Query("Gif");
				gifs.equalTo("username", username);
				gifs.find({
					success: function(gifs) {
						if (gifs.length > 0) {
							gifs.forEach(self.render);	
						} else {
							alert("this user has no gifs");
						}
					}, 
					error: function() {
						alert('couldnt find user gifs');
					}
				});
			},
			render: function(gif){
				$(this.el).append(this.template({ 
					src: gif.attributes.src,
					id: gif.id
				}));
			}
		});
	
		//logged out view
		LoggedOutView = Parse.View.extend({
			events: {
			  "submit form.login-form": "logIn",
			  "submit form.signup-form": "signUp"
			},
			el: ".user",
			initialize: function() {
			    _.bindAll(this, "logIn", "signUp");
			    this.render();
			},
			render: function() {
			  this.$el.html(_.template($("#login-template").html()));
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
			template: _.template($('#logout-template').html()),
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
			el: ".user",
			template: _.template($('#upload-template').html()),
			appid: "lwRB5rPvenfJwKYSeDtnCsXj4WNZa3PuwAyAIN3P",
			restkey: "LfkvpLyFErkF84FPPoZIOzOvSNH10jQI1meGnLEr",
			initialize: function() {
				_.bindAll(this, "uploadGif", "grabFile", "addGif", "addUrl", "addToUser");
			  	this.render();
			},
			render: function() {
				this.$el.append(this.template);
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
				var gif = new Gif();
				gif.set("src", src);
				gif.set("username", username);
				gif.set("userid", userid);
				gif.save(null, {
					success: function(newgif) {
						self.addToUser(newgif);
						app.navigate("/g/"+newgif.id+"", {trigger: true});
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
			initialize: function(){
		        this.render();
		    },
		    render: function(){
				var currentUser = Parse.User.current();
				if (currentUser) {
					new LoggedInView();
					new UploadView();
				} else {
					new LoggedOutView();
				}
		    },
		    events: {

		    }
		});
	
	//router
	var AppRouter = Parse.Router.extend({
		routes: {
			""    :    "home",
			"g/:id" : "singleGif",
			":username" : "userGallery"
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
		}
		
	});
	
	var app = new AppRouter();
	Parse.history.start();
	
});