package repositories

import (
	"github.com/astaxie/beego/orm"
	"github.com/notfoolen/todo/models/domains"
)

func colorList(o orm.Ormer) ([]*domains.Color, error) {
	var items []*domains.Color

	if o == nil {
		o = orm.NewOrm()
	}
	qs := o.QueryTable("color")

	_, err := qs.All(&items)

	return items, err
}
