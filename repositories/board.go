package repositories

import (
	"errors"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
)

func boardGet(o orm.Ormer, id int) (*domains.Board, error) {
	item := domains.Board{ID: id}

	if o == nil {
		o = orm.NewOrm()
	}
	err := o.Read(&item)

	if err != nil {
		if err == orm.ErrNoRows {
			return nil, errors.New("No board found")
		}
		return nil, err
	}

	return &item, err
}

// BoardGet return Board by id
func BoardGet(id int) (*domains.Board, error) {
	return boardGet(nil, id)
}

func boardAdd(o orm.Ormer, userID int, title, description string) (*domains.Board, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.Board{
		Title:       title,
		Description: description,
		User:        &domains.User{ID: userID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return boardGet(o, int(id))
}

// BoardAdd insert Board list
func BoardAdd(userID int, title, description string) (*domains.Board, error) {
	return boardAdd(nil, userID, title, description)
}
