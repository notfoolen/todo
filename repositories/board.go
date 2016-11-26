package repositories

import (
	"errors"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/library"
	"github.com/notfoolen/todo/library/functions"
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
		if filter.ID > 0 {
			qs = qs.Filter("id", filter.ID)
		}
		if filter.UserID > 0 {
			qs = qs.Filter("user_id", filter.UserID)
		}
		if filter.Code != "" {
			qs = qs.Filter("code", filter.Code)
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
			return nil, errors.New("board_not_found")
		}
		return nil, err
	}

	return &item, err
}

// BoardGet return Board by id
func BoardGet(id int) (*domains.Board, error) {
	filter := &filters.BoardFilter{
		ID: id,
	}
	list, err := boardList(nil, filter, nil)
	if err != nil {
		return nil, errors.New("board_not_found")
	}
	return list[0], nil
}

// BoardGetByCode return Board by id
func BoardGetByCode(code string) (*domains.Board, error) {
	filter := &filters.BoardFilter{
		Code: code,
	}
	list, err := boardList(nil, filter, nil)
	if err != nil {
		return nil, errors.New("board_not_found")
	}
	return list[0], nil
}

func boardAdd(o orm.Ormer, boardNew board.New, userID int) (*domains.Board, error) {
	if o == nil {
		o = orm.NewOrm()
	}

	code := functions.GenerateRandomString(25, true)

	item := &domains.Board{
		Title:       boardNew.Title,
		Description: boardNew.Description,
		User:        &domains.User{ID: userID},
		Code:        code,
	}

	id, err := o.Insert(item)

	if err != nil {
		return nil, errors.New("create_board_error")
	}

	return boardGet(o, int(id))
}

// BoardAdd insert Board list
func BoardAdd(boardNew board.New, userID int) (*domains.Board, error) {
	return boardAdd(nil, boardNew, userID)
}

// BoardUpdate update own existing board
func BoardUpdate(boardUpdate board.New, userID int) (*domains.Board, error) {
	item, err := BoardGet(boardUpdate.ID)
	if err != nil {
		return nil, err
	}

	if item.User.ID != userID {
		return nil, errors.New("access_denied")
	}

	item.Title = boardUpdate.Title
	item.Description = boardUpdate.Description

	o := orm.NewOrm()
	if num, err := o.Update(item); num != 1 || err != nil {
		if err != nil {
			return nil, err
		}
		return nil, errors.New("update_board_error")
	}

	return nil, nil
}

// BoardDelete delete own existing board
func BoardDelete(id, userID int) (bool, error) {
	item, err := BoardGet(id)
	if err != nil {
		return false, err
	}

	if item.User.ID != userID {
		return false, errors.New("access_denied")
	}

	o := orm.NewOrm()
	num, err := o.QueryTable("board").Filter("id", item.ID).Update(orm.Params{
		"deleted":      true,
		"deleted_dt":   time.Now(),
		"deleted_user": &domains.User{ID: userID},
	})

	if err != nil || num != 1 {
		return false, errors.New("delete_board_error")
	}

	return true, nil
}
