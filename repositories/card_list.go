package repositories

import (
	"errors"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
)

func cardListGet(o orm.Ormer, id int) (*domains.CardList, error) {
	item := domains.CardList{ID: id}

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

// CardListGet return card list by id
func CardListGet(id int) (*domains.CardList, error) {
	return cardListGet(nil, id)
}

func cardListAdd(o orm.Ormer, userID, boardID int, title, description string) (*domains.CardList, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.CardList{
		Title:       title,
		Description: description,
		Board:       &domains.Board{ID: boardID},
		User:        &domains.User{ID: userID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return cardListGet(o, int(id))
}

// CardListAdd insert card list
func CardListAdd(userID, boardID int, title, description string) (*domains.CardList, error) {
	return cardListAdd(nil, userID, boardID, title, description)
}
