package controllers

// MiscController misc pages
type MiscController struct {
	BaseController
}

// Prepare check login
func (c *MiscController) Prepare() {
	if !c.IsLogged {
		c.Redirect("/welcome", 302)
	}
}

// Empty blank page
func (c *MiscController) Empty() {
	c.TplName = "misc/Empty.html"
}
