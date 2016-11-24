package user

import (
	"errors"
)

// Login model of user login
type Login struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

// Check for valid params
func (c *Login) Check() error {
	if c.Login == "" || c.Password == "" {
		return errors.New("Login and password is too short")
	}
	return nil
}
