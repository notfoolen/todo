package repositories

import (
	"errors"
	"time"

	"github.com/notfoolen/todo/library"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
	"github.com/notfoolen/todo/models/filters"

	desk "github.com/notfoolen/todo/models/views/carddesk"
)

func cardDeskList(o orm.Ormer, filter *filters.CardDeskFilter, pg *library.Paginator) ([]*domains.CardDesk, error) {
	var items []*domains.CardDesk

	if o == nil {
		o = orm.NewOrm()
	}
	qs := o.QueryTable("card_desk").OrderBy("-order")

	if filter != nil {
		if filter.ID > 0 {
			qs = qs.Filter("id", filter.ID)
		}
		if filter.UserID > 0 {
			qs = qs.Filter("user_id", filter.UserID)
		}
		if filter.BoardID > 0 {
			qs = qs.Filter("board_id", filter.BoardID)
		}
	}

	// Paginator
	if pg != nil {
		qs = pg.Calc(qs)
	}

	_, err := qs.All(&items)

	return items, err
}

// CardDeskList list of card desk
func CardDeskList(filter *filters.CardDeskFilter, pg *library.Paginator) ([]*domains.CardDesk, error) {
	return cardDeskList(nil, filter, pg)
}

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

func cardDeskAdd(o orm.Ormer, itemNew desk.New, userID int) (*domains.CardDesk, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.CardDesk{
		Title: itemNew.Title,
		Board: &domains.Board{ID: itemNew.BoardID},
		Order: itemNew.Order,
		User:  &domains.User{ID: userID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return cardDeskGet(o, int(id))
}

// CardDeskAdd insert card list
func CardDeskAdd(itemNew desk.New, userID int) (*domains.CardDesk, error) {
	return cardDeskAdd(nil, itemNew, userID)
}

// CardDeskUpdate update own existing card desk
func CardDeskUpdate(itemUpdate desk.New, userID int) (*domains.CardDesk, error) {
	item, err := CardDeskGet(itemUpdate.ID)
	if err != nil {
		return nil, err
	}

	if item.User.ID != userID {
		return nil, errors.New("access_denied")
	}

	item.Title = itemUpdate.Title
	item.Order = itemUpdate.Order
	item.Board = &domains.Board{ID: itemUpdate.BoardID}

	o := orm.NewOrm()
	if num, err := o.Update(item); num != 1 || err != nil {
		if err != nil {
			return nil, err
		}
		return nil, errors.New("update_board_error")
	}

	return nil, nil
}

// CardDeskDelete delete own existing card desk
func CardDeskDelete(id, userID int) (bool, error) {
	item, err := BoardGet(id)
	if err != nil {
		return false, err
	}

	if item.User.ID != userID {
		return false, errors.New("access_denied")
	}

	o := orm.NewOrm()
	num, err := o.QueryTable("card_desk").Filter("id", item.ID).Update(orm.Params{
		"deleted":      true,
		"deleted_dt":   time.Now(),
		"deleted_user": &domains.User{ID: userID},
	})

	if err != nil || num != 1 {
		return false, errors.New("delete_card_desk_error")
	}

	return true, nil
}
