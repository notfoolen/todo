package controllers

import (
	"encoding/json"
	"html/template"
	"strings"

	"github.com/notfoolen/todo/models/domains"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

// Redistimer redis timer
const Redistimer int = 8640000

// BaseController Родительский контроллер
type BaseController struct {
	beego.Controller
	User            *domains.User
	IsLogged        bool
	IsDeveloperHost bool
	IsTestHost      bool
	disableLayout   bool
	Lang            string
}

// Init generates default values of controller operations.
func (c *BaseController) Init(ctx *context.Context, controllerName, actionName string, app interface{}) {
	c.Controller.Init(ctx, controllerName, actionName, app)
	c.IsLogged = c.GetSession("user_profile") != nil

	c.Data["isLogged"] = c.IsLogged
	if c.IsLogged {
		_profile := c.GetSession("user_profile")
		profile, ok := _profile.(domains.User)

		if ok {
			c.User = &profile
			c.Data["user"] = profile
		}
	} else {
		c.Data["lang"] = "ru"
	}
	c.Data["xsrf"] = c.XSRFToken()
	c.Data["xsrfdata"] = template.HTML(c.XSRFFormHTML())

	// c.Layout = "layout/index.html"
	c.disableLayout = true
}

// postInit call after init
func (c *BaseController) postInit() {

}

// Render sends the response with rendered template bytes as text/html type.
func (c *BaseController) Render() error {
	// controllerName, _ := c.GetControllerAndAction()

	/*
		if !c.disableLayout && controllerName != "AccountController" && controllerName != "WelcomeController" {
			c.TplName = "misc/empty.html"
		}
	*/

	return c.Controller.Render()
}

// SetProfile set user session
func (c *BaseController) SetProfile(profile *domains.User) {
	c.SetSession("user_profile", *profile)
}

// UnsetProfile delete user session
func (c *BaseController) UnsetProfile() {
	c.DestroySession()
}

// GetClientIP return user ip address
func (c *BaseController) GetClientIP() string {
	s := strings.Split(c.Ctx.Request.RemoteAddr, ":")
	return s[0]
}

// Ok return ok status
func (c *BaseController) Ok(v interface{}) {
	c.Data["json"] = v
	c.ServeJSON()
	return
}

// ErrorArgument invalid parameters
func (c *BaseController) Error(err error) {
	c.CustomAbort(400, err.Error())
	return
}

// GetPost get params from post
func (c *BaseController) GetPost(v interface{}) {
	json.Unmarshal(c.Ctx.Input.RequestBody, v)
}

// SetConfirmSecretKey set confirm secretKey
func (c *BaseController) SetConfirmSecretKey(secretKey string) {
	c.SetSession("confirm_secretKey", secretKey)
}

// GetConfirmSecretKey set confirm secretKey
func (c *BaseController) GetConfirmSecretKey() string {
	key := c.GetSession("confirm_secretKey")

	if key != nil {
		return key.(string)
	}
	return ""
}
