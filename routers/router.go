package routers

import (
	"github.com/astaxie/beego"
	"github.com/notfoolen/todo/api"
	"github.com/notfoolen/todo/controllers"
)

func init() {
	beego.Router("/", &controllers.IndexController{}, "get:Index")

	/*
		beego.Router("/signin", &controllers.AccountController{}, "get,post:SignIn")
		beego.Router("/signup", &controllers.AccountController{}, "get,post:SignUp")
		beego.Router("/signout", &controllers.AccountController{}, "get:SignOut")
	*/
	// api
	apiNs :=
		beego.NewNamespace("/api",
			// upload
			// beego.NSRouter("/upload", &api.UploadController{}, "post:Post"),
			// account
			beego.NSRouter("/signup", &api.AccountController{}, "post:SignUp"),
			beego.NSRouter("/signin", &api.AccountController{}, "post:SignIn"),
		)
	beego.AddNamespace(apiNs)
}
