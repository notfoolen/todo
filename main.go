package main

import (
	"encoding/gob"

	"github.com/notfoolen/todo/models/domains"

	_ "github.com/astaxie/beego/session/redis"
	_ "github.com/lib/pq"
	"github.com/notfoolen/todo/repositories"
	_ "github.com/notfoolen/todo/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.SetStaticPath("/", "static")

	gob.Register(domains.User{})

	repositories.Register()

	beego.Run()
}
