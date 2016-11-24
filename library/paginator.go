package library

import (
	"math"
	"strconv"

	"github.com/astaxie/beego/orm"
)

var (
	idIterator         = 0
	defaultItemPerPage = 30
	maxItemPerPage     = 101
)

type Paginator struct {
	ID           int            `json:"-"`
	ItemsPerPage int            `json:"ipp"`
	CurrentPage  int            `json:"cp"`
	LastID       int            `json:"lastId"`
	Shuffle      bool           `json:"-"`
	TotalPages   int            `json:"tp"`
	TotalItems   int            `json:"ti"`
	QSState      orm.QuerySeter `json:"-"`
}

func getDefaultParams(itemsPerPage int, currentPage int) (ipp int, cp int) {
	if itemsPerPage < maxItemPerPage {
		if itemsPerPage == 0 {
			ipp = defaultItemPerPage
		} else {
			ipp = itemsPerPage
		}
	} else {
		ipp = maxItemPerPage
	}

	if currentPage == 0 {
		cp = 1
	} else {
		cp = currentPage
	}

	return ipp, cp
}

func GetPaginator(itemsPerPage int, currentPage int) *Paginator {
	idIterator += 1
	ID := idIterator

	ItemsPerPage, CurrentPage := getDefaultParams(itemsPerPage, currentPage)

	return &Paginator{
		ID:           ID,
		ItemsPerPage: ItemsPerPage,
		CurrentPage:  CurrentPage,
	}
}

func GetPaginatorExtended(itemsPerPage, currentPage, lastId int, shuffle bool) *Paginator {
	idIterator += 1
	ID := idIterator

	ItemsPerPage, CurrentPage := getDefaultParams(itemsPerPage, currentPage)

	return &Paginator{
		ID:           ID,
		ItemsPerPage: ItemsPerPage,
		CurrentPage:  CurrentPage,
		LastID:       lastId,
		Shuffle:      shuffle,
	}
}

func GetPaginatorSimple(lastId int) *Paginator {
	idIterator++
	ID := idIterator

	return &Paginator{
		ID:           ID,
		LastID:       lastId,
		ItemsPerPage: defaultItemPerPage,
	}
}

func (pg *Paginator) CalcSQLimit() string {
	limit := strconv.Itoa(pg.ItemsPerPage)

	return ` LIMIT ` + limit
}

func (pg *Paginator) CalcSQL() string {
	if pg.CurrentPage < 1 {
		pg.CurrentPage = 1
	}
	limit := strconv.Itoa(pg.ItemsPerPage)
	offset := strconv.Itoa(pg.ItemsPerPage * (pg.CurrentPage - 1))

	return ` LIMIT ` + limit + ` OFFSET ` + offset
}

func (pg *Paginator) Calc(qs orm.QuerySeter) orm.QuerySeter {
	pg.QSState = qs
	qs = qs.Offset(pg.ItemsPerPage * (pg.CurrentPage - 1)).Limit(pg.ItemsPerPage)
	return qs
}

func (pg *Paginator) setState(count int) {
	var tmp float64

	tmp = float64(count) / float64(pg.ItemsPerPage)

	pg.TotalItems = count
	pg.TotalPages = int(math.Ceil(tmp))
}

func (pg *Paginator) Recalc() error {
	count, err := pg.QSState.Count()
	if err != nil {
		return err
	}
	pg.setState(int(count))
	return nil
}

func (pg *Paginator) RecalcSQL(o orm.Ormer, sql string, filterValues ...interface{}) error {
	selectSQL := `SELECT COUNT(*) as count`

	if o == nil {
		o = orm.NewOrm()
	}

	var count int
	o.Raw(selectSQL+sql, filterValues).QueryRow(&count)

	pg.setState(count)

	return nil
}
