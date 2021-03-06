package repositories

import (
	"errors"
	"time"

	"github.com/notfoolen/todo/library"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
	"github.com/notfoolen/todo/models/filters"

	"log"

	desk "github.com/notfoolen/todo/models/views/carddesk"
)

func cardDeskList(o orm.Ormer, filter *filters.CardDeskFilter, pg *library.Paginator) ([]*domains.CardDesk, error) {
	var items []*domains.CardDesk

	if o == nil {
		o = orm.NewOrm()
	}
	qs := o.QueryTable("card_desk").OrderBy("order").Filter("deleted", false)

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
		if filter.BoardCode != "" {
			qs = qs.Filter("board__code", filter.BoardCode)
		}
	}

	// Paginator
	if pg != nil {
		qs = pg.Calc(qs)
	}

	_, err := qs.All(&items)

	links := make(map[int]int, len(items))
	var ids []int
	for index, item := range items {
		ids = append(ids, item.ID)
		links[item.ID] = index
	}

	if len(ids) > 0 {
		subFilter := &filters.CardFilter{
			RootIds: ids,
		}

		cards, err := CardList(subFilter, nil)
		if err != nil {
			return nil, err
		}

		log.Println(len(cards))

		for _, item := range cards {
			index := links[item.Desk.ID]

			if items[index].Cards == nil {
				items[index].Cards = []*domains.Card{}
			}

			items[index].Cards = append(items[index].Cards, item)
		}
	}

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
			return nil, errors.New("card_desk_not_found")
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
	board, err := BoardGetByCode(itemNew.BoardCode)
	if err != nil {
		return nil, err
	}

	if board.User.ID != userID {
		return nil, errors.New("access_denied")
	}

	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.CardDesk{
		Title: itemNew.Title,
		Board: &domains.Board{ID: board.ID},
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
	board, err := BoardGetByCode(itemUpdate.BoardCode)
	if err != nil {
		return nil, err
	}

	if board.User.ID != userID {
		return nil, errors.New("access_denied")
	}

	item, err := CardDeskGet(itemUpdate.ID)
	if err != nil {
		return nil, err
	}

	if item.User.ID != userID {
		return nil, errors.New("access_denied")
	}

	item.Title = itemUpdate.Title
	item.Order = itemUpdate.Order
	item.Board = &domains.Board{ID: board.ID}

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
	item, err := CardDeskGet(id)
	if err != nil {
		return false, err
	}

	if item.User.ID != userID {
		return false, errors.New("access_denied")
	}

	o := orm.NewOrm()
	num, err := o.QueryTable("card_desk").Filter("id", item.ID).Update(orm.Params{
		"deleted":         true,
		"deleted_dt":      time.Now(),
		"deleted_user_id": userID,
	})

	if err != nil || num != 1 {
		return false, errors.New("delete_card_desk_error")
	}

	return true, nil
}

func deskReorder(o orm.Ormer, ids []int, userID int) (bool, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	for index, id := range ids {
		num, err := o.QueryTable("card_desk").Filter("id", id).Filter("user_id", userID).Update(orm.Params{
			"order": index,
		})
		if err != nil || num != 1 {
			o.Rollback()
			return false, errors.New("reorder_card_error")
		}
	}

	return true, nil
}

// DeskReorder reorder cards
func DeskReorder(ids []int, userID int) (bool, error) {
	return deskReorder(nil, ids, userID)
}
