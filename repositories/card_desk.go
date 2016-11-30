package repositories

import (
	"errors"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
)

func cardDeskGet(o orm.Ormer, id int) (*domains.CardDesk, error) {
	item := domains.CardDesk{ID: id}

	if o == nil {
		o = orm.NewOrm()
	}
	err := o.Read(&item)

	if err != nil {
		if err == orm.ErrNoRows {
			return nil, errors.New("No card list found")
		}
		return nil, err
	}

	return &item, err
}

// CardDeskGet return card list by id
func CardDeskGet(id int) (*domains.CardDesk, error) {
	return cardDeskGet(nil, id)
}

func cardDeskAdd(o orm.Ormer, userID, boardID int, title, description string) (*domains.CardDesk, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.CardDesk{
		Title:       title,
		Description: description,
		Board:       &domains.Board{ID: boardID},
		User:        &domains.User{ID: userID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return cardDeskGet(o, int(id))
}

// CardDeskAdd insert card list
func CardDeskAdd(userID, boardID int, title, description string) (*domains.CardDesk, error) {
	return cardDeskAdd(nil, userID, boardID, title, description)
}
