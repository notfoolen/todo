package dep

import (
	"bytes"
	"io"
	"log"
	"os"
	"path/filepath"

	"github.com/astaxie/beego/orm"
)

func read(filenames []string) string {
	buf := bytes.NewBuffer(nil)
	for _, fn := range filenames {
		fn, err := filepath.Abs(filepath.Dir(".") + fn)
		log.Println(err)
		f, err := os.Open(fn) // Error handling elided for brevity.
		log.Println(err)
		io.Copy(buf, f) // Error handling elided for brevity.
		f.Close()
	}
	s := string(buf.Bytes())
	return s
}

// SQL is a sample to run an endpoint test En|Ch|Ru
// go test "parliament/tests" -run TestSql
func SQL() {
	sqlFiles := []string{"/init/sql/colors.sql"}
	sql := read(sqlFiles)
	o := orm.NewOrm()
	_, err := o.Raw(sql).Exec()
	log.Println(err)
}
