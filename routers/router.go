package routers

import (
	"github.com/astaxie/beego"
	"github.com/notfoolen/todo/api"
	"github.com/notfoolen/todo/controllers"
)

func init() {
	beego.Router("*", &controllers.IndexController{}, "get:Index")
	beego.Router("/signin", &controllers.IndexController{}, "get:Index")
	beego.Router("/signup", &controllers.IndexController{}, "get:Index")
	beego.Router("/boards", &controllers.IndexController{}, "get:Index")

	// api
	apiNs :=
		beego.NewNamespace("/api",
			// registration, login
			beego.NSRouter("/signup", &api.AccountController{}, "post:SignUp"),
			beego.NSRouter("/signin", &api.AccountController{}, "post:SignIn"),
			beego.NSRouter("/logout", &api.AccountController{}, "get:Logout"),

			// account
			beego.NSRouter("/account", &api.AccountController{}, "get:Get"),

			// boards
			beego.NSRouter("/boards/:code", &api.BoardsController{}, "get:GetByCode"),
			beego.NSRouter("/boards", &api.BoardsController{}),
			beego.NSRouter("/boards/:code", &api.BoardsController{}, "delete:Delete"),

			beego.NSRouter("/desks", &api.DesksController{}),
			beego.NSRouter("/desks/reorder", &api.DesksController{}, "post:Reorder"),
			beego.NSRouter("/desks/:id", &api.DesksController{}, "delete:Delete"),

			beego.NSRouter("/cards", &api.CardsController{}),
			beego.NSRouter("/cards/reorder", &api.CardsController{}, "post:Reorder"),
			beego.NSRouter("/cards/:id", &api.CardsController{}, "delete:Delete"),
		)
	beego.AddNamespace(apiNs)
}
