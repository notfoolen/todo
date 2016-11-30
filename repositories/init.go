package repositories

import (
	"github.com/notfoolen/todo/models/domains"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

// registration database connection and domains
func init() {
	sqlHost := beego.AppConfig.String("sqlhost")
	sqlUser := beego.AppConfig.String("sqluser")
	sqlPass := beego.AppConfig.String("sqlpass")
	sqlDb := beego.AppConfig.String("sqldb")

	// connection
	orm.RegisterDriver("postgres", orm.DRPostgres)
	orm.RegisterDataBase("default", "postgres", "host="+sqlHost+" user="+sqlUser+" password="+sqlPass+" dbname="+sqlDb+" sslmode=disable", 30, 30)

	// domains user
	orm.RegisterModel(new(domains.User))

	orm.RegisterModel(new(domains.Board))
	orm.RegisterModel(new(domains.CardDesk), new(domains.Card))

	orm.RunCommand()
	orm.Debug = true
}
