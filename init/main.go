package main

import (
	"path/filepath"
	"runtime"

	_ "github.com/lib/pq"
	"github.com/notfoolen/todo/init/dep"
	"github.com/notfoolen/todo/repositories"

	"github.com/astaxie/beego"
)

func init() {
	_, file, _, _ := runtime.Caller(1)
	apppath, _ := filepath.Abs(filepath.Dir(filepath.Join(file, ".."+string(filepath.Separator))))
	beego.TestBeegoInit(apppath)

	repositories.Register()
}

func main() {
	dep.SQL()
}
