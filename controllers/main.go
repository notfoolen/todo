package controllers

type IndexController struct {
	BaseController
}

// Index main page
func (c *IndexController) Index() {
	c.Data["menu"] = "main"
	c.TplName = "index.html"
}
