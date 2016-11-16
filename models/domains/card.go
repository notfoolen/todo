package domains

import "time"

// Card board card
type Card struct {
	ID          int       `json:"id"`
	Dt          time.Time `orm:"auto_now_add;type(datetime)"json:"dt"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	User        *User     `orm:"rel(fk);on_delete(do_nothing)"json:"user"`
	Board       *Board    `orm:"rel(fk);on_delete(do_nothing)"json:"board"`
	List        *CardList `orm:"rel(fk);on_delete(do_nothing)"json:"list"`
}
