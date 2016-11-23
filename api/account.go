package api

import "github.com/notfoolen/todo/repositories"

// AccountController account management
type AccountController struct {
	BaseController
}

// SignIn auth
func (c *BaseController) SignIn() {
	login := c.GetString("username")
	password := c.GetString("password")

	profile, err := repositories.UserSignIn(login, password)
	if err == nil { // success
		c.SetProfile(profile)

		c.Ok(profile)
		return
	}
	c.ErrorMessage(400, "invalid login or password")
}

// SignUp registration
func (c *BaseController) SignUp() {
	login := c.GetString("username")
	email := c.GetString("email")
	password := c.GetString("password")
	repassword := c.GetString("repassword")

	if password != repassword {
		c.ErrorMessage(400, "passwords are not equals")
		return
	}

	profile, err := repositories.UserSignUp(login, email, password)
	if err != nil { // error
		c.Error(err)
		return
	}

	c.SetProfile(profile)
	c.Ok(profile)
}
