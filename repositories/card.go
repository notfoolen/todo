package repositories

import (
	"errors"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
)

func cardGet(o orm.Ormer, id int) (*domains.Card, error) {
	item := domains.Card{ID: id}

	if o == nil {
		o = orm.NewOrm()
	}
	err := o.Read(&item)

	if err != nil {
		if err == orm.ErrNoRows {
			return nil, errors.New("No card found")
		}
		return nil, err
	}

	return &item, err
}

// CardGet return card by id
func CardGet(id int) (*domains.Card, error) {
	return cardGet(nil, id)
}

func cardAdd(o orm.Ormer, userID, boardID, deskID int, title, description string) (*domains.Card, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.Card{
		Title:       title,
		Description: description,
		User:        &domains.User{ID: userID},
		Board:       &domains.Board{ID: boardID},
		Desk:        &domains.CardDesk{ID: deskID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return cardGet(o, int(id))
}

// CardAdd insert card list
func CardAdd(userID, boardID, listID int, title, description string) (*domains.Card, error) {
	return cardAdd(nil, userID, boardID, listID, title, description)
}
