package domains

import "time"

// CardList list of cards
type CardList struct {
	ID          int       `json:"id"`
	Dt          time.Time `orm:"auto_now_add;type(datetime)"json:"dt"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	User        *User     `orm:"rel(fk);on_delete(do_nothing)"json:"user"`
	Board       *Board    `orm:"rel(fk);on_delete(do_nothing)"json:"board"`
}
