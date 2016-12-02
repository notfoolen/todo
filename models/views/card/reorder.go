package card

// Reorder type for cards
type Reorder struct {
	DeskID   int   `json:"deskId"`
	CardsIDs []int `json:"cardsIds"`
}
