package controllers

import (
	"html/template"

	"github.com/notfoolen/todo/repositories"

	"github.com/astaxie/beego"
)

// AccountController controller for users account management
type AccountController struct {
	BaseController
}

// SignIn sign in page
func (c *AccountController) SignIn() {
	flash := beego.NewFlash()

	if c.Ctx.Input.IsPost() {
		login := c.GetString("login")
		password := c.GetString("password")

		profile, err := repositories.UserSignIn(login, password)
		if err == nil { // success
			c.SetProfile(profile)
			c.Redirect(c.URLFor("IndexController.Blog"), 303)
			return
		}

		flash.Error(err.Error())
		flash.Store(&c.Controller)
	}

	c.Data["menu"] = "signin"
	c.TplName = "account/signin.html"
}

// SignUp registraion page
func (c *AccountController) SignUp() {
	flash := beego.NewFlash()

	if c.Ctx.Input.IsPost() {
		login := c.GetString("login")
		password := c.GetString("password")

		profile, err := repositories.UserSignUp(login, password)
		if err == nil { // success
			c.SetProfile(profile)
			c.Redirect(c.URLFor("IndexController.Blog"), 303)
			return
		}

		flash.Error(err.Error())
		flash.Store(&c.Controller)
	}

	c.Data["xsrfdata"] = template.HTML(c.XSRFFormHTML())
	c.Data["menu"] = "signup"
	c.TplName = "account/signup.html"
}

// SignOut logout action
func (c *AccountController) SignOut() {
	c.UnsetProfile()
	c.Redirect("/", 302)
	return
}
