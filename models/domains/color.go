package domains

import "time"

// Color --
type Color struct {
	ID    int       `orm:"column(id)"json:"id"`
	Dt    time.Time `orm:"auto_now_add;type(datetime)"json:"dt"`
	Title string    `json:"title"`
	RGB   string    `orm:"column(rgb)"json:"rgb"`
}
