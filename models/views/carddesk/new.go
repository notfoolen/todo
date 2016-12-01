package carddesk

// New instance for create card desk
type New struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Order   int    `json:"order"`
	BoardID int    `json:"boardId"`
}
