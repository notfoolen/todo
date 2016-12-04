package domains

import "time"

// Card board card
type Card struct {
	ID          int       `orm:"column(id)"json:"id"`
	Dt          time.Time `orm:"auto_now_add;type(datetime)"json:"dt"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	User        *User     `orm:"rel(fk);on_delete(do_nothing)"json:"-"`
	Board       *Board    `orm:"rel(fk);on_delete(do_nothing)"json:"-"`
	Desk        *CardDesk `orm:"rel(fk);on_delete(do_nothing)"json:"-"`

	Deleted     bool      `json:"-"`
	DeletedDt   time.Time `orm:"null;type(datetime)"json:"-"`
	DeletedUser *User     `orm:"null;rel(fk);on_delete(set_null)"json:"-"`

	Order int `json:"order"`
}
