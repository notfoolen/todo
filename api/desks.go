package api

import (
	"strconv"

	"github.com/notfoolen/todo/library"
	"github.com/notfoolen/todo/models/filters"
	desk "github.com/notfoolen/todo/models/views/carddesk"
	"github.com/notfoolen/todo/repositories"
)

// DesksController action with users desks
type DesksController struct {
	BaseController
}

// Prepare check user auth
func (c *DesksController) Prepare() {
	if !c.IsLogged {
		c.Abort("401")
		return
	}
}

// Get list user's desks
func (c *DesksController) Get() {
	code := c.GetString("code") // c.Ctx.Input.Param(":code")
	if code == "" {
		c.ErrorArgument("code")
	}
	filter := &filters.CardDeskFilter{
		UserID:    c.User.ID,
		BoardCode: code,
	}

	lastID, _ := c.GetInt("lastId")

	pg := library.GetPaginatorSimple(lastID)

	items, _ := repositories.CardDeskList(filter, pg)

	c.Ok(items)
}

// Post Create new desk
func (c *DesksController) Post() {
	var itemNew desk.New
	c.GetPost(&itemNew)

	item, err := repositories.CardDeskAdd(itemNew, c.User.ID)
	if err == nil { // success
		c.Ok(item)
		return
	}
	c.ErrorMessage(400, err.Error())
}

// Put update desk info
func (c *DesksController) Put() {
	var itemNew desk.New
	c.GetPost(&itemNew)

	item, err := repositories.CardDeskUpdate(itemNew, c.User.ID)
	if err == nil { // success
		c.Ok(item)
		return
	}
	c.ErrorMessage(400, err.Error())
}

// Delete user desk
func (c *DesksController) Delete() {
	id, err := strconv.Atoi(c.Ctx.Input.Param(":id"))
	if err != nil {
		c.ErrorArgument("id")
	}

	ok, err := repositories.CardDeskDelete(id, c.User.ID)
	if err != nil {
		c.ErrorMessage(400, err.Error())
	} else {
		c.Ok(ok)
	}
}

// Reorder cards in multiple desks
func (c *DesksController) Reorder() {
	var ids []int
	c.GetPost(&ids)

	_, err := repositories.DeskReorder(ids, c.User.ID)
	if err == nil {
		c.Ok("ok")
		return
	}
	c.ErrorMessage(400, err.Error())
}
