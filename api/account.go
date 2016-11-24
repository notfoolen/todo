package api

import (
	"github.com/notfoolen/todo/models/views/user"

	"github.com/notfoolen/todo/repositories"
)

// AccountController account management
type AccountController struct {
	BaseController
}

// SignIn auth
func (c *AccountController) SignIn() {
	var userLogin user.Login
	c.GetPost(&userLogin)

	err := userLogin.Check()

	if err != nil {
		c.ErrorMessage(400, err.Error())
		return
	}

	profile, err := repositories.UserSignIn(userLogin)
	if err == nil { // success
		c.SetProfile(profile)

		c.Ok(profile)
		return
	}
	c.ErrorMessage(400, "invalid login or password")
}

// SignUp registration
func (c *AccountController) SignUp() {
	var userReg user.Registration
	c.GetPost(&userReg)

	err := userReg.Check()

	if err != nil {
		c.ErrorMessage(400, err.Error())
		return
	}

	profile, err := repositories.UserSignUp(userReg)
	if err != nil { // error
		c.Error(err)
		return
	}

	c.SetProfile(profile)
	c.Ok(profile)
}

// Get user by id
func (c *AccountController) Get() {
	c.Ok(c.User)
}
