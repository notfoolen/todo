package routers

import (
	"github.com/astaxie/beego"
	"github.com/notfoolen/todo/controllers"
)

func init() {
	beego.Router("/", &controllers.IndexController{}, "get:Index")

	beego.Router("/signin", &controllers.AccountController{}, "get,post:SignIn")
	beego.Router("/signup", &controllers.AccountController{}, "get,post:SignUp")
	beego.Router("/signout", &controllers.AccountController{}, "get:SignOut")

	/*
		// api
		apiNs :=
			beego.NewNamespace("/api",
				// upload
				beego.NSRouter("/upload", &api.UploadController{}, "post:Post"),
			)
		beego.AddNamespace(apiNs)
	*/
}
