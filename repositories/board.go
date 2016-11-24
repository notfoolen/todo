package repositories

import (
	"errors"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/library"
	"github.com/notfoolen/todo/models/domains"
	"github.com/notfoolen/todo/models/filters"
	"github.com/notfoolen/todo/models/views/board"
)

func boardList(o orm.Ormer, filter *filters.BoardFilter, pg *library.Paginator) ([]*domains.Board, error) {
	var items []*domains.Board

	if o == nil {
		o = orm.NewOrm()
	}
	qs := o.QueryTable("board").OrderBy("dt")

	if filter != nil {
		if filter.UserID > 0 {
			qs = qs.Filter("user_id", filter.UserID)
		}
	}

	// Paginator
	if pg != nil {
		qs = pg.Calc(qs)
	}

	_, err := qs.All(&items)

	return items, err
}

// BoardList list of boards
func BoardList(filter *filters.BoardFilter, pg *library.Paginator) ([]*domains.Board, error) {
	return boardList(nil, filter, pg)
}

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

func boardAdd(o orm.Ormer, boardNew board.New, userID int) (*domains.Board, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	item := &domains.Board{
		Title:       boardNew.Title,
		Description: boardNew.Description,
		User:        &domains.User{ID: userID},
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, err
	}

	return boardGet(o, int(id))
}

// BoardAdd insert Board list
func BoardAdd(boardNew board.New, userID int) (*domains.Board, error) {
	return boardAdd(nil, boardNew, userID)
}
