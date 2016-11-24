package api

import (
	"strconv"

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

// GetByID board by id
func (c *BoardsController) GetByID() {
	id, err := strconv.Atoi(c.Ctx.Input.Param(":id"))
	if err != nil {
		c.ErrorArgument("id")
	}

	item, err := repositories.BoardGet(id)
	if err != nil {
		c.Error(err)
	}
	c.Ok(item)
}

// Get список новостей
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
