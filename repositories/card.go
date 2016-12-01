package repositories

import (
	"errors"
	"time"

	"github.com/notfoolen/todo/library"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
	"github.com/notfoolen/todo/models/filters"

	cardView "github.com/notfoolen/todo/models/views/card"
)

func cardList(o orm.Ormer, filter *filters.CardFilter, pg *library.Paginator) ([]*domains.Card, error) {
	var items []*domains.Card

	if o == nil {
		o = orm.NewOrm()
	}
	qs := o.QueryTable("card").OrderBy("-order")

	if filter != nil {
		if filter.ID > 0 {
			qs = qs.Filter("id", filter.ID)
		}
		if filter.UserID > 0 {
			qs = qs.Filter("user_id", filter.UserID)
		}
		if filter.CardDeskID > 0 {
			qs = qs.Filter("desk_id", filter.CardDeskID)
		}
	}

	// Paginator
	if pg != nil {
		qs = pg.Calc(qs)
	}

	_, err := qs.All(&items)

	return items, err
}

// CardList list of card
func CardList(filter *filters.CardFilter, pg *library.Paginator) ([]*domains.Card, error) {
	return cardList(nil, filter, pg)
}

func cardGet(o orm.Ormer, id int) (*domains.Card, error) {
	item := domains.Card{ID: id}

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

// CardGet return card by id
func CardGet(id int) (*domains.Card, error) {
	return cardGet(nil, id)
}

func cardAdd(o orm.Ormer, itemNew cardView.New, userID int) (*domains.Card, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.Card{
		Title: itemNew.Title,
		Desk:  &domains.CardDesk{ID: itemNew.CardDeskID},
		Order: itemNew.Order,
		User:  &domains.User{ID: userID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return cardGet(o, int(id))
}

// CardAdd insert card
func CardAdd(itemNew cardView.New, userID int) (*domains.Card, error) {
	return cardAdd(nil, itemNew, userID)
}

// CardUpdate update own existing card desk
func CardUpdate(itemUpdate cardView.New, userID int) (*domains.Card, error) {
	item, err := CardGet(itemUpdate.ID)
	if err != nil {
		return nil, err
	}

	if item.User.ID != userID {
		return nil, errors.New("access_denied")
	}

	item.Title = itemUpdate.Title
	item.Order = itemUpdate.Order
	item.Desk = &domains.CardDesk{ID: itemUpdate.CardDeskID}

	o := orm.NewOrm()
	if num, err := o.Update(item); num != 1 || err != nil {
		if err != nil {
			return nil, err
		}
		return nil, errors.New("update_board_error")
	}

	return nil, nil
}

// CardDelete delete own existing card desk
func CardDelete(id, userID int) (bool, error) {
	item, err := BoardGet(id)
	if err != nil {
		return false, err
	}

	if item.User.ID != userID {
		return false, errors.New("access_denied")
	}

	o := orm.NewOrm()
	num, err := o.QueryTable("card").Filter("id", item.ID).Update(orm.Params{
		"deleted":      true,
		"deleted_dt":   time.Now(),
		"deleted_user": &domains.User{ID: userID},
	})

	if err != nil || num != 1 {
		return false, errors.New("delete_card_error")
	}

	return true, nil
}
