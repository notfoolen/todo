package user

import (
	"errors"
)

// Registration model of user registration
type Registration struct {
	Login      string `json:"login"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Repassword string `json:"repassword"`
}

// Check for valid params
func (c *Registration) Check() error {
	if c.Password != c.Repassword {
		return errors.New("Passwords are not equals")
	}
	if c.Login == "" || c.Password == "" {
		return errors.New("Login and password is too short")
	}
	return nil
}
