package domains

import "time"

// User user profile
type User struct {
	ID    int       `json:"id"`
	Dt    time.Time `orm:"auto_now_add;type(datetime)"json:"dt"`
	Login string    `orm:"size(256)"json:"login"`
	Email string    `orm:"size(256)"json:"email"`
	Pwd   string    `orm:"size(256)"json:"-"`
	Salt  string    `orm:"size(256)"json:"-"`
}
