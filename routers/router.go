package routers

import (
	"github.com/astaxie/beego"
	"github.com/notfoolen/todo/api"
	"github.com/notfoolen/todo/controllers"
)

func init() {
	beego.Router("/", &controllers.IndexController{}, "get:Index")
	beego.Router("/signin", &controllers.IndexController{}, "get:Index")
	beego.Router("/signup", &controllers.IndexController{}, "get:Index")
	beego.Router("/boards", &controllers.IndexController{}, "get:Index")

	// api
	apiNs :=
		beego.NewNamespace("/api",
			// registration, login
			beego.NSRouter("/signup", &api.AccountController{}, "post:SignUp"),
			beego.NSRouter("/signin", &api.AccountController{}, "post:SignIn"),

			// account
			beego.NSRouter("/account", &api.AccountController{}, "get:Get"),

			// boards
			beego.NSRouter("/boards/:id([0-9]+)", &api.BoardsController{}, "get:GetByID"),
			beego.NSRouter("/boards", &api.BoardsController{}),
		)
	beego.AddNamespace(apiNs)
}
