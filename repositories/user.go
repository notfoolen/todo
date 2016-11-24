package repositories

import (
	"errors"

	"github.com/notfoolen/todo/models/views/user"

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
	err := o.Read(item, "Login")

	if err == orm.ErrNoRows {
		if err == orm.ErrNoRows {
			return nil, errors.New("No users found")
		}
	}
	return item, nil
}

// UserSignIn Auth
func UserSignIn(userView user.Login) (*domains.User, error) {
	errMessage := "Invalid login or password"

	user, err := UserGetByLogin(userView.Login)
	if err != nil {
		return nil, errors.New(errMessage)
	}

	pwd := functions.HashPwd(userView.Password, user.Salt)
	if pwd != user.Pwd {
		return nil, errors.New(errMessage)
	}

	return user, nil
}

// UserSignUp registration
func UserSignUp(userReg user.Registration) (*domains.User, error) {
	pwd, salt := functions.HashPwdSalt(userReg.Password)

	_, err := UserGetByLogin(userReg.Login)
	if err == nil {
		return nil, errors.New("User with this login already exist")
	}

	item := &domains.User{
		Login: userReg.Login,
		Email: userReg.Email,
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
