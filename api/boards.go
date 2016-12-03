package api

import (
	"github.com/notfoolen/todo/library"
	"github.com/notfoolen/todo/models/filters"
	"github.com/notfoolen/todo/models/views/board"
	"github.com/notfoolen/todo/repositories"
)

// BoardsController action with users boards
type BoardsController struct {
	BaseController
}

// Prepare check user auth
func (c *BoardsController) Prepare() {
	if !c.IsLogged {
		c.Abort("401")
		return
	}
}

// GetByCode board by code
func (c *BoardsController) GetByCode() {
	code := c.Ctx.Input.Param(":code")
	if code == "" {
		c.ErrorArgument("code")
	}

	item, err := repositories.BoardGetByCode(code)
	if err != nil {
		c.Error(err)
	}
	c.Ok(item)
}

// Get list user's boards
func (c *BoardsController) Get() {
	filter := &filters.BoardFilter{
		UserID: c.User.ID,
	}

	lastID, _ := c.GetInt("lastId")

	pg := library.GetPaginatorSimple(lastID)

	items, _ := repositories.BoardList(filter, pg)

	c.Ok(items)
}

// Post Create new board
func (c *BoardsController) Post() {
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
func (c *BoardsController) Put() {
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
func (c *BoardsController) Delete() {
	code := c.Ctx.Input.Param(":code")
	if code == "" {
		c.ErrorArgument("code")
	}
	ok, err := repositories.BoardDelete(code, c.User.ID)
	if err != nil {
		c.Error(err)
	} else {
		c.Ok(ok)
	}
}
