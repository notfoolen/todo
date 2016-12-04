package main

import (
	"encoding/gob"
	"io/ioutil"

	"github.com/notfoolen/todo/models/domains"

	_ "github.com/astaxie/beego/session/redis"
	_ "github.com/lib/pq"
	"github.com/notfoolen/todo/repositories"
	_ "github.com/notfoolen/todo/routers"

	"github.com/astaxie/beego"
)

func main() {
	beego.DelStaticPath("/static")
	// beego.SetStaticPath("/", "static")

	files, _ := ioutil.ReadDir("./static")
	for _, f := range files {
		beego.SetStaticPath("/"+f.Name(), "static/"+f.Name())
	}

	gob.Register(domains.User{})

	repositories.Register()

	beego.Run()
}
