package main

import (
	_ "github.com/astaxie/beego/session/redis"
	_ "github.com/lib/pq"
	_ "github.com/notfoolen/todo/repositories"
	_ "github.com/notfoolen/todo/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
}
