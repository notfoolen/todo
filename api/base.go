package api

import (
	"encoding/json"
	"path/filepath"
	"strings"

	"github.com/notfoolen/todo/models/domains"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
)

var (
	// upload folder
	storageRoot = filepath.Dir(".") + "/upload"

	// image size for upload
	sizeList = []string{"75x75", "100x100", "150x150", "200x200", "300x169", "600x337", "1000", "600", "360", "100"}
)

// BaseController Родительский контроллер
type BaseController struct {
	beego.Controller
	User     *domains.User
	IsLogged bool
}

// Init generates default values of controller operations.
func (c *BaseController) Init(ctx *context.Context, controllerName, actionName string, app interface{}) {
	c.Controller.Init(ctx, controllerName, actionName, app)

	c.IsLogged = c.GetSession("user_profile") != nil
	if c.IsLogged {
		_profile := c.GetSession("user_profile")
		profile, ok := _profile.(domains.User)

		if ok {
			c.User = &profile
		}
	}
}

// Ok return ok status
func (c *BaseController) Ok(v interface{}) {
	c.Data["json"] = v
	c.ServeJSON()
	return
}

// GetPost get params from post
func (c *BaseController) GetPost(v interface{}) {
	json.Unmarshal(c.Ctx.Input.RequestBody, v)
}

// Error return 400 error
func (c *BaseController) Error(err error) {
	c.CustomAbort(400, err.Error())
	return
}

// ErrorMessage return error message
func (c *BaseController) ErrorMessage(code int, message string) {
	c.CustomAbort(code, message)
	return
}

// ErrorArgument invalid parameters
func (c *BaseController) ErrorArgument(params ...string) {
	mes := "Invalid parameters: " + strings.Join(params, ", ")
	c.CustomAbort(400, mes)
}

// GetFullImagePath full path to file
func (c *BaseController) GetFullImagePath(path string) (string, error) {
	uploadDir, err := filepath.Abs(storageRoot + "/original/")
	if err != nil {
		return "", err
	}

	return uploadDir + path, nil
}

func (c *BaseController) getUploadDir() (string, error) {
	uploadDir, err := filepath.Abs(storageRoot)
	if err != nil {
		return "", err
	}
	return uploadDir, err
}

// SetProfile set user session
func (c *BaseController) SetProfile(profile *domains.User) {
	c.SetSession("user_profile", *profile)
}

// UnsetProfile destroy user session
func (c *BaseController) UnsetProfile() {
	// c.DelSession("user_profile")
	c.DestroySession()
}
