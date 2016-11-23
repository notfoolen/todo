package repositories

import (
	"errors"

	"github.com/notfoolen/todo/library/functions"
	"github.com/notfoolen/todo/models/domains"

	"github.com/astaxie/beego/orm"
)

func userGet(o orm.Ormer, id int) (*domains.User, error) {
	item := domains.User{ID: id}
	if o == nil {
		o = orm.NewOrm()
	}
	err := o.Read(&item)

	if err != nil {
		if err == orm.ErrNoRows {
			return nil, errors.New("No users found")
		}
		return nil, err
	}

	return &item, err
}

// UserGet get user by id
func UserGet(id int) (*domains.User, error) {
	return userGet(nil, id)
}

// UserGetByLogin return user by login
func UserGetByLogin(login string) (*domains.User, error) {
	o := orm.NewOrm()
	item := &domains.User{Login: login}
	err := o.Read(item, "LOgin")

	if err == orm.ErrNoRows {
		if err == orm.ErrNoRows {
			return nil, errors.New("No users found")
		}
	}
	return item, nil
}

// UserSignIn Auth
func UserSignIn(login, password string) (*domains.User, error) {
	errMessage := "Invalid login or password"

	user, err := UserGetByLogin(login)
	if err != nil {
		return nil, errors.New(errMessage)
	}

	pwd := functions.HashPwd(password, user.Salt)
	if pwd != user.Pwd {
		return nil, errors.New(errMessage)
	}

	return user, nil
}

// UserSignUp registration
func UserSignUp(login, email, password string) (*domains.User, error) {
	if login == "" || password == "" {
		return nil, errors.New("Login and password is too short")
	}
	pwd, salt := functions.HashPwdSalt(password)

	_, err := UserGetByLogin(login)
	if err == nil {
		return nil, errors.New("User with this login already exist")
	}

	item := &domains.User{
		Login: login,
		Email: email,
		Pwd:   pwd,
		Salt:  salt,
	}

	o := orm.NewOrm()
	err = o.Begin()
	if err != nil {
		return nil, err
	}

	id, err := o.Insert(item)

	if err != nil {
		o.Rollback()
		return nil, err
	}

	userID := int(id)

	o.Commit()

	return userGet(o, userID)
}
