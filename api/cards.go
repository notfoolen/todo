package api

import (
	"strconv"

	"github.com/notfoolen/todo/library"
	"github.com/notfoolen/todo/models/filters"
	cardView "github.com/notfoolen/todo/models/views/card"
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

// Get list user's desks
func (c *CardsController) Get() {
	filter := &filters.CardFilter{
		UserID: c.User.ID,
	}

	lastID, _ := c.GetInt("lastId")

	pg := library.GetPaginatorSimple(lastID)

	items, _ := repositories.CardList(filter, pg)

	c.Ok(items)
}

// Post Create new card
func (c *CardsController) Post() {
	var itemNew cardView.New
	c.GetPost(&itemNew)

	item, err := repositories.CardAdd(itemNew, c.User.ID)
	if err == nil { // success
		c.Ok(item)
		return
	}
	c.ErrorMessage(400, err.Error())
}

// Put update card info
func (c *CardsController) Put() {
	var itemNew cardView.New
	c.GetPost(&itemNew)

	item, err := repositories.CardUpdate(itemNew, c.User.ID)
	if err == nil { // success
		c.Ok(item)
		return
	}
	c.ErrorMessage(400, err.Error())
}

// Delete user card
func (c *CardsController) Delete() {
	id, err := strconv.Atoi(c.Ctx.Input.Param(":id"))
	if err != nil {
		c.ErrorArgument("id")
	}
	ok, err := repositories.CardDelete(id, c.User.ID)
	if err != nil {
		c.Error(err)
	} else {
		c.Ok(ok)
	}
}

// Reorder cards in multiple desks
func (c *CardsController) Reorder() {
	var itemReorder []cardView.Reorder
	c.GetPost(&itemReorder)

	_, err := repositories.CardReorder(itemReorder, c.User.ID)
	if err == nil { // success
		c.Ok("ok")
		return
	}
	c.ErrorMessage(400, err.Error())
}
