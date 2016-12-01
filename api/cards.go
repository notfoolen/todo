package api

import (
	"github.com/notfoolen/todo/library"
	"github.com/notfoolen/todo/models/filters"
	"github.com/notfoolen/todo/models/views/board"
	"github.com/notfoolen/todo/repositories"
)

// CardsController action with users boards
type CardsController struct {
	BaseController
}

// Prepare check user auth
func (c *CardsController) Prepare() {
	if !c.IsLogged {
		c.Abort("401")
		return
	}
}

// Get list user's boards
func (c *CardsController) Get() {
	filter := &filters.BoardFilter{
		UserID: c.User.ID,
	}

	lastID, _ := c.GetInt("lastId")

	pg := library.GetPaginatorSimple(lastID)

	items, _ := repositories.BoardList(filter, pg)

	c.Ok(items)
}

// Post Create new board
func (c *CardsController) Post() {
	var boardNew board.New
	c.GetPost(&boardNew)

	item, err := repositories.BoardAdd(boardNew, c.User.ID)
	if err == nil { // success
		c.Ok(item)
		return
	}
	c.ErrorMessage(400, err.Error())
}

// Put update board info
func (c *CardsController) Put() {
	var boardNew board.New
	c.GetPost(&boardNew)

	item, err := repositories.BoardUpdate(boardNew, c.User.ID)
	if err == nil { // success
		c.Ok(item)
		return
	}
	c.ErrorMessage(400, err.Error())
}

// Delete user board
func (c *CardsController) Delete() {
	id, err := c.GetInt("id")
	if err != nil {
		c.ErrorArgument("id")
	}
	ok, err := repositories.BoardDelete(id, c.User.ID)
	if err != nil {
		c.Error(err)
	} else {
		c.Ok(ok)
	}
}
