package filters

// CardFilter filter of card
type CardFilter struct {
	ID         int
	UserID     int
	CardDeskID int
	RootIds    []int
}
